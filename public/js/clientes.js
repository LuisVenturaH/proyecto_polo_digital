const host = "http://localhost:8000";

// FUNCION PARA REGISTRAR NUEVOS CLIENTES.

function registro_nuevos_clientes() {
    const razon_social = document.getElementById("razon_social").value;
    const cif = document.getElementById("cif").value;
    const sector = document.getElementById("sector").value;
    const telefono = document.getElementById("telefono").value;
    const numero_empleados = document.getElementById("numero_empleados").value;

    console.log(razon_social, cif, sector, telefono, numero_empleados); 

    if (razon_social === "" || cif === "" || sector === "" || telefono === "" || numero_empleados === "") {
        alert ("Has dejado uno o varios de los campos en blanco. Completa la informacion")
    }
    else { 
        alert ("Cliente registrado correctamente");
        window.location.href = "http://localhost:8000/";

    fetch(`${host}/clientes`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    
    body: JSON.stringify({
        razon_social: razon_social, 
        cif: cif, 
        sector: sector, 
        telefono: telefono, 
        numero_empleados: numero_empleados})
    })
 }
}


 // CREA LISTADO DE CLIENTES Y LO ENSERTA EN EL DOM PARTIENDO DE LA APP
window.addEventListener("load", function(event){
    fetch(`${host}/clientes`)
    .then(function(response){
        return response.json();
    }).then(function(json){
        const container_clientesDiv = document.getElementById("container_clientes");
        container_clientesDiv.innerHTML = "<ul>";
        for (let i = 0; i < json.length; i++) {
            container_clientesDiv.innerHTML += 
            `
            <div class="mainflex">
            <div id="insertar_cliente_modificar"><a href="http://localhost:8000/html/modificar_cliente.html">Editar cliente</a></button></div>
            <img src="/img/${json[i].razon_social}.png" width="160px"/>
                <div> 
                    <h2>Razón Social: <span class="bold">${json[i].razon_social}</span></h2> 
                    <h4>CIF: ${json[i].cif}</h4> 
                    <h4>Teléfono: ${json[i].telefono}</h4> 
                    <h4>Sector: ${json[i].sector}</h4>
                </div>
               
            </div>`     
        }
        container_clientesDiv += "</ul>";

    }).catch(function(error){
        console.log(error);
    })
})