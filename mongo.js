const { MongoClient } = require("mongodb");

const mongoUrl = "mongodb://127.0.0.1:27017";
const mongoClient = new MongoClient(mongoUrl); // Se agregó useUnifiedTopology: true para evitar advertencias de deprecación
let mongoDatabase;

// ******************* FUNCION MAIN ******************** \\
async function main() {
    try {
        // Conectar con MongoDB
        await mongoClient.connect();
        console.log("Conectado a MongoDB");

        // Realizar operaciones con MongoDB
        mongoDatabase = mongoClient.db("polo_digital");


    } catch (error) {
        console.error(error);
    } finally {
        // Cerrar conexiones
        await mongoClient.close(); 
    }
}

main();
