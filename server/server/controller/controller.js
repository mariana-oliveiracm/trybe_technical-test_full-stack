const { validatePassword, validateEmail, validateCurrency, validateValue, validateAuthorization} = require("./validation.js");
const { getToken, getCurrentBTCPrice, getCustomRatesResponse, alterCurrencyFile } = require("./requests.js");

exports.postLogin = (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const validPassword = validatePassword(password);
        const validEmail = validateEmail(email);

        if (!validPassword || !validEmail ){
            throw new Error("Campos inválidos");
        } else {
            const token = getToken();
            res.json({"token" : token});
        }
    } catch (error) {
        res.status(400).send(error.message);
    }    
};

exports.getCrytoBtc = (req, res) => {
    try {
        (async () => {
            const currentPrice = await getCurrentBTCPrice();
            getCustomRatesResponse(currentPrice, res);
        })();
    } catch (error) {
        res.send(error);
    }
};

exports.postCrytoBtc = (req, res) => {
    try {
        const currency = req.body.currency;
        const value = req.body.value;
        const authorization = req.headers.authorization;
        const validCurrency = validateCurrency(currency);
        const validValue = validateValue(value);
        const validAuthorization = validateAuthorization(authorization)

        if (!currency || !validCurrency) {
            res.status(400).send("Moeda inválida");
        } else if (!validValue) {
            res.status(400).send("Valor inválido");
        } else if(!validAuthorization) {
            res.status(401).send("Token inválido");
        } else {
            alterCurrencyFile(currency, value, res);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

