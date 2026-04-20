function crear(){
const data = {
producto: document.getElementById("producto").value,
precio: Number(document.getElementById("precio").value),
cantidad: Number(document.getElementById("cantidad").value),
fecha: document.getElementById("fecha").value
};

fetch("/ventas", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify(data)
})
.then(() => cargar());
}

function cargar(){
  console.log("Intentando cargar ventas...");

  fetch("/ventas")
  .then(res => res.json())
  .then(data => {
    console.log("Datos recibidos:", data);

    const lista = document.getElementById("lista");
    lista.innerHTML = "";

    data.forEach(v => {
      lista.innerHTML += `
        <li>
          ${v.producto} - $${v.precio}
        </li>
      `;
    });
  })
  .catch(err => console.log("Error en fetch:", err));
}

function eliminar(id){
fetch("/ventas/" + id, { method: "DELETE" })
.then(() => cargar());
}

function generarPDF(){
window.open("/ventas/reporte", "_blank");
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("JS cargado");
  cargar();
});
