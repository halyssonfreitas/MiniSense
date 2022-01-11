"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const startUp_1 = require("./startUp");
// se houver o arquivo env ele pega de lá
let port = process.env.PORT || '3050';
//setando a porta que vai ouvir
startUp_1.default.app.listen(port, function () {
    console.log(`Servido executando na porta ${port}`);
});
