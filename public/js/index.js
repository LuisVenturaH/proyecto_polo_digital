const host = "http://localhost:8000";

window.addEventListener("load", function(event) {
    // FETCH PARA CAMBIAR EL DOM 
    fetch(`${host}/carrusel?total=3`)
    .then(function(response){
        return response.json();
    }).then(function(json) {
        const containerDiv = document.getElementById("container");
        containerDiv.innerHTML = "<ul>";
            for (let i = 0; i < json.length; i++) {
                containerDiv.innerHTML += `<li><button onclick="carruselClick(${json[i].id})">${json[i].nombre}</button> 
                <p> Haz clic para saber más <------------
                Fecha inicio: ${json[i].fecha_inicio} Fecha final: ${json[i].fecha_final}</p></li>`;
            }
                containerDiv += "</ul>";

                if (json[0].nombre == "onclic") {
                    containerDiv.innerHTML += `<li>${json[0]} li>`
                }
    }).catch(function(error){
        console.log(error);
    });
});
 // FUNCION QUE PERMITE HACER CLIC A BOTONES Y CAMBIA LISTA DE EVENTOS POR EVENTO UNICO
function carruselClick(evento_id) {
    fetch(`${host}/eventos/${evento_id}'`)
    .then(function(response){
        return response.json();
    }).then(function(json) {
        const containerDiv = document.getElementById("container");
        containerDiv.innerHTML = 
        `<img src="/img/${json.nombre}.jpg" width="500px"/>
        <h1>Bienvenidos a  ${json.nombre} </h1>
        <h2>El mejor ${json.tipo} de España</h2>
        <h3>Ven el dia ${json.fecha_inicio} a disfrutar del mejor evento del año</h3>
        <button class="btn"><a href="http://localhost:8000">Volver</a></button>`; // Evento que regresa a la página inicial
        
        
        console.log(json)
    }).catch(function(error){
        console.log(error);
    }); 
}

