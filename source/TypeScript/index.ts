// @filename: index.ts

import { login } from "./Shared/Functions/Login.js"
import { renderAppDate } from "./Views/ApplicationUI/ApplicationDateAndTime.js"
import { UIControl } from "./Shared/Libs/lib.types.g.js"
import { connect } from "./Backend/ConnectionParams.js"

login.render()
const loginForm = document.getElementById("login-form")
const userEmail: UIControl = document.getElementById("user-email")
const userPassword: UIControl = document.getElementById("user-password")

loginForm?.addEventListener("submit", (e: SubmitEvent): void => {
    e.preventDefault()

    if (userEmail?.value === "") alert("El campo 'correo' no puede estar vacío")
    else if (userPassword === "")
        alert("El campo 'Contraseña' no puede estar vacío")
    else connect(userEmail.value, userPassword.value)
})

login.checkToken()
renderAppDate()

// theme
const content = document.getElementsByTagName("body")
let savedTheme = localStorage.getItem("user_theme")
content[0].classList.add(`${savedTheme}`)
