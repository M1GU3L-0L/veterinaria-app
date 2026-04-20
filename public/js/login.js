function login() {
const correo = document.getElementById("correo").value.trim();
const password = document.getElementById("password").value.trim();

if(!correo || !password){
alert("Todos los campos son obligatorios");
return;
}

if(!correo.includes("@")){
alert("Correo inválido");
return;
}

fetch("/auth/login", {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({ correo, password })
})
.then(res => {
if(res.ok){
window.location.href = "menu.html";
} else {
alert("Credenciales incorrectas");
}
});
}
