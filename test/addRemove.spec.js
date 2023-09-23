const chai = require("chai");
let addRemove = require('../POM/addRemove.js');
const { By, until, Key } = require('selenium-webdriver');
const assert = chai.assert;

describe("Test add/remove element", () => {

    let formSelectors = {
        buttonAddXpath: '//button[@onclick="addElement()"]',
        elementsId: 'elements',
        deleteButtonText: 'Delete',
        nClicks: 5
    }

    beforeEach(async () => {
        await addRemove.get_driver('chrome');
        await addRemove.go_to_url('https://the-internet.herokuapp.com/add_remove_elements/')
        await addRemove.maximize_window();
    });

    afterEach(async () => {
        await addRemove.quite_driver();
    });

    it(`Se evalua que al apretar el boton Add Element ${formSelectors.nClicks} veces, se añaden la misma cantidad de boton delete, y se valida su texto`, async () => {

        let buttonAdd = await driver.findElements(By.xpath(formSelectors.buttonAddXpath));
        await addRemove.waitElementIsEnabled(buttonAdd);

        let elementNull = await driver.findElements(By.css(`#${formSelectors.elementsId} > button`));

        //Verifico que el array este vacío al comienzo
        assert.isEmpty(elementNull);

        for (let index = 0; index < formSelectors.nClicks; index++) {
            await driver.findElement(By.xpath(formSelectors.buttonAddXpath)).click();
        }

        const buttons = await driver.findElements(By.css(`#${formSelectors.elementsId} > button`));

        let array = [];

        for (let i = 0; i < buttons.length; i++) {
            const buttonText = await buttons[i].getText();
            array.push(buttonText);
        }

        for (let i = 0; i < array.length; i++) {
            const element = array[i];
            assert.equal(element, formSelectors.deleteButtonText);
        }
    });

    it("Se valida que al apretar el boton AddElement se añada un Delete, y al apretar el Delete este mismo se borre", async () => {
        //Busco el boton agregar y lo presiono
        let buttonAdd = await driver.findElements(By.xpath(formSelectors.buttonAddXpath));
        await addRemove.waitElementIsEnabled(buttonAdd);
        await addRemove.clickByXpath(formSelectors.buttonAddXpath);


        //Busco el boton Delete que se deberia haber agregado
        const buttonDelete = await driver.findElements(By.css(`#${formSelectors.elementsId} > button`));
        //Verifico que exista el boton
        assert.exists(buttonDelete);

        //Extraigo el texto del boton y verifico que sea igual a lo esperado
        let buttonDeleteText = await addRemove.getTextByCss(`#${formSelectors.elementsId} > button`);
        assert.equal(buttonDeleteText, formSelectors.deleteButtonText);

        //Hago click sobre el boton Delete y verifico que deje de existir
        await addRemove.clickByCss(`#${formSelectors.elementsId} > button`);

        let elementNull = await addRemove.getTextByCss(`#${formSelectors.elementsId}`);
        assert.isEmpty(elementNull);
    });


})