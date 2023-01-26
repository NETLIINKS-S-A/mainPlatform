// @filename: BusinessEditor.ts
import { Modal } from "../../Classes.js"
import { getData, updateData } from "../../Libs/lib.request.js"
import { UIElement } from "../../Libs/lib.types.js"
import { customerView } from "./CustomerView.js"

let entityURL: string
// Close editor
export function closeBusinessModal(id: string): void {
    let editor = new Modal(id)
    editor.close()
}

export class CustomerEditor {
    async open(entity: string, id: string): Promise<void> {
        let editor = new Modal(id)
        editor.open()

        entityURL = `https://backend.netliinks.com:443/rest/entities/Customer/${entity}`
        let data = await getData(entityURL)

        // Write business data on modal window
        const entityName: UIElement = document.getElementById("entityName")
        const businessName: UIElement = document.getElementById("businessName")

        entityName.innerHTML = data.name
        businessName.value = data.name
        const rucValue = data.ruc
    }

    async update(modalID: string): Promise<void> {
        const businessName: UIElement = document.getElementById("businessName")
        // get inputData
        let raw = JSON.stringify({
            name: businessName.value,
        })

        // preventing rename with a empty value
        if (businessName.value === "" || businessName.value.trim() === "")
            closeBusinessModal(modalID)
        else {
            updateData(entityURL, raw)
            closeBusinessModal(modalID)
            setTimeout(() => {
                customerView() // reload changes
            }, 1000)
        }
    }
}

export class NewBusiness {
    open(id: string): void {
        let editorWindow = new Modal(id)
        editorWindow.open()
        console.info("this function is under construction")
    }

    add(id: string): void {
        closeBusinessModal(id)
    }

    clearInputs(inputs: UIElement): void {
        inputs?.forEach((input: any) => {
            input.value = ""
        })
    }
}

function clearRucIinput(ruc: any): void {
    ruc?.forEach((r: any) => {
        r.value = ""
    })
}
