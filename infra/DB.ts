import * as mongoose from 'mongoose'

class DB {
    // Ideia - Talves posso no construtor pegar dados das variáveis de ambiente ou dados da rede para melhor
    // configurar o DB_URL
    
    // Para isso funcionar faltava container_name: link_db no docker-compose.yml
    private DB_URL = "mongodb://link_db:27017/db_minisense"

    // isso é POG, tenho que arrumar uma forma de encontrar o IP do BD
    // por meio de código, uma vez que, por meio da forma 'mongodb://link-db/db_api_ts' não funciona
    // este abaixo é apenas o padrão de comportamento que percebi do Docker na geração de IPs, mas nada garantido
    //private DB_URL = "mongodb://172.18.0.2:27017/db_api_ts"

    createConnection() {
        console.log(this.DB_URL)
        //mongoose.createConnection(this.DB_URL) // esse não funciona, estudar a diferença
        mongoose.connect(this.DB_URL).catch(error => console.log("DB.ts - createConnection() -" + error))



    }
}

export default DB;