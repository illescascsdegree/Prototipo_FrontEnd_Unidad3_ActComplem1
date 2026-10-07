// script.js — FCA Tareas: lógica común del prototipo Front-End

document.addEventListener("DOMContentLoaded", function () {

  // --- Saludo dinámico según la hora del día (home / dashboard) ---
  const saludoEl = document.getElementById("saludoDinamico");
  if (saludoEl) {
    const hora = new Date().getHours();
    let saludo = "¡Hola!";
    if (hora < 12) saludo = "¡Buenos días!";
    else if (hora < 19) saludo = "¡Buenas tardes!";
    else saludo = "¡Buenas noches!";
    saludoEl.textContent = saludo + " Bienvenido(a) a FCA Tareas.";
  }

  // --- Validación del formulario de login ---
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const usuario = document.getElementById("usuario");
      const password = document.getElementById("password");
      let valido = true;

      document.querySelectorAll(".is-invalid-msg").forEach(el => el.remove());

      if (usuario.value.trim().length < 3) {
        mostrarError(usuario, "El usuario debe tener al menos 3 caracteres.");
        valido = false;
      }
      if (password.value.trim().length < 6) {
        mostrarError(password, "La contraseña debe tener al menos 6 caracteres.");
        valido = false;
      }

      const resultado = document.getElementById("loginResultado");
      if (valido) {
        resultado.className = "alert alert-success mt-3";
        resultado.textContent = "Validación exitosa. En una aplicación real, aquí se enviarían las credenciales al Back-End para autenticarte.";
        resultado.classList.remove("d-none");
      } else {
        resultado.className = "alert alert-danger mt-3";
        resultado.textContent = "Corrige los campos marcados antes de continuar.";
        resultado.classList.remove("d-none");
      }
    });
  }

  function mostrarError(campo, mensaje) {
    campo.classList.add("is-invalid");
    const msg = document.createElement("div");
    msg.className = "is-invalid-msg";
    msg.textContent = mensaje;
    campo.insertAdjacentElement("afterend", msg);
  }

  // --- Formulario de captura de tareas ---
  const tareaForm = document.getElementById("tareaForm");
  if (tareaForm) {
    tareaForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const titulo = document.getElementById("tituloTarea").value.trim();
      const resultado = document.getElementById("tareaResultado");
      if (titulo.length === 0) {
        resultado.className = "alert alert-danger mt-3";
        resultado.textContent = "El título de la tarea es obligatorio.";
      } else {
        resultado.className = "alert alert-success mt-3";
        resultado.textContent = `Tarea "${titulo}" capturada correctamente (simulación del lado del cliente; en producción se enviaría al Back-End para guardarse en la base de datos).`;
        tareaForm.reset();
      }
      resultado.classList.remove("d-none");
    });
  }

  // --- Filtro de la tabla de listado ---
  const filtroInput = document.getElementById("filtroListado");
  if (filtroInput) {
    filtroInput.addEventListener("keyup", function () {
      const texto = filtroInput.value.toLowerCase();
      document.querySelectorAll("#tablaListado tbody tr").forEach(fila => {
        const contenido = fila.textContent.toLowerCase();
        fila.style.display = contenido.includes(texto) ? "" : "none";
      });
    });
  }

  // --- Resaltado al pasar el mouse sobre las tarjetas del dashboard ---
  document.querySelectorAll(".card-tarea").forEach(card => {
    card.addEventListener("mouseenter", () => card.classList.add("shadow"));
    card.addEventListener("mouseleave", () => card.classList.remove("shadow"));
  });

});
