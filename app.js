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

// <<===== --------------------  INICIA Endpoint para INDEX ----------------------===>>>>>

app.get('/carrusel', function(request, response) { 
    connection.query('select * from eventos', function(error, result, fields) {
        if (error) {
            response.status(400).send(`error ${error.message}`);
            return;
        }

        let total = request.query.total;
        let eventos = [];

        for (let i = 0; i < total; i++) {
           eventos[i] = result[i];
        }
        response.send({eventos});
    });
});


// ===>> Creamos Endpoint para llamar eventos de nuestra DB
app.get('/eventos/:idEvento', function(request, response) {
    connection.query(`select * from eventos where id = "${request.params.idEvento}"`, function(error, result, fields) {
        if (error) {
            response.status(400).send(`error ${error.message}`);
            return;
        }


        console.log(request.params.idEvento);

        // let idEvento = request.params.idEvento;
       if (result.length == 0) {
        response.send({});
       } else {
        response.send(result[0]);
       }
        
    });
    
});
// Termina Endpoint para llamar eventos <<===

// <<===== --------------------  TERMINA Endpoint para INDEX ----------------------===>>>>>



// Creamos Endpoint para login --------------------------------------------------------------------------------------------------------

// Ejemplo como sale la URL en Query String: http://localhost:8000/login?email=luis@email.com&passawod=1234

app.get('/login', function(request, response) {
    connection.query(`select * from usuarios where email = "${request.query.email}" and password = "${request.query.password}"`, function(error, result, fields) {
    if (error) {
                response.status(400).send(`error ${error.message}`);
                return;
            }
        if (result.length == 0) {
            response.send({message: "Email o password incorrecto"})
        }  
        else {
            response.send({message: "Login correcto"});
        }
    }) 
})
// Termina Endpoint para login ----------------------------------------------------------------------------------------------------------------

// Creamos Endpoint para registro ----------------------------------------------------===>>
app.get('/registro', function(request, response) {
    connection.query('insert into usuarios values ()', function(error, result, fields) {
        if(error) {
            response.status(400).send(`error ${error.message}`);
            return;
        }
        response.send({result});
    })
})

// Creamos nuevo Endponint para trabajar con BODY que es tipo POST

app.post('/registro', function(request, response) {
    let nombre = request.body.nombre;
    let apellidos = request.body.apellidos;
    let email = request.body.email;

    console.log(request.body);

    // Insert into empleados_clientes
    // Insert into usuarios

    response.send({message: "registro"});
})

// Termina Enpoint para registro -------------------------------------------------------===>>


// INICIA LA FUNCION PARA ARRANCAR MYSQL ===>>
app.listen(8000, function() {       // Indicam en qué puerto lo hemos creados
    console.log('server up and running!!!')
});