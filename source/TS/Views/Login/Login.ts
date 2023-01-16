// @filename: Login
import { UI } from '../../lib.dom.js';
import { checkTokenValidation } from './TokenValidator.js';

/**
 * @function login
 */

export function login<T>(mail: T, password: T) {
    generateToken();

    async function generateToken() {
        const url: string = 'https://backend.netliinks.com:443/oauth/token';

        const requestOptions = {
            method: 'POST',
            body: `grant_type=password&username=${mail}&password=${password}`,
            headers: {
                Accept: 'application/json',
                'User-agent': `${UI.UserAgent}`,
                Authorization:
                    'Basic YzNjMDM1MzQ2MjoyZmM5ZjFiZTVkN2IwZDE4ZjI1YmU2NDJiM2FmMWU1Yg==',
                'Content-Type': 'application/x-www-form-urlencoded',
                Cookie: 'JSESSIONID=CDD208A868EAABD1F523BB6F3C8946AF',
            },
        };

        fetch(url, requestOptions)
            .then((response: Response) => response.json())
            .then((data) => {
                const login = UI.Login?.login;
                localStorage.setItem('accessToken', data.access_token);

                if (data.error === 'invalid_grant')
                    alert('Credenciales incorrectas');
                else
                    (login.style.display = 'none'),
                        checkTokenValidation(),
                        window.location.reload();
            })
            .catch((error) => console.error('Error: ' + error));
    }
}
