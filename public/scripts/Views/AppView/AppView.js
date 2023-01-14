// @filename: AppView.ts
import { UI } from "../../lib.dom.js";
import { renderCustomers } from "../CustomerView/CustomerView.js";
import { logOut, dismissLogOut, openLogOut } from "../Login/LogOut.js";
import { getData } from "../../RequestOptions.js";
import { renderGuards } from "../GuardsView/GuardsView.js";
import { renderUsers } from "../UsersView/UsersView.js";
export async function renderAppInterface() {
    const url = "https://backend.netliinks.com:443/rest/userInfo?fetchPlan=full";
    const sidebar = document.getElementById("appSidebar");
    const content = UI.App?.app;
    const wrapper = UI.App?.wrapper;
    let data = await getData(url);
    async function renderInterface(interfaceData) {
        if (interfaceData.error)
            logOut(); // if any error, close session (in case access token fails)
        else {
            wrapper.style.display = "block";
            content.style.display = "flex";
            sidebar.style.display = "flex";
            sidebar.innerHTML += `<div class="sidebar">
                <img class="menu_brandicon" src="./public/pictures/icon_login-light.png" alt="NETLIINKS LOGO">
                <span class="menu_brandname">NETGUARD</span>
                <span class="menu_username">${interfaceData.username}</span>

                <div class="menu">
                    <div class="menu_item menu_item-isActive">
                        <div class="menu_item_label">
                            <i class="fa-regular fa-chart-line"></i>
                            <span>Estadísticas</span>
                        </div>
                    </div>

                    <div class="menu_item" id="customers-view">
                        <div class="menu_item_label">
                            <i class="fa-regular fa-building"></i>
                            <span>Empresas</span>
                        </div>
                    </div>

                    <div class="menu_item_toggle">
                        <div class="menu_item">
                            <div class="menu_item_label">
                                <i class="fa-regular fa-user"></i>
                                <span>Usuarios</span>
                            </div>
                        </div>

                        <div class="menu_items">
                            <div class="menu_item" id="clients-view">
                                <div class="menu_item_label">
                                    <i class="fa-regular fa-user-group"></i>
                                    <span>Clientes</span>
                                </div>
                            </div>

                            <div class="menu_item">
                                <div class="menu_item_label" id="guards-view">
                                    <i class="fa-regular fa-user-police"></i>
                                    <span>Guardias</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="menu_item_toggle">
                        <div class="menu_item">
                            <div class="menu_item_label">
                                <i class="fa-regular fa-up-from-bracket"></i>
                                <span>Importar</span>
                            </div>
                        </div>

                        <div class="menu_items">
                            <div class="menu_item">
                                <div class="menu_item_label">
                                    <i class="fa-regular fa-user-group"></i>
                                    <span>Clientes</span>
                                </div>
                            </div>

                            <div class="menu_item">
                                <div class="menu_item_label">
                                    <i class="fa-regular fa-user-police"></i>
                                    <span>Guardias</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="menu_item_toggle">
                        <div class="menu_item">
                            <div class="menu_item_label">
                                <i class="fa-regular fa-user"></i>
                                <span>Bitácora</span>
                            </div>
                        </div>

                        <div class="menu_items">
                            <div class="menu_item">
                                <div class="menu_item_label">
                                    <i class="fa-regular fa-circle-exclamation"></i>
                                    <span>Eventos</span>
                                </div>
                            </div>

                            <div class="menu_item">
                                <div class="menu_item_label">
                                    <i class="fa-regular fa-laptop"></i>
                                    <span>Plataforma</span>
                                </div>
                            </div>

                            <div class="menu_item">
                                <div class="menu_item_label">
                                    <i class="fa-regular fa-user"></i>
                                    <span>Visitas</span>
                                </div>
                            </div>

                            <div class="menu_item">
                                <div class="menu_item_label">
                                    <i class="fa-regular fa-note"></i>
                                    <span>Notas</span>
                                </div>
                            </div>

                            <div class="menu_item">
                                <div class="menu_item_label">
                                    <i class="fa-regular fa-calendar"></i>
                                    <span>Marcaciones</span>
                                </div>
                            </div>

                            <div class="menu_item">
                                <div class="menu_item_label">
                                    <i class="fa-regular fa-car"></i>
                                    <span>Vehicular</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="menu_item">
                        <div class="menu_item_label">
                            <i class="fa-regular fa-buildings"></i>
                            <span>Ciudadela</span>
                        </div>
                    </div>

                    <div class="menu_item">
                        <div class="menu_item_label">
                            <i class="fa-regular fa-user-group"></i>
                            <span>Adminsitración</span>
                        </div>
                    </div>
                </div>

            <div class="menu_links">
                <a href="https://www.netliinks.com"><i class="fa-regular fa-circle-question"></i> <div>Soporte</div></a>
                <a href="https://www.netliinks.com"><i class="fa-regular fa-sparkles"></i> <div>Versión 2.0.0</div></a>
                <a href="https://www.netliinks.com"><i class="fa-regular fa-newspaper"></i> <div>Notas de la versión</div></a>
                <br>
                <a href="https://www.netliinks.com"><i class="fa-solid fa-browser"></i> <div>Visita nuestra web</div></a>
                <br>
                <a href="#" id="openLogOut"><i class="fa-solid fa-arrow-right-from-bracket"></i> <div>salir</div></a>
            </div>

            <div class="modal" id="logOutModal">
                <div class="modal_dialog modal_body">
                    <h2 class="modal_title">Cerrar sesión</h2>

                    <div class="modal_content">
                        <p>${interfaceData.username} ¿Deseas cerrar sesión?</p>
                    </div>

                    <div class="modal_footer">
                        <button class="btn" id="dismissLogOut">Cancelar</button>

                        <button class="btn btn_danger" id="logOut">Cerrar sesión</button>
                    </div>
                </div>
            </div>
            `;
            // render functions
            document.getElementById("customers-view")?.addEventListener("click", (e) => renderCustomers());
            document.getElementById("clients-view")?.addEventListener("click", (e) => renderUsers());
            document.getElementById("guards-view")?.addEventListener("click", (e) => renderGuards());
            // Close session functions
            document.getElementById("openLogOut")?.addEventListener("click", (e) => openLogOut("logOutModal"));
            document.getElementById("logOut")?.addEventListener("click", (e) => logOut());
            document.getElementById("dismissLogOut")?.addEventListener("click", (e) => dismissLogOut("logOutModal"));
            // End close session functions
            const menuItems = document.querySelectorAll('.menu_item');
            const menuItemToggle = document.querySelectorAll('.menu_item_toggle');
            menuItems?.forEach((menuItem) => {
                menuItem.addEventListener('click', () => {
                    menuItems.forEach((menuItem) => menuItem.classList.remove("menu_item-isActive"));
                    menuItemToggle?.forEach((IT) => IT?.classList.remove("menu_item_toggle-isActive"));
                    menuItem.classList.add("menu_item-isActive");
                });
            });
            menuItemToggle?.forEach((itemToggle) => {
                itemToggle?.addEventListener("click", () => {
                    itemToggle?.classList.add("menu_item_toggle-isActive");
                });
            });
        }
        renderCustomers();
    }
    renderInterface(data);
}
