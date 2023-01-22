// @filename: index.ts
import { login } from "./Views/Login/Login.js";
import { App } from "./Views/Login/TokenValidator.js";
import { renderAppDate } from "./Views/ApplicationUI/ApplicationDateAndTime.js";
const app = new App();
// render login window
app.render();
// get login elements
const loginForm = document.getElementById("login-form");
const userEmail = document.getElementById("user-email");
const userPassword = document.getElementById("user-password");
// submit data
loginForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    if (userEmail?.value === "")
        alert('El campo "correo" no puede estar vacío');
    else if (userPassword?.value === "")
        alert('El campo "Contraseña" no puede estar vacío');
    else
        login(userEmail.value, userPassword.value);
});
// check token validation at the app start
app.checkToken();
renderAppDate();
// Keybindings
window.addEventListener("keyup", (e) => {
    const spotlight = document.getElementById("spotlight");
    let key = e.code;
    if (e.altKey && key == "KeyS")
        spotlight?.focus();
});
