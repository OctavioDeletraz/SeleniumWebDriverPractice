const contextMenu = require('../POM/contextMenu');
const { By } = require('selenium-webdriver');
const { assert } = require('chai');


describe("Validamos contextMenu", () => {

    beforeEach(async () => {
        await contextMenu.get_driver("chrome");
        await contextMenu.go_to_url("https://the-internet.herokuapp.com/context_menu")
        await contextMenu.maximize_window();
    });

    afterEach(async () => {
        await driver.quit();
    });

    const selectors = {
        sectionOfInterestId: 'hot-spot'
    }

    it("", async () => {
        const element = await driver.findElement(By.id(selectors.sectionOfInterestId));

        // Crea una instancia de ActionSequence
        const actions = driver.actions({ bridge: true });

        // Realiza un clic derecho en el elemento
        await actions.contextClick(element).perform();

        const alert = await driver.switchTo().alert();

        // Obtengo el texto de la alerta y valido que este correcto
        const alertText = await alert.getText();
        assert.equal(alertText, "You selected a context menu");
        await alert.accept();
    })

})