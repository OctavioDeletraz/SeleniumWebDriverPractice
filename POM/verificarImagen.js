const { Key, By } = require('selenium-webdriver');
var BasePage = require('../POM/basePage.js');
const axios = require('axios'); // Importa la biblioteca Axios para realizar solicitudes HTTP


class imagenes extends BasePage {

    async imagenesSinCargar() {

        const images = await global.driver.findElements(By.css('img'));
        const imagenesRotas = [];

        for (const image of images) {
            const isBroken = await global.driver.executeScript(
                'return arguments[0].naturalWidth === 0;', image
            );

            if (isBroken) {
                imagenesRotas.push(await image.getAttribute('src'));
            }
        }

        return imagenesRotas;
    }

    async imagenesNotFound() {

        const images = await global.driver.findElements(By.css('img'));
        const imagenesRotas = [];

        for (const image of images) {
            const url = await image.getAttribute('src');
            try {
                const response = await axios.head(url); // Realiza una solicitud HEAD para obtener el código de estado
            } catch (error) {
                // Maneja cualquier error de solicitud HTTP aquí, como conexiones fallidas, etc.
                imagenesRotas.push(url);
                console.error(`Error al verificar la imagen ${url}: ${error.message}`);
            }
        }

        return imagenesRotas;
    }
}
module.exports = new imagenes();