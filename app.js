const host = "http://localhost:8000";
const {MongoClient,} = require("mongodb");
const express = require("express");
const app = express();
const mongoUrl = "mongodb://127.0.0.1:27017";
const mongoClient = new MongoClient(mongoUrl);
let mongoDB;


// **************************** APERTURA ENDPOINT PARA INDEX ***************************

// ENDPOINT CARRUSEL
app.get(`/carrusel`, async function(request, response) {
    try{
        const total = request.query.total;
        const collection = mongoDB.collection("eventos");
        const result = await collection.find().toArray();
        let eventos = [];

        for (let i = 0; i < total; i++){
            eventos[i] = result[i];
        }
        console.log(eventos[i])
        response.send(eventos);
    }
    catch (error){
        response.status(400).send(`error: ${error.message}`);
    }
})

// ============>>>>>>>>>>>>><< ESTA ES UNA VERSION CHATGPT
// app.get('/carrusel', async function(request, response) {
//     try {
//         const total = parseInt(request.query.total, 10); // Asegúrate de convertir 'total' a un número entero
//         const collection = mongoDB.collection('eventos');
//         const result = await collection.find().toArray();

//         if (isNaN(total) || total < 1) {
//             response.status(400).send('La cantidad total debe ser un número entero positivo.');
//             return;
//         }

//         if (total > result.length) {
//             response.status(400).send('La cantidad total solicitada supera el número de eventos disponibles.');
//             return;
//         }

//         let eventos = [];

//         for (let i = 0; i < total; i++) {
//             eventos[i] = result[i];
//         }

//         console.log(eventos); // Cambiado el lugar del console.log para que se ejecute dentro del bucle
//         response.send(eventos);
//     } catch (error) {
//         response.status(500).send(`Error: ${error.message}`);
//     }
// });
// ============>>>>>>>>>>>>> TERMINA LA VERSION CHATGPT



app.get('/eventos/:idEvento', function(request, response) {
    const idEvento = request.params.idEvento;

    connection.query(`select * from eventos where id = "${idEvento}"`, function(error, result, fields) {
      handleSQLError(response, error, result, function(result){
        if (result.length == 0) {
        response.send({});
       } else {
        response.send(result[0]);
     
       } 
      })
    });
});

// <<===== --------------------  TERMINA Endpoint para INDEX ----------------------===>>>>>



// **************************** APERTURA ENDPOINT PARA LOGIN ***************************
app.post('/login', function(request, response) {
    const email = request.body.email;
    const password = request.body.password;

    connection.query(`select * from usuarios where email = "${email}" and password = "${password}"`, function(error, result, fields) {
    handleSQLError(response, error, result, function(result){

        if (result.length == 0) {
            response.send({message: "Email o password incorrecto"})
        }  
        else {
            response.send({message: "Login correcto"});
        }
    })
 }) 
})




// **************************** APERTURA ENDPOINT PARA REGISTRO ***************************
app.post('/registro', function (request, response) {
    let nombre = request.body.nombre;
    let apellidos = request.body.apellidos;
    let usuario_id = request.body.usuario_id;
    let cliente_id = request.body.cliente_id;
    let telefono = request.body.telefono;
    let dni = request.body.dni;
    let email = request.body.email;
    let password = request.body.password;

    // Insertar usuario
    connection.query(`INSERT INTO usuarios (email, password) VALUES (?, ?)`, [email, password], function (error, result, fields) {
        if (error) {
            console.error("Error al insertar usuario:", error);
            response.status(500).send({ message: "Error al registrar usuario" }); // status(500) es un error interno del servidor
            return;
        }

        console.log("Usuario insertado correctamente!!!!!");

    // Seleccionar usuario
        connection.query(`SELECT id FROM usuarios WHERE email = ?`, [email], function (error, result, fields) {
            if (error) {
                console.error("Error al seleccionar usuario:", error);
                response.status(500).send({ message: "Error al seleccionar usuario" });
                return;
            }
            usuario_id = result[0].id;
            console.log(result[0]);

    // Enlazar empleados_clientes con usuarioId
            connection.query(`INSERT INTO empleados_clientes (nombre, apellidos, usuario_id, cliente_id, telefono, dni) 
                              VALUES (?, ?, ?, ?, ?, ?)`, [nombre, apellidos, usuario_id, cliente_id, telefono, dni], function (error, result, fields) {
                if (error) {
                    console.error("Error al insertar empleados_clientes:", error);
                    response.status(500).send({ message: "Error al registrar empleados_clientes" });
                    return;
                }

                response.status(200).send({ message: "Registro exitoso" }); // El código 200 indica que ha funcionado todo ok
            });
        });
    });
});
// <<===== --------------------  TERMINA Endpoint para REGISTRO ----------------------===>>>>>




// **************************** APERTURA ENDPOINT PARA CLIENTES ***************************
// Crea listado de clientes
app.get("/clientes", function(request, response){
    connection.query(`SELECT * FROM clientes`, function(error, result, fields){
        handleSQLError(response, error, result, function(result){
            let clientes = [];

            for (let i=0; i < result.length; i++ ) {
                clientes[i] = result[i];
                console.log(result[i].id);
            }
            
            response.send(clientes);
        })
    })
})

app.get('/clientes/:idcliente', function(request, response){
    const  idcliente = request.params.idcliente;
    connection.query(`SELECT * FROM clientes WHERE id = "${idcliente}"`, function(error, result, fields){
        handleSQLError(response, error, result, function(result){
            if(result.length == 0){
                response.send({});
            } else {    
                response.send(result[0]);
            }
        })
    })
} )



// Modificar datos del cliente (usamos PUT en vez de GET) 
app.get('/cliente/:idcliente', function(request, response){
    const  idcliente = request.params.idcliente;
    connection.query(`SELECT * FROM clientes WHERE id = "${idcliente}"`, function(error, result, fields){
        handleSQLError(response, error, result, function(result){
            if(result.length == 0){
                response.send({});
            } else {    
                response.send(result[0]);
            }
        })
    })
} )

// ENDPOINT para modificar cliente
app.put("/modificar_cliente", function(request, response){
    const idClientes = request.params.id;
    const razon_social = request.body.razon_social;
    const cif = request.body.cif;
    const sector =  request.body.sector;
    const telefono = request.body.telefono;
    const empleados = request.body.numero_empleados;
   
    connection.query(`(UPDATE clientes SET (id, razon_social, cif, sector, telefono, numero_empleados)
    WHERE (?, ?, ?, ?, ?, ?)` [idClientes, razon_social, cif, sector, telefono, empleados], function(error, result, fields){
        if (error) {
            console.error("Error al modificar cliente:", error);
            response.status(500).send({ message: "Error al modificar cliente" });
            return;
        }

        response.status(200).send({ message: "Cliente actualizado" });

        console.log("Cliente actualizado correctamente!!!!!");
    })
})


// Crear nuevos clientes
app.post('/clientes', function (request, response) {
    const razon_social = request.body.razon_social;
    const cif = request.body.cif;
    const sector = request.body.sector;
    const telefono = request.body.telefono;
    const numero_empleados = request.body.numero_empleados;
    
    connection.query(`INSERT INTO clientes (razon_social, cif, sector, telefono, numero_empleados) VALUES (?, ?, ?, ?, ?)`, 
    [razon_social, cif, sector, telefono, numero_empleados], function (error, result, fields) {
        if (error) {
            console.error("Error al insertar cliente", error);
            response.status(500).send({ message: "Error al registrar cliente" }); // status(500) es un error interno del servidor
            return;
        }

        console.log("cliente insertado");
        
    });
});   
// <<===== --------------------  TERMINA Endpoint para CLIENTES ----------------------===>>>>>

// <<===== --------------------  INICIA Endpoint para TODOS LOS EVENTOS ----------------------===>>>>>


app.get(`/todos_eventos`, function(request, response) {
    connection.query("SELECT * FROM eventos", function(error, result, fields){
        handleSQLError(response, error, result, function(result){
            // let total = request.query.total;
            let todos_eventos = [];

            for (let i=0; i < result.length; i++ ) {
                todos_eventos[i] = result[i];
            }
            response.send(todos_eventos);
        })
    })
})


// <<===== --------------------  TERMINA Endpoint para TODOS LOS EVENTOS ----------------------===>>>>>



// ******************* FUNCION MAIN ******************** \\
async function main(){
    try {
        // Conectar con MongoDB
        await mongoClient.connect();
        console.log("Conectado con MongoDB!!");

         // Aquí colocamos las funciones a ejecutar desde MongoDB
       
        mongoDatabase = mongoClient.db("polo_digital");

    }catch(error){
        console.error(error);
    } finally{
        await mongoClient.close();
    }
}

main();