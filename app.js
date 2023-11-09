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
            let total = express.request.query.total;
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

app.post('/registro', function(request, response) {
    let nombre = request.body.nombre;
    let apellidos = request.body.apellidos;
    let email = request.body.email;
    let password = request.body.password;
    let id = request.body.id;


    console.log(request.body);
    // Insert into usuarios
        connection.query(`insert into usuarios (email, password) value ("${email}", "${password}")`, function(error, result, fields){
            handleSQLError(response, error, result, function(result){
            if (result.length == 0) {
            response.send({});
           } else {
            response.send('Usuario creado correctamente!');
           }  
            });
       
    });
    // Insert into empleados_clientes

})

// Creamos ENDPOINT REGISTRO ----------------------------------------------------===>>


// Termina ENDPOINT REGISTRO <<===---------------------------------------------------

// Termina ENDPOINT REGISTRO <<===---------------------------------------------------

// INICIA LA FUNCION PARA ARRANCAR MYSQL ===>>
app.listen(8000, function() {       // Indicam en qué puerto lo hemos creados
    console.log('server up and running!!!')
});