const formulario = document.getElementById("formulario");
const resultado = document.getElementById("resultado");

// Convierte los nombres a mayúsculas y permite letras, acentos y espacios.
const camposNombre = ["nombre", "paterno", "materno"];

camposNombre.forEach((id) => {
  const campo = document.getElementById(id);

  campo.addEventListener("input", () => {
    campo.value = campo.value
      .replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]/g, "")
      .toLocaleUpperCase("es-MX")
      .slice(0, 100);
  });
});

// Edad: únicamente números y máximo 3 dígitos.
const edad = document.getElementById("edad");
edad.addEventListener("input", () => {
  edad.value = edad.value.replace(/\D/g, "").slice(0, 3);
});

// Teléfono: permite espacios, pero cuenta únicamente los 10 dígitos.
const telefono = document.getElementById("telefono");
telefono.addEventListener("input", () => {
  telefono.value = telefono.value.replace(/[^\d ]/g, "");
  const digitos = telefono.value.replace(/\D/g, "");
  if (digitos.length > 10) {
    let cuenta = 0;
    telefono.value = [...telefono.value].filter((caracter) => {
      if (/\d/.test(caracter)) {
        cuenta++;
        return cuenta <= 10;
      }
      return true;
    }).join("");
  }
});

// Número de tarjeta: exactamente 10 dígitos en este ejercicio.
const tarjeta = document.getElementById("tarjeta");
tarjeta.addEventListener("input", () => {
  tarjeta.value = tarjeta.value.replace(/\D/g, "").slice(0, 10);
});

function marcar(campo, mensaje) {
  const contenedor = campo.closest(".campo");
  const error = contenedor.querySelector(".error");
  error.textContent = mensaje;
  campo.classList.toggle("invalido", Boolean(mensaje));
  campo.classList.toggle("valido", !mensaje);
  return !mensaje;
}

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  let correcto = true;

  camposNombre.forEach((id) => {
    const campo = document.getElementById(id);
    const valor = campo.value.trim();
    let mensaje = "";

    if (!valor) {
      mensaje = "Este campo es obligatorio.";
    } else if (valor.length > 100) {
      mensaje = "Máximo 100 letras.";
    } else if (!/^[A-ZÁÉÍÓÚÜÑ]+(?:\s+[A-ZÁÉÍÓÚÜÑ]+)*$/u.test(valor)) {
      mensaje = "Usa solamente letras, acentos y espacios.";
    }

    if (!marcar(campo, mensaje)) correcto = false;
  });

  let mensajeEdad = "";
  if (!edad.value) {
    mensajeEdad = "Escribe tu edad.";
  } else if (!/^\d{1,3}$/.test(edad.value) || Number(edad.value) < 1) {
    mensajeEdad = "Escribe una edad válida de máximo 3 números.";
  }
  if (!marcar(edad, mensajeEdad)) correcto = false;

  const fecha = document.getElementById("fecha");
  let mensajeFecha = "";
  if (!fecha.value) {
    mensajeFecha = "Selecciona tu fecha de nacimiento.";
  } else if (new Date(fecha.value + "T00:00:00") > new Date()) {
    mensajeFecha = "La fecha no puede ser futura.";
  }
  if (!marcar(fecha, mensajeFecha)) correcto = false;

  const digitosTelefono = telefono.value.replace(/\D/g, "");
  let mensajeTelefono = "";
  if (!telefono.value.trim()) {
    mensajeTelefono = "Escribe tu número de teléfono.";
  } else if (!/^[\d ]+$/.test(telefono.value) || digitosTelefono.length !== 10) {
    mensajeTelefono = "El teléfono debe contener exactamente 10 números.";
  }
  if (!marcar(telefono, mensajeTelefono)) correcto = false;

  const correo = document.getElementById("correo");
  const usuarioCorreo = correo.value.trim();
  let mensajeCorreo = "";
  if (!usuarioCorreo) {
    mensajeCorreo = "Escribe la parte inicial de tu correo.";
  } else if (!/^[a-zA-Z0-9._%+-]+$/.test(usuarioCorreo) ||
             usuarioCorreo.startsWith(".") || usuarioCorreo.endsWith(".") ||
             usuarioCorreo.includes("..")) {
    mensajeCorreo = "Escribe un usuario de correo válido.";
  }
  if (!marcar(correo, mensajeCorreo)) correcto = false;

  let mensajeTarjeta = "";
  if (!tarjeta.value) {
    mensajeTarjeta = "Escribe el número de tarjeta.";
  } else if (!/^\d{10}$/.test(tarjeta.value)) {
    mensajeTarjeta = "Debe contener exactamente 10 números.";
  }
  if (!marcar(tarjeta, mensajeTarjeta)) correcto = false;

  resultado.className = correcto ? "exito" : "fallo";
  resultado.textContent = correcto
    ? "¡Formulario validado correctamente!"
    : "Hay errores. Revisa los campos marcados en rojo.";
});
