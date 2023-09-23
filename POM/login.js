var BasePage = require('./basePage.js');


class login extends BasePage {

    ingresoUsuario(selectorsForm, userForm) {
        this.enterTextById(selectorsForm.inputUserId, userForm.user);
        this.enterTextById(selectorsForm.inputPassId, userForm.pass);
        this.clickByCss(selectorsForm.submitCss);
    }

}
module.exports = new login();