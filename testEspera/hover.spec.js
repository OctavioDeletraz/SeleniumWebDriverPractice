const chai = require("chai");
let hover = require('../POM/hover');
const { By, until } = require('selenium-webdriver');
const assert = chai.assert;

describe("Testeo de hover", () => {

    beforeEach(async () => {
        await hover.get_driver("chrome");
        await hover.go_to_url("https://demoqa.com/tool-tips")
        await hover.maximize_window();
    });

    afterEach(async () => {
        await driver.quit();
    });

    const selectors = {
        buttonId: 'toolTipButton',
        hoverButtonId: 'buttonToolTip',
        textFieldId: 'toolTipTextField',
        hoverTextFieldId: 'textFieldToolTip'
    }

    it("Pruebo del hover del button", async () => {

        // Localiza el elemento hover
        const elementoHover = await global.driver.findElement(By.id(selectors.buttonId));

        // Realiza una acción de hover sobre el elemento
        const actions = driver.actions({ bridge: true });
        await actions.move({ origin: elementoHover }).perform();

        // Espera a que aparezca el elemento de texto que deseas validar
        const elementoTexto = await driver.wait(
            until.elementLocated(By.id(selectors.hoverButtonId)),
            5000 // Tiempo máximo de espera en milisegundos
        );

        // Valida el texto obtenido con el esperado
        const textoActual = await elementoTexto.getText();
        const textoEsperado = "You hovered over the Button";
        assert.equal(textoActual, textoEsperado);
    })

    it("Pruebo del hover del button", async () => {

        // Localiza el elemento hover
        const elementoHover = await global.driver.findElement(By.id(selectors.textFieldId));

        // Realiza una acción de hover sobre el elemento
        const actions = driver.actions({ bridge: true });
        await actions.move({ origin: elementoHover }).perform();

        // Espera a que aparezca el elemento de texto que deseas validar
        const elementoTexto = await driver.wait(
            until.elementLocated(By.id(selectors.hoverTextFieldId)),
            5000 // Tiempo máximo de espera en milisegundos
        );

        // Valida el texto obtenido con el esperado
        const textoActual = await elementoTexto.getText();
        const textoEsperado = "You hovered over the text field";
        assert.equal(textoActual, textoEsperado);
    })

})