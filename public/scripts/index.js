import { login } from "./Views/Login/Login.js";
import { checkTokenValidation } from "./Views/Login/TokenValidator.js";
import { UI } from "./DomElements.js";
import { renderAppDate } from "./Views/AppView/AppDate.js";
// Login
const form = UI.Login?.form;
const mail = UI.Login?.mail;
const password = UI.Login?.password;
form?.addEventListener("submit", (e) => {
    e.preventDefault();
    if (mail?.value === "")
        alert("El campo email está vacío");
    else if (password.value === "")
        alert("El campo password está vacío");
    else
        login(mail.value, password.value);
});
checkTokenValidation();
renderAppDate();
