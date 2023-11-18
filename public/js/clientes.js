const host = "http://localhost:8000";

function registro_nuevos_clientes() {
    const razon_social = document.getElementById("razon_social").value;
    const cif = document.getElementById("cif").value;
    const sector = document.getElementById("sector").value;
    const telefono = document.getElementById("telefono").value;
    const numero_empleados = document.getElementById("numero_empleados").value;

    console.log(razon_social, cif, sector, telefono, numero_empleados); 

    if (razon_social == "" || cif == "" || sector == "" || telefono == "" || numero_empleados == "") {
        alert ("Has dejado uno o varios de los campos en blanco. Completa a informacion")
    }
    else { 
        alert ("Cliente registrado correctamente");
        window.location.href = "http://localhost:8000/html/index.html";

    fetch(`${host}/clientes`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    
    body: JSON.stringify({razon_social: razon_social, cif: cif, sector: sector, telefono: telefono, numero_empleados: numero_empleados})
    })
 }
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
            `<div class="mainflex">
            <img src="/img/${json[i].razon_social}.png" width="160px"/>
                <div> 
                    <h2>Razón Social: <strong></strong> ${json[i].razon_social}</h2> 
                    <h3>CIF: ${json[i].cif}</h3> 
                    <h3>Teléfono: ${json[i].telefono}</h3> 
                    <h3>Sector: ${json[i].sector}</h3>
                </div>
            </div>`
             
        }
        container_clientesDiv += "</ul>";

    }).catch(function(error){
        console.log(error);
    })
})



