var BasePage = require('../POM/basePage');

class digestAuth extends BasePage {


    async autenticacionDigest(usuario, contraseña) {
        let url = `https://${usuario}:${contraseña}@the-internet.herokuapp.com/digest_auth`
        this.go_to_url(url);
    }
}
module.exports = new digestAuth();