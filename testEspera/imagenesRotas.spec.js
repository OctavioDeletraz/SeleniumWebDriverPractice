const chai = require("chai");
const verificarImagen = require('../POM/verificarImagen');
const assert = chai.assert;

describe("Test para buscar imagenes rotas", () => {

    beforeEach(async () => {
        await verificarImagen.get_driver("chrome");
        await verificarImagen.go_to_url("https://the-internet.herokuapp.com/broken_images")
        await verificarImagen.maximize_window();
    });

    afterEach(async () => {
        await driver.quit();
    });

    it("Imagenes rotas", async () => {

        //Creo el array
        let imagenesSinCargar = [];
        let imagenes404 = [];

        //LLamo a la funcion para obtener si es que hay imagenes sin cargar
        imagenesSinCargar = await verificarImagen.imagenesSinCargar();
        imagenes404 = await verificarImagen.imagenesNotFound();

        if (imagenesSinCargar) {
            console.log(`Hay imagenes que no cargaron y son las siguientes: ${imagenesSinCargar}`)
        };

        if (imagenes404) {
            console.log(`Hay imagenes con enlaces rotos y son las siguientes: ${imagenes404}`)
        };

        //Dejo esta porque en este ejemplo necesito enlaces rotos y valido eso....
        assert.isNotEmpty(imagenesSinCargar);
        assert.isNotEmpty(imagenes404);

        //Aqui si funcionace bien
        /*  assert.isEmpty(imagenesSinCargar);
         assert.isEmpty(imagenes404); */
    })
})