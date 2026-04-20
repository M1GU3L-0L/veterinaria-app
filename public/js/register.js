function registrar() {
  const correo = document.getElementById("correo").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmar = document.getElementById("confirmar").value.trim();

  if (!correo || !password || !confirmar) {
    alert("Todos los campos son obligatorios");
    return;
  }

  if (!correo.includes("@")) {
    alert("Correo inválido");
    return;
  }

  if (password.length < 6) {
    alert("La contraseña debe tener al menos 6 caracteres");
    return;
  }

  if (password !== confirmar) {
    alert("Las contraseñas no coinciden");
    return;
  }

  fetch("/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ correo, password })
  })
  .then(async res => {
    const msg = await res.text();
    if (res.ok) {
      alert("¡Cuenta creada! Ahora inicia sesión.");
      window.location.href = "login.html";
    } else {
      alert(msg);
    }
  })
  .catch(() => alert("Error de conexión"));
}