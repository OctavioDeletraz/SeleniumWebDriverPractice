const { assert } = require("chai");
const login = require("../POM/login");
const { By, logging, driver } = require("selenium-webdriver");



describe("Se valida el login de un usuario", () => {

    let userForm = {
        user: "tomsmith",
        pass: "SuperSecretPassword!"
    };

    let selectorsForm = {
        inputUserId: 'username',
        inputPassId: 'password',
        submitCss: '#login > button',
        flashMessageId: 'flash-messages',
        logOutButtonCss: '#content > div > a'
    }

    let UrlForm = {
        loggIn: 'https://the-internet.herokuapp.com/secure',
        loggOut: 'https://the-internet.herokuapp.com/login'
    }

    let flashMessages = {
        loginPage: 'You logged out',
        alreadylogged: 'You logged into',
        invalidUser: 'Your username is invalid!',
        invalidPass: ''
    }
    let flash
    let Url

    beforeEach(async () => {
        await login.get_driver("chrome");
        await login.go_to_url("https://the-internet.herokuapp.com/login");
        await login.maximize_window();
    })

    afterEach(async () => {
        await login.quite_driver();
    })

    it("Se valida el login y logout exitosos", async () => {
        //Ingreso el formulario
        await login.ingresoUsuario(selectorsForm, userForm);

        //Obtengo la url y la valido que sea /secure
        flash = await global.driver.findElement(By.id(selectorsForm.flashMessageId));
        await login.waitElementIsVisible(flash);
        flash = await login.getTextById(selectorsForm.flashMessageId);
        assert.include(flash, flashMessages.alreadylogged);

        //Obtengo la url y la valido
        Url = await global.driver.getCurrentUrl();
        assert.equal(UrlForm.loggIn, Url);

        //Busco el boton logOut y valido que exista
        let buttonLogOut = await login.getTextByCss(selectorsForm.logOutButtonCss);
        assert.exists(buttonLogOut);


        //Valido el contenido
        assert.equal(buttonLogOut, "Logout");

        //Cliqueo el boton
        await login.clickByCss(selectorsForm.logOutButtonCss);

        //Valido el mensaje flash de logout exitoso
        flash = await global.driver.findElement(By.id(selectorsForm.flashMessageId));
        await login.waitElementIsVisible(flash);

        flash = await login.getTextById(selectorsForm.flashMessageId);
        assert.include(flash, flashMessages.loginPage);

        //Obtengo la url y la valido que sea /login
        Url = await global.driver.getCurrentUrl();
        assert.equal(UrlForm.loggOut, Url);
    })

    it("Username invalido", async () => {
        //cambio el password del usuario para el ingreso
        let userOriginal = userForm.user;
        userForm.user = "Pedro";
        await login.ingresoUsuario(selectorsForm, userForm);

        //Obtengo la url y la valido que sea /login
        Url = await global.driver.getCurrentUrl();
        assert.equal(UrlForm.loggOut, Url);

        //Obtengo el mensaje Flash de login y valido
        flash = await global.driver.findElement(By.id(selectorsForm.flashMessageId));
        await login.waitElementIsVisible(flash);
        flash = await login.getTextById(selectorsForm.flashMessageId);
        assert.include(flash, flashMessages.invalidUser);
        userForm.user = userOriginal;
    })

    it("Password invalido", async () => {
        //cambio el password del usuario para el ingreso
        let passOriginal = userForm.pass;
        userForm.pass = "123";
        await login.ingresoUsuario(selectorsForm, userForm);

        //Obtengo la url y la valido que sea /login
        Url = await global.driver.getCurrentUrl();
        assert.equal(UrlForm.loggOut, Url);

        //Obtengo el mensaje Flash de login y valido
        flash = await global.driver.findElement(By.id(selectorsForm.flashMessageId));
        await login.waitElementIsVisible(flash);
        flash = await login.getTextById(selectorsForm.flashMessageId);
        assert.include(flash, flashMessages.invalidPass);
        userForm.pass = passOriginal;
    })
})