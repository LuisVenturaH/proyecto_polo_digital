const express = require('express');
const app = express();
const mysql = require("mysql2");

app.use(express.static('public'));
app.use(express.json());

// crear conexion a base de datos
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'releevant',
    database: 'polo_digital'
}); 

// conectarse al servidor de mysql local
connection.connect(function(error) {
    if (error) {
        return console.error(`error: ${error.message}`);
    }

    console.log("Conectado a MySQL!!!");
});

/**
 * Funciones utiles ------------------------------------------------------------------------------------
 */

function handleSQLError(response, error, result, callback) {
    if (error)  {
        response.status(400).send(`error: ${error.message}`);

        return;
    }

    callback(result);
}
/**
 * Termina Funciones Utiles ----------------------------------------------------------------------------
 */

/**
 * Endpoints para el Index. ----------------------------------------------------------------------------
 */
app.get('/carrusel', function(request, response) {
    connection.query("select * from usuarios", function(error, result, fields) {
        handleSQLError(response, error, result, function(result) {
            let total = request.query.total;
            let eventos = [];
    
            for (let i = 0; i < total; i++) {
                eventos[i] = result[i];
            }
        
            response.send(eventos);
        });
    });
});

app.get('/evento/:idEvento', function(request, response) {
    const idEvento = request.params.idEvento;

    connection.query(`select * from usuarios where id = ${idEvento}`, function(error, result, fields) {
        handleSQLError(response, error, result, function(result) {
            if (result.length == 0) {
                response.send({});
            } else {
                response.send(result[0]);
            }
        })
    });
});

/**
 * Termina Index---------------------------------------------------------------------------------------
 */

/**
 * Endpoints para login y registro ---------------------------------------------------------------------
 * Ejemplo URL: http://localhost:8000/login?email=isare@email.com&password=1234
 */
app.get("/login", function(request, response) {
    const email = request.query.email;
    const password = request.query.password;
    const modoNuevo = `select * from usuarios where email = '${email}' and password = '${password}'`;

    console.log(modoNuevo);

    connection.query("select * from usuarios where email = '" + email + "' and password = '" + password + "'", function(error, result, fields) {
        handleSQLError(response, error, result, function(result) {
            console.log(result);

            if (result.length == 0) {
                response.send({ message: "Email o password no validos" });
            } else {
                response.send({ message: "Usuario logueado"});
            }
        });
    });
});

app.post("/registro", function(request, response) {
    let nombre = request.body.nombre;
    let apellidos = request.body.apellidos;
    let email = request.body.email;

    console.log(request.body);

    // insert into emplados_clientes

    // insert into usuarios

    response.send({ message: "registro" });
});

// Termina Login y Registro ---------------------------------------------------------------------------


app.listen(8000, function() {
    console.log('Server up and running!!!');
});