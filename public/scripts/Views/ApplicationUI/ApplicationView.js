import { logout } from "../../Shared/Functions/Logout.js";
// import libs
import { getData } from "../../Backend/Connection.js";
// import views
import { customerView } from "../Customer/CustomerView.js";
import { clientsView } from "../Users/Clients/ClientsView.js";
import { guardsView } from "../Users/Guards/GuardsView.js";
import { emergencyUserView } from "../Users/Emergency/EmergencyUserView.js";
import { eventView } from "../Binnacle/Events/EventView.js";
import { platformView } from "../Binnacle/Platform/PlatformView.js";
import { administratorsView } from "../Users/Administrators/AdministratorView.js";
import { citadelsView } from "../Citadels/CitadelsView.js";
import { visitsView } from "../Binnacle/Visits/VisitsView.js";
import { notesView } from "../Binnacle/Notes/NotesView.js";
import { AppPreferences } from "../Preferences/Preferences.js";
import { AppContainer, AppContent, AppWrapper } from "../../Shared/Settings/Misc.settings.js";
export async function applicationView() {
    const url = "https://backend.netliinks.com:443/rest/userInfo?fetchPlan=full";
    const sidebar = document.getElementById("appSidebar");
    const content = AppContainer;
    const wrapper = AppWrapper;
    let data = await getData(url);
    async function renderInterface(interfaceData) {
        if (interfaceData.error)
            logout.exit_(); // if any error, close session (in case access token fails)
        else {
            wrapper.style.display = "block";
            content.style.display = "flex";
            sidebar.style.display = "flex";
            sidebar.innerHTML += `<div class="sidebar">

                <div class="sidebar_menu">

                    <div class="menu">
                        <div class="sidebar_brand">
                            <span class="menu_brandicon" alt="netliinks"></span>
                            <span class="menu_brandname">NETGUARD</span>
                            <span class="menu_username">${interfaceData.username}</span>
                    </div>
                        <div class="menu_item menu_item-isActive" id="stadistics-view">
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

                                <div class="menu_item">
                                    <div class="menu_item_label" id="emergency-view">
                                        <i class="fa-regular fa-siren-on"></i>
                                        <span>Emergencia</span>
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
                                <div class="menu_item" id="import-clients">
                                    <div class="menu_item_label">
                                        <i class="fa-regular fa-user"></i>
                                        <span>Clientes</span>
                                    </div>
                                </div>

                                <div class="menu_item" id="import-guards">
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
                                    <i class="fa-regular fa-book"></i>
                                    <span>Bitácora</span>
                                </div>
                            </div>

                            <div class="menu_items">
                                <div class="menu_item" id="binnacle-events">
                                    <div class="menu_item_label">
                                        <i class="fa-regular fa-circle-exclamation"></i>
                                        <span>Eventos</span>
                                    </div>
                                </div>

                                <div class="menu_item" id="binnacle-platform">
                                    <div class="menu_item_label">
                                        <i class="fa-regular fa-laptop"></i>
                                        <span>Accesos</span>
                                    </div>
                                </div>

                                <div class="menu_item" id="binnacle-visits">
                                    <div class="menu_item_label">
                                        <i class="fa-regular fa-user"></i>
                                        <span>Visitas</span>
                                    </div>
                                </div>

                                <div class="menu_item" id="binnacle-notes">
                                    <div class="menu_item_label">
                                        <i class="fa-regular fa-note"></i>
                                        <span>Notas</span>
                                    </div>
                                </div>

                                <!-- PENDING: this functions are not implemented yet -->
                                <!--
                                <div class="menu_item">
                                    <div class="menu_item_label" id="binnacle-markings">
                                        <i class="fa-regular fa-calendar"></i>
                                        <span>Marcaciones</span>
                                    </div>
                                </div>

                                <div class="menu_item" id="binnacle-vehicular">
                                    <div class="menu_item_label">
                                        <i class="fa-regular fa-car"></i>
                                        <span>Vehicular</span>
                                    </div>
                                </div>
                                -->
                            </div>
                        </div>

                        <div class="menu_item" id="citadels-view">
                            <div class="menu_item_label">
                                <i class="fa-regular fa-buildings"></i>
                                <span>Ciudadela</span>
                            </div>
                        </div>

                        <div class="menu_item" id="administrators-view">
                            <div class="menu_item_label">
                                <i class="fa-regular fa-shield"></i>
                                <span>Administradores</span>
                            </div>
                        </div>
                    </div>

                    <div class="sidebar_bottom">
                        <hr>
                        <div class="menu_links">
                            <a href="#" class="menu_link_item">
                                <div class="menu_link_item_label">
                                    <i class="fa-regular fa-circle-question"></i>
                                    <span>Soporte</span>
                                </div>
                            </a>

                            <a href="https://www.netliinks.com" class="menu_link_item">
                                <div class="menu_link_item_label">
                                    <i class="fa-regular fa-sparkles"></i>
                                    <span>Versión 2.0</span>
                                </div>
                            </a>

                            <a href="#" class="menu_link_item">
                                <div class="menu_link_item_label">
                                    <i class="fa-regular fa-newspaper"></i>
                                    <span>Notas de la versión</span>
                                </div>
                            </a>
                            <br>
                            <a href="#" class="menu_link_item">
                                <div class="menu_link_item_label">
                                    <i class="fa-regular fa-browser"></i>
                                    <span>Visita nuestra web</span>
                                </div>
                            </a>
                        </div>

                        <hr>

                        <div class="menu_logout">
                            <div class="menu_item" id="open-preferences">
                                <div class="menu_item_label">
                                    <i class="fa-regular fa-gear"></i>
                                    <span>Preferencias</span>
                                </div>
                            </div>

                            <a href="#" class="menu_link_item" id="logout">
                                <div class="menu_link_item_label">
                                    <i class="fa-regular fa-up-from-bracket"></i>
                                    <span>Salir</span>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>`;
            // render functions
            document
                .getElementById("stadistics-view")
                ?.addEventListener("click", (e) => renderBlankPage("Estadísticas"));
            document
                .getElementById("customers-view")
                ?.addEventListener("click", (e) => customerView());
            /* Users */
            // clients
            document
                .getElementById("clients-view")
                ?.addEventListener("click", (e) => clientsView());
            // guards
            document
                .getElementById("guards-view")
                ?.addEventListener("click", (e) => guardsView());
            // emergency
            document
                .getElementById("emergency-view")
                ?.addEventListener("click", (e) => emergencyUserView());
            /* Import */
            // clients
            document
                .getElementById("import-clients")
                ?.addEventListener("click", (e) => renderBlankPage("Importar clientes"));
            // guards
            document
                .getElementById("import-guards")
                ?.addEventListener("click", (e) => renderBlankPage("Importar guardias"));
            /* binnacle */
            // events
            document
                .getElementById("binnacle-events")
                ?.addEventListener("click", (e) => eventView());
            // platform
            document
                .getElementById("binnacle-platform")
                ?.addEventListener("click", (e) => platformView());
            // visits
            document
                .getElementById("binnacle-visits")
                ?.addEventListener("click", (e) => visitsView());
            // notes
            document
                .getElementById("binnacle-notes")
                ?.addEventListener("click", (e) => notesView());
            // Administrators
            document
                .getElementById("administrators-view")
                ?.addEventListener("click", () => administratorsView());
            // Citadels
            document
                .getElementById("citadels-view")
                ?.addEventListener("click", () => citadelsView());
            // PENDING: this functions are not implemented yet
            /*
            document
                .getElementById('binnacle-markings')
                ?.addEventListener('click', (e) =>
                    renderBlankPage('Marcaciones')
                );
            document
                .getElementById('binnacle-vehicular')
                ?.addEventListener('click', (e) =>
                    renderBlankPage('Vehicular')
                );
            */
            // Open app preferences
            document
                .getElementById("open-preferences")
                ?.addEventListener("click", () => {
                AppPreferences();
            });
            // Close session functions
            document.getElementById("logout")?.addEventListener("click", () => logout.open_());
            // End close session functions
            const menuItems = document.querySelectorAll(".menu_item");
            const menuItemToggle = document.querySelectorAll(".menu_item_toggle");
            menuItems?.forEach((menuItem) => {
                menuItem.addEventListener("click", () => {
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
        // Render selected view
        // customerView()
        // clientsView()
        guardsView();
        // emergencyUserView()
        // eventView()
        // platformView()
        // administratorsView()
        // citadelsView()
        // visitsView()
        // notesView()
        // AppPreferences()
        // Testing Views
        // dragAndDrop()
        // selectMenut()
    }
    renderInterface(data);
}
function renderBlankPage(name) {
    let content = AppContent;
    content.innerHTML = `
    <h1 class="app_title">${name}</h1>
    <div class="container">
        <p class="message">Lo sentimos, ${name.toLowerCase()} aún está en desarrollo.</p>
    </div>`;
}
