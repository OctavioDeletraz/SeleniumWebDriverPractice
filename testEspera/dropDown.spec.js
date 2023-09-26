const dropDown = require("../POM/dropDown");
const chai = require("chai");
const { By, Select, until, Key } = require('selenium-webdriver');
const assert = chai.assert;


describe("Testeo de dropdown con un select menu", () => {

    beforeEach(async () => {
        await dropDown.get_driver("chrome");
        await dropDown.maximize_window();
        await dropDown.go_to_url("https://demoqa.com/select-menu")
    });

    afterEach(async () => {
        await global.driver.quit();
    });

    const selectors = {
        selectValueId: 'withOptGroup',
        //     selectValueMenuCss: '.css-2613qy-menu',
        //Este no sirve porque no lo encuentra, es el menu original. Pero desaparece cada vez que se intenta interactuar con el
        selectValueMenuCss: `#withOptGroup > :nth-child(3)`,
        selectValuSelectedCss: 'div.css-1uccc91-singleValue',

        selectOneId: 'selectOne',
        selectOneMenuCss: `#selectOne > :nth-child(3)`,
        selectOneSelectedCss: 'div.css-1uccc91-singleValue',

        oldStyleId: 'oldSelectMenu',

        multiSelectCss: '#selectMenuContainer > div:nth-child(7) > div > div',
        multiSelectMenuCss: '#selectMenuContainer > div:nth-child(7) > div >div > div:nth-child(3)',

        multiSelectSpanCss: '#selectMenuContainer .css-12jo7m5'

    }

    it("Abro oldStyle select y elijo alguna categoria, valido su texto", async () => {

        // Localizar el elemento del dropdown por su ID
        const dropdown = await global.driver.findElement(By.id(selectors.oldStyleId));

        // Crear un objeto Select a partir del elemento del dropdown
        const select = new Select(dropdown);

        // Selección de opciones en el dropdown

        // 1. Seleccionar una opción por índice (por ejemplo, la segunda opción)
        await select.selectByIndex(2);

        // 2. Seleccionar una opción por valor (si las opciones tienen valores únicos)
        //    await select.selectByValue('opcion2Valor');

        // 3. Seleccionar una opción por texto visible (etiqueta de opción)
        //     await select.selectByVisibleText('Opción 3');

        // Obtener la opción seleccionada (esto es opcional)
        const selectedOption = await select.getFirstSelectedOption();

        assert.equal(await selectedOption.getText(), "Green")
    })

    it("Abro el selectValueId y elijo una opcion, valído esa opción", async () => {

        //Localizar elemento del dropdown por su ID
        const dropDown = await global.driver.findElement(By.id(selectors.selectValueId));
        await dropDown.click();

        //Localizar el menú del dropdown con los elementos, este se activa unicamente al clickear el dropdown
        const dropedMenu = await global.driver.wait(until.elementLocated(By.css(selectors.selectValueMenuCss)), 2000); // Espera hasta 10 segundos

        //Selecciono un elemento de la lista, en este caso lo busco por texto contenido
        let textoDeseado = "Group 2, option 2"
        const selectedOption = dropedMenu.findElement(By.xpath(`//div[text()='${textoDeseado}']`))
        await selectedOption.click();

        //Localizo el span y evaluo que el seleccionado sea igual al esperado.
        const span = await global.driver.findElement(By.css(selectors.selectValuSelectedCss));
        assert.equal(await span.getText(), textoDeseado);
    })

    it("Abro el selectOne y elijo una opcion, valído esa opción", async () => {

        //Localizar elemento del dropdown por su ID
        const dropDown = await global.driver.findElement(By.id(selectors.selectOneId));
        await dropDown.click();

        //Localizar el menú del dropdown con los elementos, este se activa unicamente al clickear el dropdown
        const dropedMenu = await global.driver.wait(until.elementLocated(By.css(selectors.selectOneMenuCss)), 2000); // Espera hasta 10 segundos

        //Selecciono un elemento de la lista, en este caso lo busco por texto contenido
        let textoDeseado = "Ms."
        const selectedOption = dropedMenu.findElement(By.xpath(`//div[text()='${textoDeseado}']`))
        await selectedOption.click();

        //Localizo el span y evaluo que el seleccionado sea igual al esperado.
        const span = await global.driver.findElement(By.css(selectors.selectOneSelectedCss));
        assert.equal(await span.getText(), textoDeseado);
    })

    it("Abro el multiSelector, elijo las primeras 3 opciones y valído la salida(que contenga los 3)", async () => {

        const colores = ["Blue", "Black", "Red", "Green"];
        const coloresSeleccionados = [];

        //Localizar elemento del dropdown por su ID
        const dropDown = await global.driver.findElement(By.css(selectors.multiSelectCss));
        await dropDown.click();

        //Localizar el menú del dropdown con los elementos, este se activa unicamente al clickear el dropdown
        const dropedMenu = await global.driver.wait(until.elementLocated(By.css(selectors.multiSelectMenuCss)), 2000); // Espera hasta 10 segundos

        for (const color of colores) {


            //Selecciono un elemento de la lista, en este caso lo busco por texto contenido
            const selectedOption = dropedMenu.findElement(By.xpath(`//div[text()='${color}']`))
            await selectedOption.click();
        }

        //Localizo el span y evaluo que el seleccionado sea igual al esperado.
        const span = await global.driver.findElements(By.css(selectors.multiSelectSpanCss));

        for (const promise of span) {
            color = await promise.getText();
            coloresSeleccionados.push(color);
        }

        for (let index = 0; index < colores.length; index++) {
            assert.equal(coloresSeleccionados[index], colores[index]);
        }
    })
});