//Deberia hacer validaciones en cuanto a navegación a URL de cada componente
var webdriver = require('selenium-webdriver');
const { By } = require('selenium-webdriver');
const { assert } = require('chai');


describe('Testeo correcta navegacion en la homePage para cada card', () => {

    let driver

    const cardsTitles = [
        { cardTitle: 'Elements', URL: "https://demoqa.com/elements" },
        { cardTitle: 'Forms', URL: "https://demoqa.com/forms" },
        { cardTitle: 'Alerts', URL: "https://demoqa.com/alertsWindows" },
        { cardTitle: 'Widgets', URL: "https://demoqa.com/widgets" },
        { cardTitle: 'Interaction', URL: "https://demoqa.com/interaction" },
        { cardTitle: 'Book', URL: "https://demoqa.com/books" }
    ];


    beforeEach(async () => {
        //Abro el navegador
        driver = await new webdriver.Builder().forBrowser('chrome').build();

        //maximizo la ventana
        await driver.manage().window().maximize();

        //Navego a la URL
        await driver.get("https://demoqa.com/");
    });

    afterEach(async () => {
        await driver.quit();
    });

    cardsTitles.forEach(card => {

        it(`Ingreso a la card ${card.cardTitle} y verifico su ruta ${card.URL}`, async () => {

            //Obtengo una referencia de donde hacer click dentro de la card
            let cardToClick = await driver.findElement(By.xpath(`//h5[contains(text(), '${card.cardTitle}')]`));

            //Cliqueo
            await cardToClick.click();

            //Obtengo URL de la pagina a la cual navego y verifico coincida con la proporcionada
            let urlNew = await driver.getCurrentUrl();
            assert.equal(urlNew, card.URL);
        })

    });
})