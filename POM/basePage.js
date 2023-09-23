var webdriver = require('selenium-webdriver');
const { By, until } = require('selenium-webdriver');

class BasePage {

    get_driver(browser) {
        return global.driver = new webdriver.Builder().forBrowser(browser).build();
    }

    setTimeout() {
        driver.manage().setTimeouts({ implicit: (5000) });
    }

    go_to_url(theURL) {
        driver.get(theURL);
    };

    enterTextByCss(css, searchText) {
        driver.findElement(By.css(css)).sendKeys(searchText);
    };

    enterTextById(id, searchText) {
        driver.findElement(By.id(id)).sendKeys(searchText);
    };

    getElementById(id) {
        return driver.findElement(By.id(id));
    };

    getTextById(id) {
        return driver.findElement(By.id(id)).getText();
    };

    getTextByXpath(xpath) {
        return driver.findElement(By.xpath(xpath)).getText();
    };

    getTextByCss(css) {
        return driver.findElement(By.css(css)).getText();
    };

    getTextByTagName(tagName) {
        return driver.findElement(By.name(tagName)).getText();
    };

    clickById(id) {
        driver.findElement(By.id(id)).click();
    };

    clickByXpath(xpath) {
        driver.findElement(By.xpath(xpath)).click();
    };

    clickByCss(css) {
        driver.findElement(By.css(css)).click();
    };

    sleep(seconds) {
        return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
    };

    maximize_window() {
        driver.manage().window().maximize();
    };

    quite_driver() {
        driver.quit();
    };

    waitElementIsEnabled(element) {
        driver.wait(until.elementIsEnabled(element), 10000);
    };

    waitElementIsDisabled(element) {
        driver.wait(until.elementIsDisabled(element), 10000);
    };

    waitElementIsVisible(element) {
        driver.wait(until.elementIsVisible(element), 10000);
    }
};
module.exports = BasePage;