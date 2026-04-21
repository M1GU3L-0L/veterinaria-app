function crear(){
  const producto = document.getElementById("producto").value.trim();
  const precio = Number(document.getElementById("precio").value);
  const cantidad = Number(document.getElementById("cantidad").value);

  const MAX_PRECIO = 99999999;
  const MAX_CANTIDAD = 1000;

  if(!producto){
    alert("Producto obligatorio");
    return;
  }

  if(precio <= 0 || precio > MAX_PRECIO){
    alert("El precio no puede ser mayor a " + MAX_PRECIO);
    return;
  }

  if(cantidad <= 0 || cantidad > MAX_CANTIDAD){
    alert("La cantidad no puede ser mayor a " + MAX_CANTIDAD);
    return;
  }

  fetch("/ventas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ producto, precio, cantidad })
  })
  .then(() => cargar());
}

function cargar() {
  fetch("/ventas")
    .then(res => res.json())
    .then(data => {
      const lista = document.getElementById("lista");
      lista.innerHTML = "";

      data.forEach(v => {
        lista.innerHTML += `
          <li id="item-${v._id}">
            <span><strong>${v.producto}</strong> — $${v.precio} | Cant: ${v.cantidad} | Fecha: ${v.fecha}</span>
            <div>
              <button class="btn-secondary" onclick="mostrarEditar('${v._id}', '${v.producto}', ${v.precio}, ${v.cantidad}, '${v.fecha}')">✏️ Editar</button>
              <button class="btn-danger" onclick="eliminar('${v._id}')">🗑️ Eliminar</button>
            </div>
          </li>
        `;
      });
    })
    .catch(err => console.log("Error en fetch:", err));
}

function eliminar(id) {
  if (!confirm("¿Seguro que deseas eliminar esta venta?")) return;

  fetch("/ventas/" + id, { method: "DELETE" })
    .then(() => cargar());
}

function mostrarEditar(id, producto, precio, cantidad, fecha) {
  // Si ya hay un formulario abierto para este item, lo cerramos
  const existing = document.getElementById("form-editar-" + id);
  if (existing) {
    existing.remove();
    return;
  }

  const item = document.getElementById("item-" + id);

  const form = document.createElement("div");
  form.id = "form-editar-" + id;
  form.style.marginTop = "10px";
  form.innerHTML = `
    <input id="edit-producto-${id}" value="${producto}" placeholder="Producto">
    <input id="edit-precio-${id}" type="number" value="${precio}" placeholder="Precio">
    <input id="edit-cantidad-${id}" type="number" value="${cantidad}" placeholder="Cantidad">
    <input id="edit-fecha-${id}" type="date" value="${fecha}">
    <button class="btn-primary" onclick="actualizar('${id}')">💾 Guardar</button>
    <button onclick="document.getElementById('form-editar-${id}').remove()">✖ Cancelar</button>
  `;

  item.appendChild(form);
}

function actualizar(id) {
  const data = {
    producto: document.getElementById("edit-producto-" + id).value,
    precio: Number(document.getElementById("edit-precio-" + id).value),
    cantidad: Number(document.getElementById("edit-cantidad-" + id).value),
    fecha: document.getElementById("edit-fecha-" + id).value
  };

  fetch("/ventas/" + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then(() => cargar());
}

function generarPDF() {
  window.open("/ventas/reporte", "_blank");
}

document.addEventListener("DOMContentLoaded", () => {
  cargar();
});

document.getElementById("precio").addEventListener("input", function() {
  if (this.value > 1000000) {
    this.value = 1000000;
  }
});

document.getElementById("cantidad").addEventListener("input", function() {
  if (this.value > 1000) {
    this.value = 1000;
  }
});