export async function renderGuardData(items, tableBody, rowsPerPage, page, paginationElement) {
    tableBody.innerHTML = "";
    page--;
    let start = rowsPerPage * page;
    let end = start + rowsPerPage;
    let arrayGuards = items.slice(start, end);
    let index;
    for (index = 0; index < arrayGuards.length; index++) {
        let guard = arrayGuards[index];
        let row = document.createElement("tr");
        row.innerHTML = `
        <tr>
            <td>${guard?.firstName} ${guard?.lastName}</td>
            <td class="monospace">${guard.email}</td>
            <td class="tag"><i>${guard.state._instanceName}</i></td>
            <td class="tag"><i>${guard.citadel?.description}</i></td>
            <td class="tag"><i>${guard.phone}</i></td>
            <td><button class="btn btn_table-editor" data-id="${guard?.id}"><i class="fa-solid fa-pencil"></i></button></td>
            <td><button class="btn btn_table-delete" id="deleteGuard" data-id="${guard?.id}"><i class="fa-solid fa-trash"></i></button></td>
            </td>
        </tr>`;
        // write data on table
        tableBody.appendChild(row);
    }
    const deleteButtons = document.querySelectorAll(".btn_table-delete");
    const modalCancelButton = document.getElementById("cancel");
}
