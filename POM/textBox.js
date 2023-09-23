const { By } = require('selenium-webdriver');
var BasePage = require('../POM/basePage.js');

class textBoxForm extends BasePage {

    enter_form(form, formSelectors) {
        //Se ingresan lo campos de a uno
        this.enterTextByCss(`#${formSelectors.userFormId} #${formSelectors.nameId}`, form.fullName);
        this.enterTextByCss(`#${formSelectors.userFormId} #${formSelectors.emailId}`, form.email);
        this.enterTextByCss(`#${formSelectors.userFormId} #${formSelectors.currentAddressId}`, form.currentAddress);
        this.enterTextByCss(`#${formSelectors.userFormId} #${formSelectors.permanentAddressId}`, form.permanentAddress);
        //Se clickea
        this.clickById(formSelectors.submitButtonId);
    }

    async obtenerArrayOutput() {

        const outputDiv = await global.driver.findElement(By.id('output'));
        const paragraphs = await outputDiv.findElements(By.css('p'));
        const textArray = [];

        for (let i = 0; i < paragraphs.length; i++) {
            const text = await paragraphs[i].getText();
            textArray.push(text);
        }

        return textArray;
    }

}
module.exports = new textBoxForm();