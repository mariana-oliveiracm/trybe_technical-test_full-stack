exports.validatePassword = (password) => {
    return password.length == 6 && !isNaN(password);
}

exports.validateEmail = (email) => {
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
}

exports.validateCurrency = (currency) => {
    const validCurrencies = ["BRL", "EUR", "CAD"];
    return validCurrencies.includes(currency);
}

exports.validateValue = (value) => {
    return value > 0 && Number.isInteger(value);
}

exports.validateAuthorization = (authorization) => {
    return authorization.split("Bearer ")[1].length == 16
}