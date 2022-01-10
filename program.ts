import startUp from "./startUp";

// se houver o arquivo env ele pega de lá
let port = process.env.PORT || '3050'

//setando a porta que vai ouvir
startUp.app.listen(port, function() {
    console.log(`Servido executando na porta ${port}`);
})