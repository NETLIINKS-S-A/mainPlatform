// @filename: GuardsView.ts
import { UIControl } from "../../../Libs/lib.types.js"
import { getEntitiesData } from "../../../Libs/lib.request.js"
import { UI } from "../../../Libs/lib.dom.js"
import { pagination } from "../../../Libs/lib.tools.js"
import { renderGuardData } from "./GuardsRenderData.js"
import { TableFunctions } from "./GuardsViewFuncs.js"

const tableRows = UI.tableRows
const UIApp = UI.App
const app = UIApp?.content
const appTools = UIApp?.tools
let currentPage: number = 1

export async function guardsView() {
    // Write application template
    app.innerHTML = `
    <h1 class="app_title">Guardias</h1>
    <table class="table">
        <thead>
            <tr>
                <th>Nombre</th>
                <th>ID</th>
                <th>Estado</th>
                <th>Ciudadela</th>
                <th width="45px"></th>
                <th width="45px"></th>
            </tr>
        </thead>
        <tbody id="table-body">

        </tbody>
    </table>

    <div class="pagination">
        <div id="pagination-counter"></div>
    </div>

    <div class="modal" id="delete">
        <div class="modal_dialog modal_body" style="max-width: 450px !important">
            <h2 class="modal_title">Deseas eliminar <span id="entity-name"></span></h2>

            <div class="modal_footer">
                <button class="btn" id="cancel">Cancelar</button>
                <button class="btn btn_danger">Eliminar</button>
            </div>
        </div>
    </div>`

    // write appTools
    appTools.innerHTML = `
    <div class="toolbox">
        <div class="select filter">
            <input type="text" id="input-select" class="input select_box" placeholder="cargando..." readonly>
            <div class="select_options" id="select_options">
            </div>
        </div>

        <button class="btn btn_icon" id="addNewBusiness"><i class="fa-solid fa-user-plus"></i></button>
        <button class="btn btn_icon" id="addNewBusinessAdmin"><i class="fa-solid fa-shield-plus"></i></button>
        <div class="toolbox_spotlight">
            <input type="text" class="input input_spotlight" placeholder="Buscar por nombre" id="search-input">
            <label class="btn btn_icon spotlight_label" for="search-input"><i class="fa-solid fa-search"></i></label>
        </div>
    </div>`

    const BACKEND_DATA: any = await getEntitiesData("User")
    const arrayGuards: any = BACKEND_DATA.filter((guard: any) => `${guard.userType}`.includes("GUARD"))
    arrayGuards.filter((data: any) => data.isSuper == false)
    arrayGuards.filter((data: any) => data.customer == "prueba")


    // get rendered elements
    const tableBody: UIControl = document.querySelector("#table-body")
    const searchInput: UIControl = document.querySelector("#search-input")
    const paginationCounter: UIControl = document.getElementById("pagination-counter")

    const select: UIControl = document.querySelector(".select")
    const selectInput: UIControl = document.getElementById('input-select')
    const selectOptionsContainer: UIControl = document.querySelector('.select_options')

    // search data
    await searchInput?.addEventListener("keyup", (): void => {
        // @ts-ignore
        const arrayData = arrayGuardsFilteredByCustomer.filter((guard) =>
            `${guard.firstName}
             ${guard.lastName}
             ${guard.description}`
                .toLowerCase()
                .includes(searchInput.value.toLowerCase())
        )

        let filteredResult = arrayData.length
        if (filteredResult >= tableRows) filteredResult = tableRows

        renderGuardData(
            arrayData,
            tableBody,
            filteredResult,
            currentPage,
            paginationCounter
        )
        pagination(
            arrayData,
            paginationCounter,
            tableRows,
            currentPage,
            tableBody,
            renderGuardData
        )
    })

    // write table template
    tableBody.innerHTML = `
    <tr>
        <td>Cargando...</td>
        <td>Cargando...</td>
        <td>Cargando...</td>
        <td>Cargando...</td>
        <td><button class="btn"><i class="fa-solid fa-pencil"></i></button></td>
        <td><button class="btn"><i class="fa-solid fa-trash"></i></button></td>
    </tr>
    `.repeat(tableRows)

    renderGuardData(
        arrayGuards,
        tableBody,
        tableRows,
        currentPage,
        paginationCounter
    )
    pagination(
        arrayGuards,
        paginationCounter,
        tableRows,
        currentPage,
        tableBody,
        renderGuardData
    )

}

let tableFunctions: TableFunctions = new TableFunctions()
