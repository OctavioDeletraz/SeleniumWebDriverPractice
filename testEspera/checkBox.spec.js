const chai = require("chai");
const checkBox = require('../POM/checkBox');
const { By } = require('selenium-webdriver');
const assert = chai.assert;

describe("Validamos CheckBox", () => {

    beforeEach(async () => {
        await checkBox.get_driver("chrome");
        await checkBox.go_to_url("https://the-internet.herokuapp.com/checkboxes")
        await checkBox.maximize_window();
    });

    afterEach(async () => {
        await driver.quit();
    });

    const selectors = {
        formId: 'checkboxes',
        checkBox1Xpath: '//*[@id="checkboxes"]/input[1]',
        checkBox2Xpath: '//*[@id="checkboxes"]/input[2]'
    }

    it("Valido los que se tilden los checkBox", async () => {

        const form = await global.driver.findElement(By.id(selectors.formId));

        // Encuentra todos los elementos <input> dentro del formulario
        const checkboxes = await form.findElements(By.css('input'));

        //Primero valido que al cargar la página este tildado el 2do y no el primero
        let isChecked1 = await checkboxes[0].isSelected();
        assert.isFalse(isChecked1, "Se espera False, que no este tildado");

        let isChecked2 = await checkboxes[1].isSelected();
        assert.isTrue(isChecked2, "Se espera True, que este tildado");

        //Valido que al clickear el primero este se tilde
        await checkboxes[0].click();
        isChecked1 = await checkboxes[0].isSelected();
        assert.isTrue(isChecked2, "Se espera True, que este tildado");


        //Valido que al clickear el segundo este se tilde
        await checkboxes[1].click();
        isChecked2 = await checkboxes[1].isSelected();
        assert.isFalse(isChecked2, "Se espera False, que no este tildado");

    })

})