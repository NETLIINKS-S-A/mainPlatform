// @filename: CustomerRender.ts
/* ******************************************
DISPLAY TABLE DATA AND FILTERED TABLE DATA
******************************************** */
import { UIControl, UIView } from "../../Shared/Libs/lib.types.g.js"
import { FNCustomers } from "./CustomerFunctions.js"
import { StylingTable } from "../../Shared/Functions/StylingTable.js"

/**
 * Render table data with backend data obtained
 * @param items - The saved data and filtered data (tableData)
 * @param wrapper - The table body content (table body)
 * @param rowsPerPage - The quantity rows show per page (tableRows)
 * @param page - The current page
 */

export async function displayCustomerData(
    items: any,
    table: any,
    rows: number,
    page: number,
    paginationCounter?: any
): Promise<UIView> {
    table.innerHTML = ""
    page--

    let start: number = rows * page
    let end: number = start + rows
    let paginatedItems = items.slice(start, end)

    for (let i = 0; i < paginatedItems.length; i++) {
        let customer = paginatedItems[i]
        let row = document.createElement("tr")

        row.innerHTML = `
            <tr>
                <td>${customer.name}</td>
                <td class="monospace ruc">${customer.ruc}</td>
                <td class="tag"><span>${customer.state.name}</span></td>
                <td>
                    <button
                        class="btn
                        btn_table editor"
                        id="edit-entity"
                        data-id="${customer.id}">

                        <i class="fa-solid fa-pencil"></i>
                    </button>
                </td>
            </tr>
        `

        table.appendChild(row)
    }

    // edit customer
    const openEditor: UIControl = document.querySelectorAll("#edit-entity")

    openEditor.forEach((editor: UIControl) => {
        editor.addEventListener("click", (): void => {
            let customerID = editor.dataset.id

            FNCustomers.edit(customerID)
        })
    })


    // format table
    StylingTable.TAGS()
    StylingTable.validateRUC()

    console.log(paginatedItems)
}


//     // verify RUC length
//     const ruc: UIControl = document.querySelectorAll(".ruc")
//     NLFuncs.validateRUC()

//     // Edit Customer
//     const editButtons: UIControl =
//         document.querySelectorAll(".editor")

//     const modal = document.getElementById("modal-content")
//     editButtons.forEach((editButton: UIControl) => {
//         editButton.addEventListener("click", (): void => {
//             let entity = editButton.dataset.id
//             CFN.editCustomer(modal, entity)
//         })
//     })
// }
