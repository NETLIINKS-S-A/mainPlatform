// @filename: GuardsView.ts
// Functions
import { displayGuardsData } from "./GuardsRender.js";
import { FNGuards } from "./GuardsFunctions.js";
// Libs
import { UI as DOM } from "../../../Libs/lib.dom.js";
import { getEntitiesData } from "../../../Libs/lib.request.js";
import { settings } from "../../../Libs/lib.settings.js";
import { pagination } from "../../../Libs/lib.tools.js";
// Primary elements
let rows = settings.limitRows;
const currentPage = settings.currentPaginationPage;
const AppDOM = DOM?.App;
const appToolbar = AppDOM?.tools;
const appContent = AppDOM?.content;
console.log(rows);
export async function guardsView() {
    const BACKEND_DATA = await getEntitiesData("User");
    let notSuperUser = BACKEND_DATA.filter((data) => data.isSuper === false);
    let arrayGuards = notSuperUser.filter((data) => `${data.userType}`.includes("GUARD"));
    // Write application template
    appContent.innerHTML = `
    <h1 class="app_title">Guardias</h1>
    <table class="table">
        <thead>
            <tr>
                <th>Nombre</th>
                <th>ID</th>
                <th>Estado</th>
                <th>Ciudadela</th>
                <th>Teléfono</th>
                <th width="45px"></th>
                <th width="45px"></th>
            </tr>
        </thead>
        <tbody id="table-body">

        </tbody>
    </table>

    <div class="pagination">
        <div id="pagination"></div>
    </div>`;
    // write appTools
    appToolbar.innerHTML = `
    <div class="toolbox">
        <div class="select filter">
            <input type="text"
                id="input-select"
                class="input select_box"
                placeholder="cargando..."
                readonly>

            <div class="select_options" id="select_options">
            </div>
        </div>

        <button class="btn btn_icon" id="new-guard">
            <i class="fa-solid fa-user-plus"></i>
        </button>

        <button class="btn btn_icon" id="new-superuser">
            <i class="fa-solid fa-shield-plus"></i>
        </button>

        <div class="toolbox_spotlight">
            <input type="text"
                class="input input_spotlight"
                placeholder="Buscar por nombre"
                id="search-input">

            <label class="btn btn_icon spotlight_label"
                for="search-input">
                <i class="fa-solid fa-search"></i>
            </label>
        </div>
    </div>`;
    // get rendered elements
    const tableBody = document.querySelector("#table-body");
    const searchInput = document.querySelector("#search-input");
    const pagination_ = document.getElementById("pagination");
    const newGuard_ = document.getElementById("new-guard");
    // search data
    await searchInput?.addEventListener("keyup", () => {
        const arrayData = arrayGuards.filter((guard) => `${guard.firstName}
             ${guard.lastName}
             ${guard.description}`
            .toLowerCase()
            .includes(searchInput.value.toLowerCase()));
        let filteredResult = arrayData.length;
        console.log(filteredResult);
        if (filteredResult >= rows)
            filteredResult = rows;
        displayGuardsData(arrayData, tableBody, filteredResult, currentPage, pagination_);
        pagination(arrayData, pagination_, rows, currentPage, tableBody, displayGuardsData);
    });
    // write table template
    tableBody.innerHTML = `
    <tr>
        <td>Cargando...</td>
        <td>Cargando...</td>
        <td>Cargando...</td>
        <td>Cargando...</td>
        <td>Cargando...</td>
        <td><button class="btn"><i class="fa-solid fa-pencil"></i></button></td>
        <td><button class="btn"><i class="fa-solid fa-trash"></i></button></td>
    </tr>
    `.repeat(rows);
    displayGuardsData(arrayGuards, tableBody, rows, currentPage, pagination_);
    pagination(arrayGuards, pagination_, rows, currentPage, tableBody, displayGuardsData);
    newGuard_.addEventListener("click", () => {
        FNGuards.new();
    });
}
