const host = "http://localhost:8000";

function registro() {
    const nombre = document.getElementById("nombre").value;
    const apellidos = document.getElementById("apellidos").value;
    const telefono = document.getElementById("telefono").value;
    const cliente_id = document.getElementById("cliente_id").value;
    const dni = document.getElementById("dni").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const repetirPassword = document.getElementById("repetir_password").value;
    console.log(nombre, apellidos, telefono, cliente_id, dni, email, password, repetirPassword);


    if (password !== repetirPassword) {
        alert ("Ups!! Debes colocar la misma contraseña");
    }
    else{
        alert ("Usuario creado correctamente") ;
        window.location.href = "/index.html";
  
    fetch(`${host}/registro`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    
    body: JSON.stringify({nombre: nombre, apellidos: apellidos, telefono: telefono, cliente_id: cliente_id, 
        dni: dni, email: email, password: password})
    })
 }
}
