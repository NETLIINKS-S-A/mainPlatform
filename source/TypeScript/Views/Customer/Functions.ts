// @filename: BusinessEditor.ts
import { getEntityData } from "../../Libs/lib.request.js"
import { UIControl } from "../../Libs/lib.types.js"
import { $color } from "../../Libs/lib.tools.js"

let entityURL: string
// Close editor

class Funcs {
    public async addTags(tableTag: any): Promise<void> {
        tableTag?.forEach((state: UIControl) => {
            if (state.innerText === "ENABLED" || state.innerText === "Enabled") {
                state.classList.add("g")
                state.innerText = "Activo"
            } else if (state.innerText === "DISABLED" || state.innerText === "DISABLED") {
                state.classList.add("i")
                state.innerText = "Inactivo"
            }
        })
    }

    public async verifyRucLength(tableRuc: any): Promise<void> {
        tableRuc.forEach((ruc: any) => {
            if (ruc.innerText.length > 10) {
                ruc.style.color = $color.red.r500
            } else if (ruc.innerText.length < 10) {
                ruc.style.color = $color.red.r500
            }
        })
    }

    public newCustomer(modalElement: UIControl): void {
        modalElement.innerHTML = `
        <div class="modal" id="modal">
            <div class="modal_dialog modal_body" style="max-width: 450px !important">
                <h2 class="modal_title">Nueva empresa</h2>

                <form>
                    <div class="input_group">
                        <label for="name" class="form_label">Nombre</label>
                        <input type="text" placeholder="empresa" class="input">
                    </div>

                    <div class="form_group">
                        <div class="input_group">
                            <label for="ruc" class="form_label">RUC</label>
                            <input type="text" placeholder="0900900000" class="input monospace" maxlength="10">
                        </div>

                        <div class="input_group">
                            <label class="form_label">Estado</label>

                            <div class="select">
                                <input type="text" id="input-select" class="input select_box" value="Activo" readonly>
                                <div class="select_options" id="select_options">
                                    <div class="select_option" data-status="active">Activo</div>
                                    <div class="select_option" data-status="inactive">Inactivo</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="input_group">
                        <label for="vehicular-entrance" class="form_label">Ingreso vehicular: <span id="customer-vehicular-status">no</span></label>
                        <input type="checkbox" name="vehicularEntrance" id="vehicular-entrance" class="toggle">
                    </div>

                </form>
                <div class="modal_footer">
                    <button class="btn" id="cancel">Cancelar</button>
                    <button class="btn btn_success" id="updateCutomerEntity">Guardar</button>
                </div>
            </div>
        </div>`
        this.open()


        const cancel: UIControl = document.getElementById("cancel")
        cancel.addEventListener('click', (): void => { this.cancel() })

        const toggle: UIControl = document.getElementById("vehicular-entrance")
        // toggle.checked = true
        let vehicularStatus: boolean
        let customerStatus: boolean

        toggle?.addEventListener('click', (): void => {
            const labelStatus: UIControl = document.getElementById("customer-vehicular-status")
            if (toggle?.checked) labelStatus.innerText = "si", vehicularStatus = true
            else labelStatus.innerText = "no", vehicularStatus = false
        })

        const select: UIControl = document.querySelector(".select")
        const selectInput: UIControl = document.getElementById('input-select')
        const selectOptions: UIControl = document.querySelectorAll('.select_option')

        select.addEventListener('click', () => {
            select.classList.toggle("select_active")
        })

        selectOptions.forEach((option: any) => {
            option.addEventListener('click', async (): Promise<void> => {
                if (option.dataset.status == "active") customerStatus = true
                else customerStatus = false

                selectInput.value = option.innerText

            })
        })
    }
    public async editCustomer(modalElement: UIControl, entity: any): Promise<void> {
        const currentEntity: any = await getEntityData(entity, "Customer")
        console.log(currentEntity)

        modalElement.innerHTML = `
        <div class="modal" id="modal">
            <div class="modal_dialog modal_body" style="max-width: 450px !important">
                <h2 class="modal_title">Editar empresa</h2>

                <form>
                    <div class="input_group">
                        <label for="customer-name" class="form_label">Nombre</label>
                        <input type="text" id="customer-name" placeholder="empresa" class="input" disabled="disabled">
                    </div>

                    <div class="form_group">
                        <div class="input_group">
                            <label for="customer-ruc" class="form_label">RUC</label>
                            <input type="text" placeholder="0900900000" class="input monospace" maxlength="10" id="customer-ruc">
                        </div>

                        <div class="input_group">
                            <label class="form_label">Estado</label>

                            <div class="select">
                                <input type="text" id="input-select" class="input select_box" value="Activo" readonly>
                                <div class="select_options" id="select_options">
                                    <div class="select_option" data-status="active">Activo</div>
                                    <div class="select_option" data-status="inactive">Inactivo</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="input_group">
                        <label for="vehicular-entrance" class="form_label">Ingreso vehicular: <span id="customer-vehicular-status">no</span></label>
                        <input type="checkbox" name="vehicularEntrance" id="vehicular-entrance" class="toggle">
                    </div>

                </form>
                <div class="modal_footer">
                    <button class="btn" id="cancel">Cancelar</button>
                    <button class="btn btn_success" id="updateCutomerEntity">Guardar</button>
                </div>
            </div>
        </div>`
        this.open()

        const cancel: UIControl = document.getElementById("cancel")
        cancel.addEventListener('click', (): void => { this.cancel() })

        // Fill data
        const customerNameInput: UIControl = document.getElementById("customer-name")
        const customerRUCInput: UIControl = document.getElementById("customer-ruc")
        customerNameInput.value = currentEntity.name
        customerRUCInput.value = parseInt(currentEntity.ruc)

        if (customerRUCInput.value == "NaN") customerRUCInput.classList.add("input_error")
        customerRUCInput.addEventListener("keyup", () => {
            customerRUCInput.classList.remove("input_error")
        })

        const toggle: UIControl = document.getElementById("vehicular-entrance")
        // toggle.checked = true
        let vehicularStatus: boolean
        let customerStatus: boolean

        toggle?.addEventListener('click', (): void => {
            const labelStatus: UIControl = document.getElementById("customer-vehicular-status")
            if (toggle?.checked) labelStatus.innerText = "si", vehicularStatus = true
            else labelStatus.innerText = "no", vehicularStatus = false
        })

        const select: UIControl = document.querySelector(".select")
        const selectInput: UIControl = document.getElementById('input-select')
        const selectOptions: UIControl = document.querySelectorAll('.select_option')

        select.addEventListener('click', () => {
            select.classList.toggle("select_active")
        })

        selectOptions.forEach((option: any) => {
            option.addEventListener('click', async (): Promise<void> => {
                if (option.dataset.status == "active") customerStatus = true
                else customerStatus = false

                selectInput.value = option.innerText

            })
        })
    }

    private cancel(): void {
        const modal: UIControl = document.getElementById("modal")

        setTimeout(() => modal.classList.toggle("open"), 200)

        modal.style.display = "none"
        modal.remove()
    }

    private open(): void {
        const modal: UIControl = document.getElementById("modal")
        modal.style.display = "block"
        setTimeout(() => {
            modal.classList.add("open")
        }, 200)
    }
}


export let CFN: Funcs = new Funcs()
