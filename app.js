const express = require("express"); // Indicamos cual es el paquete que usará, en este caso el express
const app = express();

app.use(express.static('public')); // Indicamos que usará archivos públicos, estáticos

app.get('/hola', function(request, response) { // Creamos un N Point. En este caso nos devuelve un "ola k ase" como mensaje
    response.send({message: 'ola k ase'})
});

app.listen(8000, function() {       // Indicamos en qué puerto lo hemos creados
    console.log('server up and running!!!')
});