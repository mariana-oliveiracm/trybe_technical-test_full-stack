const Strings = require("@supercharge/strings");
const fs = require("fs");
const axios = require("axios");

exports.getToken = () => {
    return Strings.random(16);
}

exports.getCurrentBTCPrice = async() =>{
    const response = await axios.get("https://api.coindesk.com/v1/bpi/currentprice/BTC.json");
    return response.data;
}

exports.getCustomRatesResponse = (currentPrice, res) =>{
    fs.readFile("./server/currencies.json", (error, data) => {
        if(error) throw error;
        let currencies = JSON.parse(data);
        let rateInUSD = currentPrice.bpi.USD.rate_float;

        let customRatesResponse = {
            "time" : currentPrice.time,
            "disclaimer": currentPrice.disclaimer,
            "bpi": {
                "USD": currentPrice.bpi.USD,
                "BRL": {
                "code": "BRL",
                "rate": getRateInCurrency(rateInUSD, currencies, "BRL"),
                "description": "Brazilian Real",
                "rate_float": getRateFloat(rateInUSD, currencies, "BRL"),
                },
                "EUR": {
                "code": "EUR",
                "rate": getRateInCurrency(rateInUSD, currencies, "EUR"),
                "description": "Euro",
                "rate_float": getRateFloat(rateInUSD, currencies, "EUR"),
                },
                "CAD": {
                "code": "CAD",
                "rate": getRateInCurrency(rateInUSD, currencies, "CAD"),
                "description": "Canadian Dollar",
                "rate_float": getRateFloat(rateInUSD, currencies, "CAD"),
                },
                "BTC": currentPrice.bpi.BTC
            },                    
        }
        res.send(customRatesResponse);
    });
}

const getRateInCurrency = (rateInUSD, currencies, currency) => {
    switch(currency){
        case "BRL":
            return new Intl.NumberFormat().format(rateInUSD * currencies.BRL)
        case "EUR":
            return new Intl.NumberFormat().format(rateInUSD * currencies.EUR)
        case "CAD":
            return new Intl.NumberFormat().format(rateInUSD * currencies.CAD)
    };
}

const getRateFloat = (rateInUSD, currencies, currency) => {
    switch(currency){
        case "BRL":
            return rateInUSD * currencies.BRL
        case "EUR":
            return rateInUSD * currencies.EUR
        case "CAD":
            return rateInUSD * currencies.CAD
    };
}

exports.alterCurrencyFile = (currency, value, res) => {
    let content = JSON.parse(fs.readFileSync('./server/currencies.json', 'utf8'));
    switch(currency){
        case "BRL":
            content.BRL = value.toString();
            break;
        case "EUR":
            content.EUR = value.toString();
            break;
        case "CAD":
            content.CAD = value.toString();
            break;
    };

    fs.writeFileSync('./server/currencies.json', JSON.stringify(content));
    res.send({ message: "Valor alterado com sucesso!" });
}