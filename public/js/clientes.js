const host = "http://localhost:8000";

function registro_clientes() {
    const razon_social = document.getElementById("razon_social").value;
    const cif = document.getElementById("cif").value;
    const sector = document.getElementById("sector").value;
    const telefono = document.getElementById("telefono").value;
    const numero_empleados = document.getElementById("numero_empleados").value;

    console.log(razon_social, cif, sector, telefono, numero_empleados); 

    fetch(`${host}/clientes`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    
    body: JSON.stringify({razon_social: razon_social, cif: cif, sector: sector, telefono: telefono, numero_empleados: numero_empleados})
    }).then(function(response){
        return response.json()
    }).then(function(json){
        console.log(json);

        alert (json.message);

        if (json.message === "cliente insertado") {
            alert ("Cliente insertado correctamente!!!!! DESDE CLIENTES.JS")
            window.location.href="/index.html";
        }
        }).catch(function(error){
            console.log(error);
    })
 }

window.addEventListener("load", function(event){

    fetch(`${host}/clientes`)
    .then(function(response){
        return response.json();
    }).then(function(json){
        const container_clientesDiv = document.getElementById("container_clientes");
        container_clientesDiv.innerHTML = "ul";
        for (let i = 0; i < json.length; i++) {
            container_clientesDiv.innerHTML += 
            `<h2>Razón Social: ${json[i].razon_social}</h2> 
             <img src="/img/${json[i].razon_social}.jpg" width="250px"/>
             <h3>CIF: ${json[i].cif}</h3> 
             <h3>Teléfono: ${json[i].telefono}</h3> 
             <h3>Sector: ${json[i].sector}</h3>
             <p>------------------------------------------------</p>`
        }
        container_clientesDiv += "</ul>";

    }).catch(function(error){
        console.log(error);
    })
})



