const windows = require('../POM/navigatingWindows');
const { By, Key } = require('selenium-webdriver');
const { assert } = require('chai');

describe("Navegación dentro de pestañas", () => {

    beforeEach(async () => {
        await windows.get_driver("chrome");
        await windows.go_to_url("https://demoqa.com/browser-windows")
        await windows.maximize_window();
    });

    afterEach(async () => {
        await driver.quit();
    });

    const selectors = {
        newTabButtonId: 'tabButton',
        headingId: 'sampleHeading',
        newWindowButtonId: 'windowButton',
        newWindowMessageButtonId: 'messageWindowButton'
    }

    it("Se abren dos pestañas y se navega a la primera abierta, se valida su URL", async () => {

        // Abrir una nueva pestaña (esto puede variar según el navegador)
        const button = await global.driver.findElement(By.id(selectors.newTabButtonId));
        //const button = await global.driver.wait(until.elementLocated(By.css(selectors.newTabButtonId)), 2000);
        await button.click();
        await button.click();


        // Cambiar al contexto de la nueva pestaña
        const ventanas = await driver.getAllWindowHandles();
        await driver.switchTo().window(ventanas[1]); // Cambiar a la segunda pestaña

        // Navegar en la segunda pestaña
        const header = await global.driver.findElement(By.id(selectors.headingId));
        // Realizar acciones en la segunda pestaña (puede ser cualquier interacción)
        assert.equal(await header.getText(), "This is a sample page")

        // Cambiar de nuevo al contexto de la primera pestaña
        await driver.switchTo().window(ventanas[2]); // Cambiar a la primera pestaña

        // Realizar acciones en la primera pestaña (puede ser cualquier interacción)

        // Cerrar la segunda pestaña (esto también puede variar según el navegador)
        await global.driver.close();
        await driver.switchTo().window(ventanas[1]);
        await global.driver.close();
    })

    it("Se abren dos ventanas y se navega a la primera abierta, se valida su URL", async () => {

        // Abrir una nueva pestaña (esto puede variar según el navegador)
        const button = await global.driver.findElement(By.id(selectors.newWindowButtonId));
        await button.click();
        await button.click();


        // Cambiar al contexto de la nueva pestaña
        const ventanas = await driver.getAllWindowHandles();
        await driver.switchTo().window(ventanas[1]); // Cambiar a la segunda pestaña

        // Realiza acciones en la segunda ventana
        await driver.get('https://www.example2.com');
        await windows.maximize_window();
        let input = await global.driver.findElement(By.css('#searchform > input'));
        await input.sendKeys("100", Key.RETURN);
    })

    it("Se ventana emergente con mensaje", async () => {

        // Abrir una nueva pestaña (esto puede variar según el navegador)
        const button = await global.driver.findElement(By.id(selectors.newWindowMessageButtonId));
        await button.click();
        await button.click();


        // Cambiar al contexto de la nueva pestaña
        const ventanas = await driver.getAllWindowHandles();

        assert.lengthOf(ventanas, 2, "Se esperaban 2 ventanas ya que es lo maximo que permite abrir a la vez")

        await driver.switchTo().window(ventanas[1]); // Cambiar a la segunda pestaña
    })
})