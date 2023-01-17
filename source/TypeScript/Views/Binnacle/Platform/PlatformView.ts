// @filename: PlatformView.ts
import { UI } from '../../../Libs/lib.dom.js';
import { getEntitiesData } from '../../../Libs/lib.request.js';
import { setupPagination } from '../../../Libs/lib.tools.pagination.js';
import { UIElement } from '../../../Types/GeneralTypes.js';
import { renderPlatformData } from './PlatformRenderData.js';

const tableRows: number = 22;
const UIApp = UI.App;
const app = UIApp?.content;
const appTools = UIApp?.tools;
const currentPage: number = 1;

export async function platformView(): Promise<void> {
    // write application template
    app.innerHTML = `
    <h1 class="app_title">Accesos <span class="badge badge_title" id="data-count">Calculando...</span></h1>
    <table>
        <thead>
            <tr>
                <th>Usuario</th>
                <th>Dispositivo</th>
                <th>Plataforma</th>
                <th>Empresa</th>
                <th>Fecha</th>
                <th>Hora</th>
            </tr>
            <tbody id="table-body">
            </tbody>
    </table>

    <div class="pagination" style="display: none !important">
        <div id="pagination-counter"></div>
    </div>`;

    // write app tools
    appTools.innerHTML = `
    <div class="toolbox">
        <div class="toolbox_spotlight">
            <input type="text" class="input input_spotlight" placeholder="buscar" id="search-input">
            <label class="btn btn_icon spotlight_label" for="search-input"><i class="fa-solid fa-filter"></i></label>
        </div>
    </div>`;

    // get elements
    const tableBody: UIElement = document.querySelector('#table-body');
    const searchInput: UIElement = document.querySelector('#search-input');
    const paginationCounter: UIElement =
        document.getElementById('pagination-counter');

    // write table template
    tableBody.innerHTML = `
    <tr>
        <td>Cargando...</td>
        <td>Cargando...</td>
        <td>Cargando...</td>
        <td>Cargando...</td>
        <td>Cargando...</td>
        <td>Cargando...</td>
    </tr>`.repeat(tableRows);

    let GET_DATA = await getEntitiesData('WebAccess');
    let arrayPlatform: any = GET_DATA;

    const dataCount: UIElement = document.getElementById("data-count");
    dataCount.innerHTML = `${arrayPlatform.length} accesos`

    await searchInput?.addEventListener('keyup', (): void => {
        const arrayData = arrayPlatform.filter((events: any) =>
            `${events.user.username}
             ${events.userAgent}
             ${events.system.name}
             ${events.customer.name}`
                .toLowerCase()
                .includes(searchInput?.value.toLowerCase())
        );

        let filteredResult = arrayData.length;
        if (filteredResult >= tableRows) filteredResult = tableRows;

        renderPlatformData(
            arrayData,
            tableBody,
            filteredResult,
            currentPage,
            paginationCounter
        );

        setupPagination(
            arrayData,
            paginationCounter,
            tableRows,
            currentPage,
            tableBody,
            renderPlatformData
        );
    });

    // render data
    await renderPlatformData(
        arrayPlatform,
        tableBody,
        tableRows,
        currentPage,
        paginationCounter
    );

    setupPagination(
        arrayPlatform,
        paginationCounter,
        tableRows,
        currentPage,
        tableBody,
        renderPlatformData
    );
}
