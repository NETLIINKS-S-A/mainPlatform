// @filename: BusinessView.ts
import { UI } from "../../DOMElements.js";
import { closeBusinessModal, openBusinessEditor, updateBusinessData, MultiInput, NewBusiness } from "./BusinessFunctions.js";
import { getData } from "../../RequestOptions.js";
let tableRows = UI.tableRows; // number of rows to show on tables
let UIApp = UI.App;
export async function renderBusiness() {
    const url = "https://backend.netliinks.com:443/rest/entities/Business?fetchPlan=full";
    // BusinesView interface
    const appContent = UIApp?.content;
    appContent.innerHTML = `
        <h1 class="app_title">Empresas</h1>
        <table class="table">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>RUC</th>
                    <th>Estado</th>
                    <th></th>
                </tr>
            </thead>
            <tbody id="tableBody">

            </tbody>
        </table>

        <div class="pagination">
            <div id="paginationCounter"></div>
            <input type="number" placeholder="${tableRows}" id="paginationLimiter" min="${tableRows}" max="30">
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
                        <div class="rucInputs">
                            <label for="n1" class="form_label">RUC</label>
                            <input multiInput firstMultiInput type="text" maxlength="1" placeholder="0" class="input input_block" name="n1" id="n1">
                            <input multiInput type="text" maxlength="1" placeholder="0" class="input input_block" name="n2">
                            <input multiInput type="text" maxlength="1" placeholder="0" class="input input_block" name="n3">
                            <input multiInput type="text" maxlength="1" placeholder="0" class="input input_block" name="n4">
                            <input multiInput type="text" maxlength="1" placeholder="0" class="input input_block" name="n5">
                            <input multiInput type="text" maxlength="1" placeholder="0" class="input input_block" name="n6">
                            <input multiInput type="text" maxlength="1" placeholder="0" class="input input_block" name="n7">
                            <input multiInput type="text" maxlength="1" placeholder="0" class="input input_block" name="n8">
                            <input multiInput type="text" maxlength="1" placeholder="0" class="input input_block" name="n9">
                            <input multiInput type="text" maxlength="1" placeholder="0" class="input input_block" name="n10">
                        </div>
                    </div>
                </form>

                <div class="modal_footer">
                    <button class="btn" id="closeEditor">Cancelar</button>
                    <button class="btn btn_success" id="updateData">Guardar</button>
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
                        <div class="rucInputs">
                            <label for="n1" class="form_label">RUC</label>
                            <input multiInput firstMultiInput type="text" maxlength="1" placeholder="0" class="input input_block" name="n1" id="n1">
                            <input multiInput type="text" maxlength="1" placeholder="0" class="input input_block" name="n2">
                            <input multiInput type="text" maxlength="1" placeholder="0" class="input input_block" name="n3">
                            <input multiInput type="text" maxlength="1" placeholder="0" class="input input_block" name="n4">
                            <input multiInput type="text" maxlength="1" placeholder="0" class="input input_block" name="n5">
                            <input multiInput type="text" maxlength="1" placeholder="0" class="input input_block" name="n6">
                            <input multiInput type="text" maxlength="1" placeholder="0" class="input input_block" name="n7">
                            <input multiInput type="text" maxlength="1" placeholder="0" class="input input_block" name="n8">
                            <input multiInput type="text" maxlength="1" placeholder="0" class="input input_block" name="n9">
                            <input multiInput type="text" maxlength="1" placeholder="0" class="input input_block" name="n10">
                        </div>
                    </div>
                </form>

                <div class="modal_footer">
                    <button class="btn" id="closeAddNewBusinessModal">Cancelar</button>
                    <button class="btn btn_success" id="saveNewBusiness">Guardar</button>
                </div>
            </div>
        </div>
        `;
    // Add tools
    const toolbox = UIApp?.tools;
    toolbox.innerHTML = `
        <div class="toolbox">
            <button class="btn btn_icon" id="addNewBusiness"><i class="fa-solid fa-plus"></i></button>
            <div class="toolbox_spotlight">
                <input type="text" class="input input_spotlight" placeholder="Buscar por nombre" id="spotlight">
                <label class="btn btn_icon spotlight_label" for="spotlight"><i class="fa-solid fa-filter"></i></label>
            </div>
        </div>`;
    let tableData = [];
    const search = document.querySelector("#spotlight");
    const tableBody = document.querySelector("#tableBody");
    search?.addEventListener("keyup", () => {
        // @ts-ignore
        const filteredDatas = tableData.filter(filteredData => `${filteredData.name}`.includes(search.value));
        let filteredDataResult = filteredDatas.length;
        displayFilteredItems(filteredDatas, tableBody, filteredDataResult, currentPage);
        setupPagination(filteredDatas, pagination, tableRows);
    });
    // Table placeholder
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
    // const data = await getData(url);
    tableData = await getData(url);
    // pagination
    const pagination = document.getElementById("paginationCounter");
    let currentPage = 1;
    /* ******************************************
    DISPLAY TABLE DATA AND FILTERED TABLE DATA
    ******************************************** */
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
                    <td>${item.createdBy}</td>
                    <td>
                        <button class="btn btn_table-editor" data-id="${item.id}">
                            <i class="fa-solid fa-pencil"></i>
                        </button>
                    </td>
                </tr>`;
            wrapper.appendChild(itemElement);
        }
        const businessModalObjs = {
            add: {
                open: document.getElementById("addNewBusiness"),
                close: document.getElementById("closeAddNewBusinessModal"),
                save: document.getElementById("saveNewBusiness"),
                form: document.getElementById("createBusinessForm")
            },
            edit: {
                open: document.querySelectorAll("tr td button"),
                close: document.getElementById("closeEditor"),
                update: document.getElementById("updateData"),
            }
        };
        /* ********************************
        ADD NEW BUSINESS
        ******************************** */
        let newBusiness = new NewBusiness();
        // Open modal
        businessModalObjs.add.open?.addEventListener("click", () => newBusiness.open("addNewBusinessModal"));
        // Close modal
        businessModalObjs.add.close?.addEventListener("click", () => closeBusinessModal("addNewBusinessModal"));
        // Save new business
        businessModalObjs.add.save?.addEventListener("click", () => {
            newBusiness.add("addNewBusinessModal");
        });
        // NEW business on Submit
        const newBusinessForm = document.getElementById("businessEditorForm");
        newBusinessForm?.addEventListener("submit", (e) => {
            e.preventDefault();
            updateBusinessData("editBusiness", multiInputElems);
            displayFilteredItems(tableData, tableBody, tableRows, currentPage);
        });
        /* ********************************
        EDIT BUSINESS
        ******************************** */
        // Open editor
        businessModalObjs.edit.open?.forEach((openEditorButton) => {
            openEditorButton.addEventListener("click", () => {
                let entity = openEditorButton.dataset.id;
                openBusinessEditor(entity, url, "editBusiness", multiInputElems);
            });
        });
        // CloseEditor
        businessModalObjs.edit.close?.addEventListener("click", () => closeBusinessModal("editBusiness"));
        // updateData
        businessModalObjs.edit.update?.addEventListener("click", () => updateBusinessData("editBusiness", multiInputElems));
        // updateData on Submit
        const businessEditorForm = document.getElementById("businessEditorForm");
        businessEditorForm?.addEventListener("submit", (e) => {
            e.preventDefault();
            updateBusinessData("editBusiness", multiInputElems);
            displayFilteredItems(tableData, tableBody, tableRows, currentPage);
        });
        /* ********************************
        RUC MULTI-INPUT
        ******************************** */
        const multiInputElems = document.querySelectorAll("[multiInput]");
        const multiInputFirstElems = document.querySelectorAll("[firstMultiInput]");
        const multiInputFuncs = new MultiInput;
        let rucValue = []; // save data here
        console.log(multiInputFirstElems);
        multiInputFirstElems?.forEach((input, i) => {
            console.log(input);
            input.addEventListener("paste", (e) => {
                multiInputFuncs.handlePaste(e, multiInputElems);
            });
        });
        // multiInputFirstElems?.forEach((item: UIElement, i: number) => {
        //     item[i].addEventListener("paste", (e: SubmitEvent): void => multiInputFuncs.handlePaste(e, multiInputElems))
        // })
        multiInputElems[0].addEventListener("paste", (e) => multiInputFuncs.handlePaste(e, multiInputElems));
        multiInputElems[10].addEventListener("paste", (e) => multiInputFuncs.handlePaste(e, multiInputElems));
        // RUC FROM NEW BUSINESS
        //
        // Change to next input when write a value
        businessEditorForm?.addEventListener("input", (ev) => multiInputFuncs.handleInput(ev));
        // save data on rucValue
        businessEditorForm?.addEventListener("submit", (e) => {
            e.preventDefault();
            // @ts-ignore
            multiInputElems?.forEach((rucInput, i) => rucValue.push(rucInput.value));
        });
        // RUC FROM NEW BUSINESS
        businessModalObjs.add.form?.addEventListener("input", (e) => multiInputFuncs.handleInput(e));
        businessModalObjs.add.form?.addEventListener("submit", (e) => {
            e.preventDefault();
            // @ts-ignore
            multiInputElems?.forEach((rucInput, i) => rucValue.push(rucInput.value));
        });
    } // End displayFilteredItems
    /* ********************************
    PAGINATION
    ******************************** */
    // calculate pagination items
    function setupPagination(items, wrapper, rowsPerPage) {
        wrapper.innerHTML = "";
        let pageCount = Math.ceil(items.length / rowsPerPage);
        for (let i = 1; i < pageCount + 1; i++) {
            let btn = paginationButton(i, items);
            wrapper.appendChild(btn);
        }
    }
    // Create and add pagination buttons
    function paginationButton(page, items) {
        let button = document.createElement("button");
        button.innerText = page;
        if (currentPage == page)
            button.classList.add("active");
        button.addEventListener("click", () => {
            currentPage = page;
            displayFilteredItems(items, tableBody, tableRows, currentPage);
            let currentButton = document.querySelector('pagination button.active');
            currentButton.classList.remove("active");
            button.classList.add("active");
        });
        return button;
    }
    // Display data and pagination
    displayFilteredItems(tableData, tableBody, tableRows, currentPage);
    setupPagination(tableData, pagination, tableRows);
}
