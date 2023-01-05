import { DTROptions } from '../Complements/RequestOptions.js';
import { UI } from '../Tools/AppElements.js';
/* =================================
Render Business Interface and Data
==================================== */
/**
 * @function renderBusinessData
 *
 */
export async function renderBusiness() {
    const url = "https://backend.netliinks.com:443/rest/entities/Business?fetchPlan=full";
    console.log("0t");
    let appContent = UI.App.content;
    appContent.innerHTML = `
        <h1 class="app_title">Empresas</h1>
        <table class="table">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>ID</th>
                    <th>Estado</th>
                    <th></th>
                </tr>
            </thead>
            <tbody id="tableBody">

            </tbody>
        </table>
    `;
    // Insert bussines tools
    let toolbox = UI.App.tools;
    toolbox.innerHTML = `
        <div class="toolbox">
            <button class="btn btn_icon"><i class="fa-solid fa-arrow-rotate-right"></i></button>
            <button class="btn btn_icon"><i class="fa-solid fa-plus"></i></button>
            <div class="toolbox_spotlight">
                <input type="text" class="input input_spotlight" placeholder="Buscar por nombre" id="spotlight">
                <label class="btn btn_icon spotlight_label" for="spotlight"><i class="fa-solid fa-filter"></i></label>
            </div>
        </div>`;
    let searchData = [];
    async function getData() {
        const response = await fetch(url, DTROptions);
        return await response.json();
    }
    console.log(getData());
    const search = document.querySelector("#spotlight");
    const tableBody = document.querySelector("#tableBody");
    search.addEventListener("keyup", () => {
        //@ts-ignore
        const filteredDatas = searchData.filter(filteredData => `${filteredData.name}`.includes(search.value));
        let filteredDataResult = filteredDatas.length;
        displayFilteredItems(filteredDatas, tableBody, filteredDataResult, currentPage);
        setupPagination(filteredDatas, pagination, UI.tableRows);
    });
    tableBody.innerHTML = `
            <tr>
                <td>Cargando...</td>
                <td>Cargando...</td>
                <td>Cargando...</td>
                <td>Cargando...</td>
            </tr>

            <tr>
                <td>Cargando...</td>
                <td>Cargando...</td>
                <td>Cargando...</td>
                <td>Cargando...</td>
            </tr>

            <tr>
                <td>Cargando...</td>
                <td>Cargando...</td>
                <td>Cargando...</td>
                <td>Cargando...</td>
            </tr>
        `;
    const data = await getData();
    searchData = data;
    // pagination
    const pagination = document.getElementById("paginationCounter");
    let currentPage = 1;
    function displayFilteredItems(items, wrapper, rowsPerPage, page) {
        wrapper.innerHTML = "";
        page--;
        let start = rowsPerPage * page;
        let end = start + rowsPerPage;
        let paginatedItems = items.slice(start, end);
        for (let i = 0; i < paginatedItems.length; i++) {
            let item = paginatedItems[i];
            let itemElement = document.createElement("tr");
            itemElement.innerHTML = `
                    <tr>
                        <td>${item.name}</td>
                        <td>${item.id}</td>
                        <td>${item.name}</td>
                        <td>
                            <button class="btn btn_table" onclick="editBusiness()">
                                <i class="fa-solid fa-pencil"></i>
                            </button>
                        </td>
                    </tr>
                `;
            wrapper.appendChild(itemElement);
        }
    } // End displayFilteredItems
    function setupPagination(items, wrapper, rowsPerPage) {
        wrapper.innerHTML = "";
        let pageCount;
    }
    displayFilteredItems(searchData, tableBody, UI.tableRows, currentPage);
}
