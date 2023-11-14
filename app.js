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


// ===>> Creamos Endpoint para llamar eventos de nuestra DB
// ===>> ENDPOINT PARA INDEX

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



// Creamos Endpoint para login --------------------------------------------------------------------------------------------------------

// Ejemplo como sale la URL en Query String: http://localhost:8000/login?email=luis@email.com&password=1234

app.get('/login', function(request, response) {
    const email = request.query.email;
    const password = request.query.password;
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
// Termina ENDPOINT LOGIN <<===-------------------------------------------------------

// Creamos ENDPOINT REGISTRO ----------------------------------------------------===>>

// **************************** INICIO CODIGO CORREGIDO ***************************
app.post('/registro', function (request, response) {
    let nombre = request.body.nombre;
    let apellidos = request.body.apellidos;
    let usuario = request.body.usuariosId;
    let cliente = request.body.clientesId;
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

            let usuarioId = result[0].id;
            console.log(result[0]);

            // Enlazar empleados_clientes con usuarioId
            connection.query(`INSERT INTO empleados_clientes (nombre, apellidos, usuarioId, clienteId, telefono, dni) 
                              VALUES (?, ?, ?, ?, ?, ?)`, [nombre, apellidos, usuarioId, cliente, telefono, dni], function (error, result, fields) {
                if (error) {
                    console.error("Error al insertar empleado_cliente:", error);
                    response.status(500).send({ message: "Error al registrar empleado_cliente" });
                    return;
                }

                response.status(200).send({ message: "Registro exitoso" }); // El código 200 indica que ha funcionado todo ok
            });
        });
    });
});

// ********************* TERMINA CODIGO CORREGIDO *******************************


// Termina ENDPOINT REGISTRO <<===---------------------------------------------------

// ******* ==========>>>>> CIERRE ENDPOINT PARA LISTAR CLIENTES
app.get("/clientes", function(request, response){
    connection.query(`SELECT * FROM clientes`, function(error, result, fields){
        handleSQLError(response, error, result, function(result){
            let clientes = [];

            for (let i=0; i < result.length; i++ ) {
                clientes[i] = result[i];
            }
            response.send(clientes);
        })
    })
})

// ******* ==========>>>>> CIERRE ENDPOINT PARA LISTAR CLIENTES

// ******* ==========>>>>> APERTURA ENDPOINT PARA MODIFICAR DATOS CLIENTES
                    // ***** RECUERDA QUE CON APP.POST DEBES CAMBIAR EN THUNDER EL TIPO DE BUSQUEDA Y PONER POST
app.post("/clientes/:id", function(request, response){
    let razonSocial = request.body.Razon_Social;
    let cif = request.body.cif;
    let sector =  request.body.Sector;
    let telefono = request.body.telefono;
    let empleados = request.body.Numero_empleados;
    let clienteId = request.params.id;

    connection.query(`UPDATE clientes SET Razon_Social = "${razonSocial}", CIF = "${cif}", Sector = "${sector}", telefono = "${telefono}", Numero_empleados = "${empleados}" 
    WHERE id = ${clienteId}`,  function(error, result, fields){
        if (error) {
            console.error("Error al modificar cliente:", error);
            response.status(500).send({ message: "Error al modificar" });
            return;
        }

        response.status(200).send({ message: "Cliente actualizado" }); // El código 200 indica que ha funcionado todo ok

        console.log("Usuario actualizado correctamente!!!!!");
    })
})
// ******* ==========>>>>> CIERRE ENDPOINT PARA MODIFICAR CLIENTES

// ******* ============>>>>>>>>>>>>> INSERTAR NUEVOS CLIENTES
app.post('/clientes', function (request, response) {
    let nombre = request.body.nombre;
    let apellidos = request.body.apellidos;
    let usuario = request.body.usuariosId;
    let cliente = request.body.clientesId;
    let telefono = request.body.telefono;
    let dni = request.body.dni;
    let email = request.body.email;
    let password = request.body.password;

    // Insertar usuario ///******* ESTOY JAY QUE MODIFICARLO */
    connection.query(`INSERT INTO clientes (email, password) VALUES (?, ?)`, [email, password], function (error, result, fields) {
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

            let usuarioId = result[0].id;
            console.log(result[0]);

            // Enlazar empleados_clientes con usuarioId
            connection.query(`INSERT INTO empleados_clientes (nombre, apellidos, usuarioId, clienteId, telefono, dni) 
                              VALUES (?, ?, ?, ?, ?, ?)`, [nombre, apellidos, usuarioId, cliente, telefono, dni], function (error, result, fields) {
                if (error) {
                    console.error("Error al insertar empleado_cliente:", error);
                    response.status(500).send({ message: "Error al registrar empleado_cliente" });
                    return;
                }

                response.status(200).send({ message: "Registro exitoso" }); // El código 200 indica que ha funcionado todo ok
            });
        });
    });
});   //    AQUI TERMINA EL CODIGO QUE HAY QUE MODIFICAR

// app.get("/clientes", function(request, response){
//     console.log("Insertar clientes")
// })

// Obtiene datos clientes con el id en :id
// app.get("/clientes/:id", function(request, response){
//     console.log("Obtiene datos clientes con el id en :id")
// })

// Termina ENDPOINT REGISTRO <<===---------------------------------------------------

// INICIA LA FUNCION PARA ARRANCAR MYSQL ===>>
app.listen(8000, function() {       // Indicamos en qué puerto lo hemos creados
    console.log('server up and running!!!')
});

// Listado de clientes. Con query.
// Formulario editar
// Formulario crear