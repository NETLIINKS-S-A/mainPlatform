import { getEntitiesData } from "../../../Libs/lib.request.js";
import { UI } from "../../../Libs/lib.dom.js";
import { pagination } from "../../../Libs/lib.tools.js";
import { renderGuardData } from "./GuardsRenderData.js";
import { TableFn } from "./GuardsViewFuncs.js";
const tableRows = UI.tableRows;
const UIApp = UI.App;
const app = UIApp?.content;
const appTools = UIApp?.tools;
let currentPage = 1;
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

    <div id="modal-container"></div>`;
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
    </div>`;
    const BACKEND_DATA = await getEntitiesData("User");
    const arrayGuards = BACKEND_DATA.filter((guard) => `${guard.userType}`.includes("GUARD"));
    arrayGuards.filter((data) => data.isSuper == false);
    arrayGuards.filter((data) => data.customer == "prueba");
    // get rendered elements
    const tableBody = document.querySelector("#table-body");
    const searchInput = document.querySelector("#search-input");
    const paginationCounter = document.getElementById("pagination-counter");
    const select = document.querySelector(".select");
    const selectInput = document.getElementById('input-select');
    const selectOptionsContainer = document.querySelector('.select_options');
    // search data
    await searchInput?.addEventListener("keyup", () => {
        // @ts-ignore
        const arrayData = arrayGuardsFilteredByCustomer.filter((guard) => `${guard.firstName}
             ${guard.lastName}
             ${guard.description}`
            .toLowerCase()
            .includes(searchInput.value.toLowerCase()));
        let filteredResult = arrayData.length;
        if (filteredResult >= tableRows)
            filteredResult = tableRows;
        renderGuardData(arrayData, tableBody, filteredResult, currentPage, paginationCounter);
        pagination(arrayData, paginationCounter, tableRows, currentPage, tableBody, renderGuardData);
    });
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
    `.repeat(tableRows);
    renderGuardData(arrayGuards, tableBody, tableRows, currentPage, paginationCounter);
    pagination(arrayGuards, paginationCounter, tableRows, currentPage, tableBody, renderGuardData);
    // table editors
    const showEditor = document.querySelectorAll(".btn_table-editor");
    TableFn.edit(showEditor);
}
