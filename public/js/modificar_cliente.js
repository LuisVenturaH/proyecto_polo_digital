const host = "http://localhost:8000";

// FUNCION PARA MODIFICAR CLIENTES EXISTENTES.
document.getElementById("selector").addEventListener("change", insertar_datos_clientes);
function insertar_datos_clientes() {

    const selector = document.getElementById("selector");
    let id = selector;
    console.log(id);
   
    fetch(`${host}/cliente/${id}`)
    .then(function(response){
        // return response.json();
        
    })
    .then(function(json){
        // const container_clientesDiv = document.getElementById("insertar_cliente_modificar");
        // document.getElementById("id").value = json[selector].id;
        // document.getElementById("razon_social").value = json[selector].razon_social;
        // document.getElementById("cif").value = json[selector].cif;
        // document.getElementById("sector").value = json[selector].sector;
        // document.getElementById("telefono").value = json[selector].telefono;
        // document.getElementById("numero_empleados").value = json[selector].numero_empleados
    })
    .catch(function(error){
        console.log(error);
    })
}

function modificar_cliente() {
    const id = document.getElementById("id").value = json[0].id;
    const razon_social = document.getElementById("razon_social").value = json[0].razon_social;
    const cif = document.getElementById("cif").value = json[0].cif;
    const sector = document.getElementById("sector").value = json[0].sector;
    const telefono = document.getElementById("telefono").value = json[0].telefono;
    const numero_empleados = document.getElementById("numero_empleados").value = json[0].numero_empleados;

    console.log(razon_social, cif, sector, telefono, numero_empleados);

    // if (razon_social === "" || cif === "" || sector === "" || telefono === "" || numero_empleados === "") {
    //     alert("Has dejado uno o varios de los campos en blanco. Completa la información.");
    // } else {
    // }
        // Realiza la solicitud PUT para modificar el cliente existente.
        fetch(`${host}/cliente/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                razon_social: razon_social,
                cif: cif,
                sector: sector,
                telefono: telefono,
                numero_empleados: numero_empleados,
            }),
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                alert(json.message);

                if (json.message === "Cliente modificado correctamente") {
                    window.location.href = "http://localhost:8000/html/index.html";
                }
            })
            .catch((error) => {
                console.error(error);
            });
   
}
// window.addEventListener("load", function(event){

    // CREA LISTADO DE CLIENTES Y LO ENSERTA EN EL DOM PARTIENDO DE LA APP

//     fetch(`${host}/clientes`)
//     .then(function(response){
//         return response.json();
//     }).then(function(json){
//         const container_clientesDiv = document.getElementById("container_clientes");
//         container_clientesDiv.innerHTML = "ul";
//         for (let i = 0; i < json.length; i++) {
//             container_clientesDiv.innerHTML += 
//             `
//             <div class="mainflex">
//             <div><button onclick="modificar_clientes()">Editar cliente</button></div>
//             <img src="/img/${json[i].razon_social}.png" width="160px"/>
//                 <div> 
//                     <h2>Razón Social: <strong></strong> ${json[i].razon_social}</h2> 
//                     <h3>CIF: ${json[i].cif}</h3> 
//                     <h3>Teléfono: ${json[i].telefono}</h3> 
//                     <h3>Sector: ${json[i].sector}</h3>
//                 </div>
               
//             </div>`
             
//         }
//         container_clientesDiv += "</ul>";

//     }).catch(function(error){
//         console.log(error);
//     })
// })
