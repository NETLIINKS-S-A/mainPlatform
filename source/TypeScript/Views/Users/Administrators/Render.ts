// @filename: AdministratorRenderData.ts
import { UIControl } from "../../../Shared/Libs/lib.types.g.js"

export async function renderAdministratorData(
    items: any,
    tableBody: UIControl,
    rowsPerPage: number,
    page: number,
    paginationElement?: any
): Promise<void> {
    tableBody.innerHTML = " "
    page--

    let start: number = rowsPerPage * page
    let end: number = start + rowsPerPage
    let arrayEvents: [] = await items.slice(start, end)
    let index: number

    for (index = 0; index < arrayEvents.length; index++) {
        let administrator: any = arrayEvents[index]
        let row: UIControl = document.createElement("tr")
        row.innerHTML = `
        <tr>
            <td>${administrator?.firstName} ${administrator?.lastName}</td>
            <td>${administrator?.email}</td>
            <td class="status"><i>${administrator?.state.name}</i></td>
            <td class="citadels"><i>${administrator?.citadel.description}</i></td>
            <td class="type"><i>${administrator.userType}</i></td>

            <td><button class="btn btn_table-editor"><i class="fa-solid fa-arrows-rotate"></i></button></td>
        </tr>
        `

        tableBody.appendChild(row)

        // fix states
        const states: UIControl = document.querySelectorAll(".status i")
        states?.forEach((state: UIControl) => {
            if (state.innerText === "ENABLED") {
                state.classList.add("g")
                state.innerText = "Activo"
            } else if (state.innerText === "DISABLED") {
                state.classList.add("r")
                state.innerText = "Inactivo"
            }
        })

        // Fix citadels
        const citadels: UIControl = document.querySelectorAll(".citadels i")
        citadels?.forEach((citadel: UIControl) => {
            if (citadel.innerText === "NO APLICA") {
                citadel.innerText = "no aplica"
            } else if (citadel.innerText === "No Aplica") {
                citadel.innerText = "no aplica"
            } else if (citadel.innerText === "N/A") {
                citadel.innerText = "ninguno"
            } else if (
                citadel.innerText != "no aplica" &&
                citadel.innerText != "NINGUNO"
            ) {
                citadel.classList.add("b")
            }
        })

        // Fix type
        const types: UIControl = document.querySelectorAll(".type i")
        types.forEach((type: UIControl) => {
            if (type.innerText === "CUSTOMER") {
                type.classList.add("p")
                type.innerText = "Cliente"
            }
        })
    }
}
