const chai = require("chai");
const textBox = require('../POM/textBox');
const assert = chai.assert;

describe("Evaluacion form con textBox", () => {

    let form = {
        fullName: 'Octavio Lala',
        email: 'octavio@gmail.com',
        currentAddress: 'Carabobo 123',
        permanentAddress: 'Toledo',
        wrongEmail: 'octavio'
    };

    let formSelectors = {
        userFormId: 'userForm',
        nameId: 'userName',
        emailId: 'userEmail',
        currentAddressId: 'currentAddress',
        permanentAddressId: 'permanentAddress',
        submitButtonId: 'submit',
        formId: 'userForm'
    };

    beforeEach(async () => {
        await textBox.get_driver("chrome");
        await textBox.go_to_url("https://demoqa.com/text-box")
        await textBox.maximize_window();
    });

    afterEach(async () => {
        await driver.quit();
    });

    //Caso feliz
    it("Se ingresan los datos correctamente y se valida la salida", async () => {

        //Ingreso los datos al form
        await textBox.enter_form(form, formSelectors);

        //Obtengo los datos de salida
        let output = await textBox.obtenerArrayOutput();

        //Valido que exista el output
        assert.exists(output);

        //Valido los datos
        assert.include(output[0], form.fullName);
        assert.include(output[1], form.email);
        assert.include(output[2], form.currentAddress);
        assert.include(output[3], form.permanentAddress);
    })

    //Caso error
    it("No se ingresan los datos, se valida el error y que no suban los datos", async () => {
        //Hago click en el boton sin rellenar el formulario
        await textBox.clickById(formSelectors.submitButtonId);

        //Intento obtener el output
        let output = await textBox.obtenerArrayOutput();

        //valido que la variable este vacía
        assert.isEmpty(output);
    })

    //Caso error
    it("Se ingresa mal el email, se valida que no suban los datos", async () => {

        //Modifico momentaneamente la variable email
        let emailOriginal = form.email;
        form.email = 'octavio';

        //ingreso el form con la variable email editada para que de error
        await textBox.enter_form(form, formSelectors);

        //Obtengo el output
        let output = await textBox.obtenerArrayOutput();

        //valido que la variable de salida output esté vacía, ya que no se deberia hayar
        assert.isEmpty(output);
        form.email = emailOriginal;
    })
})