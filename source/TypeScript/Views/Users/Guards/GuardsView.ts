// @filename: GuardsView.ts
import { UIElement } from "../../../Types/GeneralTypes.js"
import { getEntitiesData } from "../../../Libs/lib.request.js"
import { UI } from "../../../Libs/lib.dom.js"
import { setupPagination } from "../../../Libs/lib.tools.pagination.js"
import { renderGuardData } from "./GuardsRenderData.js"
import { customerNames } from "../../../Libs/lib.data.js"

const tableRows = UI.tableRows
const UIApp = UI.App
const app = UIApp?.content
const appTools = UIApp?.tools
let currentPage: number = 1

export async function guardsView() {
    let GET_DATA: any = await getEntitiesData("User")
    let notSuper = GET_DATA.filter((data: any) => data.isSuper == false)
    let arrayGuards: any = notSuper.filter((data: any) =>
        `${data.userType}`.includes("GUARD")
    )

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
                <th></th>
                <th></th>
            </tr>
        </thead>
        <tbody id="table-body">

        </tbody>
    </table>

    <div class="pagination">
        <div id="pagination-counter"></div>
    </div>

    <!-- =========================
               EDITOR
    ========================= -->
    <div class="modal" id="editBusiness">
        <div class="modal_dialog modal_body" style="max-width: 450px !important">
            <h2 class="modal_title">Editar <span id="entityName" class="modal_title-name"></span></h2>

            <form autocomplete="off" id="businessEditorForm">
                <div class="input_group">
                    <label for="businessName" class="form_label">Nombre</label>
                    <input class="input" id="businessName" placeholder="Nombre">
                </div>

                <div class="input_group">
                    <label class="form_label">RUC</label>
                    <input type="text" class="input" id="rucInputElement" maxlength="10">
                </div>

                <div class="form_group">
                    <div class="input_group customerStatus">
                        <label for="customerStatus" class="form_label">Estado: <span id="customerStatusLabel">inactivo</span></label>
                        <input type="checkbox" name="customerStatus" id="customerStatus" class="toggle">
                    </div>

                    <div class="input_group">
                        <label for="vehicularEntrance" class="form_label">Ingreso vehicular: <span id="customerVehicularEntranceLabel">no</span></label>
                        <input type="checkbox" name="vehicularEntrance" id="vehicularEntrance" class="toggle">
                    </div>
                </div>
            </form>

            <div class="modal_footer">
                <button class="btn" id="closeEditor">Cancelar</button>
                <button class="btn btn_success" id="updateCutomerEntity">Guardar</button>
            </div>
        </div>
    </div>

    <!-- =========================
        ADD NEW BUSINESS
    ========================= -->
    <div class="modal" id="addNewBusinessModal">
        <div class="modal_dialog modal_body" style="max-width: 450px !important">
            <h2 class="modal_title">Crear nueva empresa</h2>

            <form autocomplete="off" id="createBusinessForm">
                <div class="input_group">
                    <label for="businessName" class="form_label">Nombre</label>
                    <input class="input" id="businessName" placeholder="Nombre">
                </div>

                <div class="input_group">
                    <label class="form_label">RUC</label>
                    <input type="text" class="input" id="rucInputElement" maxlength="10">
                </div>

                <div class="form_group">
                    <div class="input_group customerStatus">
                        <label for="customerStatus" class="form_label">Estado: <span id="customerStatusLabel">inactivo</span></label>
                        <input type="checkbox" name="customerStatus" id="customerStatus" class="toggle">
                    </div>

                    <div class="input_group">
                        <label for="vehicularEntrance" class="form_label">Ingreso vehicular: <span id="customerVehicularEntranceLabel">no</span></label>
                        <input type="checkbox" name="vehicularEntrance" id="vehicularEntrance" class="toggle">
                    </div>
                </div>

            </form>

            <div class="modal_footer">
                <button class="btn" id="closeAddNewBusinessModal">Cancelar</button>
                <button class="btn btn_success" id="saveNewBusiness">Guardar</button>
            </div>
        </div>
    </div>`

    // write appTools
    appTools.innerHTML = `
    <div class="toolbox">
        <div class="select">
            <input type="text" id="input-select" class="input select_box" placeholder="cargando..." readonly>
            <div class="select_options" id="select_options">

            </div>
        </div>

        <button class="btn btn_icon" id="addNewBusiness"><i class="fa-solid fa-plus"></i></button>
        <div class="toolbox_spotlight">
            <input type="text" class="input input_spotlight" placeholder="Buscar por nombre" id="search-input">
            <label class="btn btn_icon spotlight_label" for="search-input"><i class="fa-solid fa-filter"></i></label>
        </div>
    </div>`

    // get rendered elements
    const tableBody: UIElement = document.querySelector("#table-body")
    const searchInput: UIElement = document.querySelector("#search-input")
    const paginationCounter: UIElement =
        document.getElementById("pagination-counter")

    // search data
    await searchInput?.addEventListener("keyup", (): void => {
        // @ts-ignore
        const arrayData = arrayGuards.filter((guard) =>
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
        setupPagination(
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
    setupPagination(
        arrayGuards,
        paginationCounter,
        tableRows,
        currentPage,
        tableBody,
        renderGuardData
    )

    const select: UIElement = document.querySelector(".select")
    const selectInput: UIElement = document.getElementById('input-select')
    const selectOptionsContainer: UIElement = document.querySelector('.select_options')

    async function filterDataByCustomer(container: any): Promise<void> {
        let CNames = customerNames
        container.innerHTML = '' // clear template
        for (let i = 0; i < CNames.length; i++) {
            container.innerHTML += `
            <div class="select_option" id="${CNames.id}">${CNames[i].name}</div>`

            // Get first value as default value into select filter
            selectInput.value = CNames[0].name
        }

        const selectOPtions: UIElement = await selectOptionsContainer.querySelectorAll('div')
        // Open options on click
        select.addEventListener('click', (): void => select.classList.toggle("select_active"))

        selectOPtions.forEach((option: UIElement, i: number) => {
            i++
            option.addEventListener('click', async (): Promise<void> => {
                selectInput.value = await selectOPtions[i - 1].innerHTML
            })
        })
    }

    filterDataByCustomer(selectOptionsContainer)
}
