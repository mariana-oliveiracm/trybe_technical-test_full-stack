const { validatePassword, validateEmail, validateCurrency, validateValue, validateAuthorization } = require("../controller/validation.js")

test("Deve retornar true se a senha for 6 dígitos numéricos", () => {
    const senha = "123456";
    expect(validatePassword(senha)).toBe(true);
});

test("Deve retornar false se a senha tiver menos de 6 dígitos", () => {
    const senha = "12345";
    expect(validatePassword(senha)).toBe(false);
});

test("Deve retornar false se a senha tiver mais de 6 dígitos", () => {
    const senha = "1234567";
    expect(validatePassword(senha)).toBe(false);
});

test("Deve retornar false se a senha não for numérica", () => {
    const senha = "12345a";
    expect(validatePassword(senha)).toBe(false);
});


test("Deve retornar true para email válido", () => {
    const email = "mariana@gmail.com";
    expect(validateEmail(email)).toBe(true);
});

test("Deve retornar false para email inválido", () => {
    const email = "marianamail.com";
    expect(validateEmail(email)).toBe(false);
});


test("Deve retornar true para tipo de moeda válida", () => {
    const currency = "BRL"
    expect(validateCurrency(currency)).toBe(true);
});

test("Deve retornar false para tipo de moeda inválida", () => {
    const currency = "YEN"
    expect(validateCurrency(currency)).toBe(false);
});


test("Deve retornar true se o valor da moeda for inteiro", () => {
    const value = 1234
    expect(validateValue(value)).toBe(true);
});

test("Deve retornar false se o valor da moeda não for inteiro", () => {
    const value = 1234.5
    expect(validateValue(value)).toBe(false);
});

test("Deve retornar false se o valor da moeda não for numérico", () => {
    const value = "123a"
    expect(validateValue(value)).toBe(false);
});


test("Deve retornar true se o token no authorization for válido", () => {
    const authorizationHeader = "Bearer 123456asdqwe789r"
    expect(validateAuthorization(authorizationHeader)).toBe(true);
});

test("Deve retornar false se o token no authorization for válido", () => {
    const authorizationHeader = "Bearer 123456asdqwe789rr"
    expect(validateAuthorization(authorizationHeader)).toBe(false);
});

