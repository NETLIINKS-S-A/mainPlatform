// @filename: CustomerRenderData.ts
/* ******************************************
DISPLAY TABLE DATA AND FILTERED TABLE DATA
******************************************** */
import { UIControl } from "../../Libs/lib.types.js"
import { CFN } from "./Functions.js"

/**
 *
 * @param items - The saved data and filtered data (tableData)
 * @param wrapper - The table body content (table body)
 * @param rowsPerPage - The quantity rows show per page (tableRows)
 * @param page - The current page
 */
export async function renderTableData(
    items: any,
    table: any,
    rows: number,
    page: number
): Promise<void> {
    table.innerHTML = ""
    page--

    let start: number = rows + page
    let end: number = start + rows
    let paginatedItems = items.slice(start, end)
    let customer: any

    for (let i = 0; i < paginatedItems.length; i++) {
        customer = paginatedItems[i]

        let tableRow = document.createElement("tr")
        tableRow.innerHTML = `
        <tr>
            <td>${customer.name}</td>
            <td class="monospace ruc">${customer.ruc}</td>
            <td class="tag"><span>${customer.state.name}</span></td>
            <td>
                <button class="btn btn_table" id="edit-entity" data-id="${customer.id}"><i class="fa-solid fa-pencil"></i></button>
            </td>
        </tr>`

        // write data on table
        table.appendChild(tableRow)

        // Add tags styles
        const tableTag: UIControl = document.querySelectorAll(".tag span")
        CFN.addTags(tableTag)

        // verify RUC length
        const ruc: UIControl = document.querySelectorAll(".ruc")
        CFN.verifyRucLength(ruc)
    }
}

//     // CUSTOMER EDITOR ================================================
//     // elements
//     const editorButtonElements: UIControl =
//         document.querySelectorAll("tr td button")
//     const closeEditorButtonElement: UIControl =
//         document.getElementById("closeEditor")
//     const updateCustomerEntityElement: UIControl = document.getElementById(
//         "updateCutomerEntity"
//     )
