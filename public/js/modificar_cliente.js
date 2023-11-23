const host = "http://localhost:8000";

// FUNCION PARA COMPLETAR DATOS DE CLIENTES AUTOMATICAMENTE AL SELECCIONAR UNO DE ELLOS.

document.getElementById("selector").addEventListener("change", insertar_datos_clientes);

function insertar_datos_clientes() {
    const selector = document.getElementById("selector");
    
    const id = selector.value; //id proporciona el id del cliente. Comprobado correctamente
   
    fetch(`${host}/cliente/${id}`) // La URL llega bien, ha sido comprobada
        .then(function (response){
            return response.json();
        })

    .then(function(json){
        document.getElementById("cif").value = json["cif"];
        document.getElementById("sector").value = json["sector"];
        document.getElementById("telefono").value = json["telefono"];
        document.getElementById("numero_empleados").value = json["numero_empleados"];
    })
    .catch(function(error){
        console.log(error);
    });
}
// TERMINA FUNCION PARA COMPLETAR DATOS DE CLIENTES AUTOMATICAMENTE AL SELECCIONAR UNO DE ELLOS.

// FUNCION PARA MODIFICAR CLIENTES 
function modificar_cliente() {
    const id = document.getElementById("selector").value;
    const cif = document.getElementById("cif").value;
    const sector = document.getElementById("sector").value;
    const telefono = document.getElementById("telefono").value;
    const numero_empleados = document.getElementById("numero_empleados").value;

    console.log(cif, sector, telefono, numero_empleados);

    if (cif === "" || sector === "" || telefono === "" || numero_empleados === "") {
        alert("Has dejado uno o varios de los campos en blanco. Completa la información.");
    } 
    else { 
           fetch(`${host}/modificar_cliente`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                id: id,
                cif: cif,
                sector: sector,
                telefono: telefono,
                numero_empleados: numero_empleados,
            }),
        })
        .then(response => response.json())
        .then(json=> {
            alert("Cliente modificado correctamente");
            window.location.href = "http://localhost:8000/html/modificar_cliente.html";
        })
        .catch(error =>{
            console.log(error);
            alert("Error al modificar el cliente. Por favor, intentelo de nuevo");
        });
    }
}     

// .then((response) => response.json())
            // .then((json) => {
            //     console.log(json);
            //     alert(json.message);

            //     if (json.message === "Cliente modificado correctamente") {
            //         window.location.href = "http://localhost:8000/html/index.html";
            //     }
            // })
            // .catch((error) => {
            //     console.error(error);
            // });
   

// window.addEventListener("load", function(event){
// 
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
