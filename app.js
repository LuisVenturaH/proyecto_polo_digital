const express = require("express"); // Indicamos cual es el paquete que usará, en este caso el express
const mysql = require("mysql2");    // Esto es para acceder a la carpeta de mysql y sus funciones
const app = express();

app.use(express.static('public')); // Indicamos que usará archivos públicos, estáticos
app.use(express.json());

// Crear conexión MySQL
const connection = mysql.createConnection({ // Esyto conecta la base de datos que tengamos creada en mysql
    host: "localhost",  // Host local asignado
    user: "root",   // usuario es root
    password: "Lv++2023+",  // Contraseña dada
    database: "polo_digital" // Se Conecta a la base de datos que le asignemos. 
});

// Conectar con MySQL
connection.connect(function(error) {
    if (error) { 
    return console.error(`error: ${error.message}`)
}
    console.log("Conectado a MySQL");
});

/* === >>> FUNCIONES UTILES */
function handleSQLError(response, error, result, callback) {
    if (error) {
        response.static(400).send(`error ${error.messa}`);
        return;
    }
    callback(result);
}

/* <TERMINA FUNCIONES UTILIES <==== */


// **************************** APERTURA ENDPOINT PARA INDEX ***************************

app.get(`/carrusel`, function(request, response) {
    connection.query("select * from eventos", function(error, result, fields){
        handleSQLError(response, error, result, function(result){
            let total = request.query.total;
            let eventos = [];

            for (let i=0; i < total; i++ ) {
                eventos[i] = result[i];
            }
            response.send(eventos);
        })
    })
})

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
    const modoNuevo = `select * from usuarios where email = "${email}" and password = "${password}"`;

    console.log(modoNuevo);

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
// <<===== --------------------  TERMINA Endpoint para LOGIN ----------------------===>>>>>



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
                console.log(result[i].id)
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

app.put("/modificar_cliente/:idclientes", function(request, response){
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


// <<===== --------------------  TERMINA FUNCION ARRANQUE MYSQL ----------------------===>>>>>
app.listen(8000, function() {       // Indicamos en qué puerto lo hemos creados
    console.log('server up and running!!!')
});
