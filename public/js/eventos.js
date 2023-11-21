const host = "http://localhost:8000";

// Inicio conección a Endpoint total eventos
window.addEventListener("load", function(event){

fetch(`${host}/todos_eventos`)
.then(function(response){
    return response.json();
}).then(function(json){
    const todos_eventosDiv = document.getElementById('todos_eventos');
    todos_eventosDiv.innerHTML = "<ul>"
    for (let i = 0; i < json.length; i++) {
        todos_eventosDiv.innerHTML +=
        `<div class="mainflex">
            <div>
                <h2>Nombre del evento: <span class="bold">${json[i].nombre_evento}</span></h2>
                <h4>Tipo de evento: ${json[i].tipo}</h4>
                <h4>Fecha: ${json[i].fecha_inicio} </h4>
            </div>
            <img src="/img/${json[i].nombre_evento}.jpg" width="250px"/>
        </div>`
    }
    todos_eventosDiv += "</ul>";
    
}).catch(function(error){
    console.log(error);
})

})

