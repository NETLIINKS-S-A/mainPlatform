// @filename: UsersView.ts
import { getEntitiesData } from "../../../Libs/lib.request.js";
import { pagination } from "../../../Libs/lib.tools.js";
import { settings } from "../../../Libs/lib.settings.js";
import { UI as DOM } from "../../../Libs/lib.dom.js";
import { displayUserData } from "./ClientsRender.js";
import { FNClients } from "./ClientsFunctions.js";
// Page settings
const LIMIT_ROWS = settings.limitRows;
const currentPage = settings.currentPaginationPage;
// DOM Elements
const DOM_ = DOM.App;
const app = DOM_?.content;
const appTools = DOM_?.tools;
export async function clientsView() {
    let GET_DATA = await getEntitiesData("User");
    let notSuper = GET_DATA.filter((data) => data.isSuper === false);
    let arrayUsers = notSuper.filter((data) => `${data.userType}`.includes("CUSTOMER"));
    // BusinesView interface
    app.innerHTML = `
        <h1 class="app_title">Clientes</h1>
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
            <tbody id="tableBody">

            </tbody>
        </table>

        <div class="pagination">
            <div id="paginationCounter"></div>
            <input type="number" placeholder="${LIMIT_ROWS}" id="paginationLimiter" min="${LIMIT_ROWS}" max="30">
        </div>`;
    // Add tools
    appTools.innerHTML = `
        <div class="toolbox">
            <div class="select">
                <input type="text" id="input-select" class="input select_box" placeholder="cargando..." readonly>
                <div class="select_options" id="select_options">
                </div>
            </div>

            <button class="btn btn_icon" id="add-new-client"><i class="fa-solid fa-user-plus"></i></button>

            <button class="btn btn_icon" id="addNewClientAdmin"><i class="fa-solid fa-shield-plus"></i></button>

            <div class="toolbox_spotlight">
            <label class="btn btn_icon spotlight_label" for="search-input"><i class="fa-solid fa-search"></i></label>
            <input type="text" class="input input_spotlight" placeholder="Buscar por nombre" id="search-input">
            </div>
        </div>`;
    // HTML ELEMENTS
    const tableBody = document.querySelector("#tableBody");
    const searchInput = document.querySelector("#search-input");
    const paginationCounter = document.getElementById("paginationCounter");
    // search data on real-time
    await searchInput?.addEventListener("keyup", () => {
        const arrayData = arrayUsers.filter((user) => `${user.firstName}
             ${user.lastName}
             ${user.description}`
            .toLowerCase()
            .includes(searchInput.value.toLowerCase()));
        let filteredResult = arrayData.length;
        if (filteredResult >= LIMIT_ROWS)
            filteredResult = LIMIT_ROWS;
        displayUserData(arrayData, tableBody, filteredResult, currentPage, paginationCounter);
        pagination(arrayData, paginationCounter, LIMIT_ROWS, currentPage, tableBody, displayUserData);
    });
    // Table placeholder
    tableBody.innerHTML = `
    <tr>
        <td>Cargando...</td>
        <td>Cargando...</td>
        <td>Cargando...</td>
        <td><button class="btn"><i class="fa-solid fa-pencil"></i></button></td>
        <td><button class="btn"><i class="fa-solid fa-trash"></i></button></td>
    </tr>`.repeat(LIMIT_ROWS);
    // Display data and pagination
    displayUserData(arrayUsers, tableBody, LIMIT_ROWS, currentPage, paginationCounter);
    pagination(arrayUsers, paginationCounter, LIMIT_ROWS, currentPage, tableBody, displayUserData);
    // add New client
    const addNewUserButton = document.getElementById("add-new-client");
    console.log(addNewUserButton);
    addNewUserButton.addEventListener("click", () => {
        FNClients.new_();
    });
}
