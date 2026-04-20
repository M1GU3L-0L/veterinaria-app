function irVentas() {
  window.location.href = "ventas.html";
}

function cerrarSesion() {
  if (confirm("¿Deseas cerrar sesión?")) {
    window.location.href = "login.html";
  }
}