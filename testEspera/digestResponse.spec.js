const chai = require("chai");
const digestAuth = require('../POM/digestAuto');
const { By, until } = require('selenium-webdriver');
const assert = chai.assert;

describe("autenticacion digest", () => {

    beforeEach(async () => {
        await digestAuth.get_driver("chrome");
        await digestAuth.maximize_window();
    });

    afterEach(async () => {
        //await driver.quit();
    });

    const form = {
        usuario: 'admin',
        pass: 'admin'
    }

    it("Se intenta el caso de exito con los datos correctos para login", async () => {
        //Se autentifica con los datos correcto
        await digestAuth.autenticacionDigest(form.usuario, form.pass);

        //Se valida el mensaje de exito
        let textoExito = await global.driver.findElement(By.css("#content p")).getText();
        assert.equal(textoExito, "Congratulations! You must have the proper credentials.")
    })

    it("Se intenta ingresar con datos incorrectos", async () => {
        //Se autentifica con los datos correcto
        await digestAuth.autenticacionDigest("Uruario Incorrecto", "passwordIncorrecto");

        //Aca no se que validar

        /*         let textoExito = await global.driver.findElement(By.css("#content p")).getText();
                assert.equal(textoExito, "Congratulations! You must have the proper credentials.") */
    })
})

