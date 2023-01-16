// @filename: BusinessEditor.ts
import { Modal } from '../../Classes.js';
import { getData, updateData } from '../../RequestOptions.js';
import { renderCustomers } from './CustomerView.js';
let entityURL;
// Close editor
export function closeBusinessModal(id) {
    let editor = new Modal(id);
    editor.close();
}
export class CustomerEditor {
    async open(entity, id, rucInput) {
        let editor = new Modal(id);
        editor.open();
        entityURL = `https://backend.netliinks.com:443/rest/entities/Customer/${entity}`;
        let data = await getData(entityURL);
        // Write business data on modal window
        const entityName = document.getElementById('entityName');
        const businessName = document.getElementById('businessName');
        entityName.innerHTML = data.name;
        businessName.value = data.name;
        const rucValue = data.ruc;
        // clear multi-input in cas there is written information
        clearRucIinput(rucInput);
    }
    async update(modalID) {
        const businessName = document.getElementById('businessName');
        // get inputData
        let raw = JSON.stringify({
            name: businessName.value,
        });
        // preventing rename with a empty value
        if (businessName.value === '' || businessName.value.trim() === '')
            closeBusinessModal(modalID);
        else {
            updateData(entityURL, raw);
            closeBusinessModal(modalID);
            setTimeout(() => {
                renderCustomers(); // reload changes
            }, 1000);
        }
    }
}
export class MultiInput {
    clearInputs(inputs) {
        inputs?.forEach((r) => {
            r.value = '';
        });
    }
    handleInput(e) {
        const input = e.target;
        if (input?.nextElementSibling && input?.value)
            input.nextElementSibling.focus();
    }
    handlePaste(e, inputs) {
        const paste = e.clipboardData.getData('text');
        inputs?.forEach((input, i) => {
            input.value = paste[i];
        });
    }
}
export class NewBusiness {
    open(id) {
        let editorWindow = new Modal(id);
        editorWindow.open();
        console.info('this function is under construction');
    }
    add(id) {
        closeBusinessModal(id);
    }
    clearInputs(inputs) {
        inputs?.forEach((input) => {
            input.value = '';
        });
    }
}
function clearRucIinput(ruc) {
    ruc?.forEach((r) => {
        r.value = '';
    });
}
