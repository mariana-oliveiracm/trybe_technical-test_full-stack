const express = require("express");
const router = require("./routes/routes.js")

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());

app.get("/api", (req, res) => {
    res.json({ message: "Bem vindo(a) ao Crypto Index!" });
});

app.use('/api', router);

app.get("*", (req, res) => {
    res.status(404).json({ message: "Endpoint não encontrado" });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});