const host = "http://localhost:8000";

function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    console.log(email, password);
     
    fetch(`${host}/login`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({email: email, password: password})
    }).then(function(response){
        return response.json()
    }).then(function(json){
        console.log(json);

        alert(json.message);

        if (json.message === "Login correcto") {
            window.location.href = "/index.html"; // Con esto logramos que cuando un usuario se loguee se redireccione a la página de inicio
        }
    }).catch(function(error){
        console.log(error);
    })
}