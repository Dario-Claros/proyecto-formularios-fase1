// variables gobales para guardar los fomularios del json
let listaFormularios = [];
let mostrandoTodos = false;
window.plantillaActual = null;

// datos de respaldo por si se abre el html directo sin servidor local
const datosRespaldo = [
  {
    id: "contacto",
    nombre: "Formulario de Contacto",
    categoria: "General",
    descripcion: "Formulario basico para recibir dudas o mensajes de los usuarios.",
    icono: "bi-envelope",
    campos: [
      { id: "c1", tipo: "titulo", texto: "Contactanos" },
      { id: "c2", tipo: "texto", texto: "Llena los campos para enviarnos tu consulta." },
      { id: "c3", tipo: "cuadroTexto", subtipo: "text", etiqueta: "Nombre", placeholder: "Ingresa tu nombre", requerido: true },
      { id: "c4", tipo: "cuadroTexto", subtipo: "email", etiqueta: "Correo Electronico", placeholder: "correo@ejemplo.com", requerido: true },
      { id: "c5", tipo: "desplegable", etiqueta: "Motivo", opciones: ["Consulta", "Soporte", "Sugerencia", "Otro"], requerido: true },
      { id: "c6", tipo: "areaTexto", etiqueta: "Mensaje", placeholder: "Escribe tu mensaje aqui...", filas: 4, requerido: true },
      { id: "c7", tipo: "botonEnviar", texto: "Enviar" }
    ]
  },
  {
    id: "registro",
    nombre: "Registro de Usuario",
    categoria: "Cuentas",
    descripcion: "Formulario para crear una cuenta nueva con datos personales.",
    icono: "bi-person-plus",
    campos: [
      { id: "r1", tipo: "titulo", texto: "Registro de usuario" },
      { id: "r2", tipo: "texto", texto: "Completa tus datos para registrarte." },
      { id: "r3", tipo: "cuadroTexto", subtipo: "text", etiqueta: "Nombre completo", placeholder: "Ingresa tu nombre completo", requerido: true },
      { id: "r4", tipo: "cuadroTexto", subtipo: "email", etiqueta: "Correo Electronico", placeholder: "usuario@correo.com", requerido: true },
      { id: "r5", tipo: "cuadroTexto", subtipo: "password", etiqueta: "Contraseña", placeholder: "Minimo 8 caracteres", requerido: true },
      { id: "r6", tipo: "cuadroTexto", subtipo: "date", etiqueta: "Fecha de nacimiento", requerido: true },
      { id: "r7", tipo: "radio", etiqueta: "Genero", opciones: ["Femenino", "Masculino", "Otro"], requerido: true },
      { id: "r8", tipo: "botonEnviar", texto: "Registrarse" }
    ]
  },
  {
    id: "login",
    nombre: "Inicio de Sesion",
    categoria: "Cuentas",
    descripcion: "Formulario corto para entrar con correo y contraseña.",
    icono: "bi-box-arrow-in-right",
    campos: [
      { id: "l1", tipo: "titulo", texto: "Iniciar sesion" },
      { id: "l2", tipo: "texto", texto: "Ingresa tus datos para entrar a tu cuenta." },
      { id: "l3", tipo: "cuadroTexto", subtipo: "email", etiqueta: "Correo Electronico", placeholder: "correo@ejemplo.com", requerido: true },
      { id: "l4", tipo: "cuadroTexto", subtipo: "password", etiqueta: "Contraseña", placeholder: "Ingresa tu contraseña", requerido: true },
      { id: "l5", tipo: "botonEnviar", texto: "Entrar" }
    ]
  },
  {
    id: "encuesta",
    nombre: "Encuesta de Satisfaccion",
    categoria: "Encuestas",
    descripcion: "Encuesta para conocer la opinion de los usuarios sobre el servicio.",
    icono: "bi-clipboard-check",
    campos: [
      { id: "e1", tipo: "titulo", texto: "Encuesta de satisfaccion" },
      { id: "e2", tipo: "texto", texto: "Responde estas preguntas para ayudarnos a mejorar." },
      { id: "e3", tipo: "desplegable", etiqueta: "Area que deseas evaluar", opciones: ["Atencion al cliente", "Pagina web", "Soporte", "Otro"], requerido: true },
      { id: "e4", tipo: "radio", etiqueta: "Como calificas el servicio", opciones: ["Excelente", "Bueno", "Regular", "Malo"], requerido: true },
      { id: "e5", tipo: "areaTexto", etiqueta: "Comentarios adicionales", placeholder: "Escribe algun comentario...", filas: 3, requerido: false },
      { id: "e6", tipo: "botonEnviar", texto: "Enviar encuesta" }
    ]
  },
  {
    id: "evento",
    nombre: "Inscripcion a Evento",
    categoria: "Educacion",
    descripcion: "Formulario para inscribirse a talleres o charlas de la universidad.",
    icono: "bi-calendar-event",
    campos: [
      { id: "ev1", tipo: "imagen", src: "img/Logo_UDB.png", alt: "Logo UDB", ancho: "110px" },
      { id: "ev2", tipo: "titulo", texto: "Inscripcion al taller" },
      { id: "ev3", tipo: "cuadroTexto", subtipo: "text", etiqueta: "Nombre del estudiante", placeholder: "Ingresa tu nombre", requerido: true },
      { id: "ev4", tipo: "cuadroTexto", subtipo: "email", etiqueta: "Correo institucional", placeholder: "alumno@udb.edu.sv", requerido: true },
      { id: "ev5", tipo: "cuadroTexto", subtipo: "date", etiqueta: "Fecha de asistencia", requerido: true },
      { id: "ev6", tipo: "radio", etiqueta: "Modalidad", opciones: ["Presencial", "Virtual"], requerido: true },
      { id: "ev7", tipo: "botonEnviar", texto: "Inscribirse" }
    ]
  },
  {
    id: "empleo",
    nombre: "Solicitud de Empleo",
    categoria: "Trabajo",
    descripcion: "Formulario para aplicar a un puesto y subir el curriculum.",
    icono: "bi-briefcase",
    campos: [
      { id: "em1", tipo: "titulo", texto: "Solicitud de empleo" },
      { id: "em2", tipo: "texto", texto: "Ingresa tus datos y sube tu hoja de vida." },
      { id: "em3", tipo: "cuadroTexto", subtipo: "text", etiqueta: "Nombre completo", placeholder: "Ingresa tu nombre", requerido: true },
      { id: "em4", tipo: "cuadroTexto", subtipo: "email", etiqueta: "Correo Electronico", placeholder: "correo@ejemplo.com", requerido: true },
      { id: "em5", tipo: "desplegable", etiqueta: "Puesto al que aplica", opciones: ["Programador Web", "Diseñador", "Soporte Tecnico"], requerido: true },
      { id: "em6", tipo: "cuadroTexto", subtipo: "number", etiqueta: "Años de experiencia", placeholder: "0", requerido: true },
      { id: "em7", tipo: "archivo", etiqueta: "Subir CV (PDF)", aceptar: ".pdf", requerido: true },
      { id: "em8", tipo: "botonEnviar", texto: "Enviar solicitud" }
    ]
  }
];

// funcion para cargar los fomularios predeteminados desde el archivo json
async function cargarFormulariosJSON() {
  try {
    const respuesta = await fetch("data/formularios.json");
    const datos = await respuesta.json();
    listaFormularios = datos.formulariosPredeterminados;
    return listaFormularios;
  } catch (error) {
    // si se abre el archivo directo sin live server usa los datos del json en memoria
    listaFormularios = datosRespaldo;
    return listaFormularios;
  }
}

// crear el html de cada campo segun el tipo que tenga
function crearCampoHTML(campo) {
  let requerido = campo.requerido ? "required" : "";
  let asterisco = campo.requerido ? ' <span class="text-danger">*</span>' : "";
  let html = "";

  if (campo.tipo === "titulo") {
    html = `<h3 class="titulo-formulario mb-2">${campo.texto}</h3>`;
  } else if (campo.tipo === "texto") {
    html = `<p class="text-secondary mb-3">${campo.texto}</p>`;
  } else if (campo.tipo === "imagen") {
    html = `
      <div class="mb-3 text-center">
        <img src="${campo.src}" alt="${campo.alt}" class="img-fluid" style="max-width: ${campo.ancho || "120px"};">
      </div>`;
  } else if (campo.tipo === "cuadroTexto") {
    html = `
      <div class="mb-3">
        <label class="form-label">${campo.etiqueta}${asterisco}</label>
        <input
          type="${campo.subtipo || "text"}"
          class="form-control campo-personalizado"
          placeholder="${campo.placeholder || ""}"
          ${requerido}
        >
      </div>`;
  } else if (campo.tipo === "areaTexto") {
    html = `
      <div class="mb-3">
        <label class="form-label">${campo.etiqueta}${asterisco}</label>
        <textarea
          class="form-control campo-personalizado"
          rows="${campo.filas || 3}"
          placeholder="${campo.placeholder || ""}"
          ${requerido}
        ></textarea>
      </div>`;
  } else if (campo.tipo === "desplegable") {
    let opcionesHTML = `<option value="">Seleccione una opción</option>`;
    campo.opciones.forEach((op) => {
      opcionesHTML += `<option value="${op}">${op}</option>`;
    });

    html = `
      <div class="mb-3">
        <label class="form-label">${campo.etiqueta}${asterisco}</label>
        <select class="form-select campo-personalizado" ${requerido}>
          ${opcionesHTML}
        </select>
      </div>`;
  } else if (campo.tipo === "radio") {
    let radiosHTML = "";
    campo.opciones.forEach((op, index) => {
      radiosHTML += `
        <div class="form-check">
          <input class="form-check-input" type="radio" name="${campo.id}" id="${campo.id}_${index}" value="${op}" ${requerido}>
          <label class="form-check-label" for="${campo.id}_${index}">${op}</label>
        </div>`;
    });

    html = `
      <div class="mb-3">
        <label class="form-label d-block">${campo.etiqueta}${asterisco}</label>
        ${radiosHTML}
      </div>`;
  } else if (campo.tipo === "archivo") {
    html = `
      <div class="mb-3">
        <label class="form-label">${campo.etiqueta}${asterisco}</label>
        <input type="file" class="form-control campo-personalizado" accept="${campo.aceptar || ""}" ${requerido}>
      </div>`;
  } else if (campo.tipo === "botonEnviar") {
    html = `
      <div class="mt-3">
        <button type="submit" class="btn-enviar">${campo.texto}</button>
      </div>`;
  }

  return html;
}

// contruir el formulario completo con los campos de la platilla
function construirFormularioHTML(plantilla) {
  let contenidoCampos = "";
  plantilla.campos.forEach((campo) => {
    contenidoCampos += crearCampoHTML(campo);
  });

  return `
    <form class="formulario-contacto p-3" onsubmit="event.preventDefault(); alert('Formulario enviado correctamente');">
      ${contenidoCampos}
    </form>`;
}

// mostar las tarjetas de los formularios en la pagina Formularios.html
function mostrarTarjetasFormularios() {
  const contenedor = document.getElementById("contenedorFormularios");
  if (!contenedor) return;

  contenedor.innerHTML = "";

  // mostar 3 al inicio o todos si le dan en ver mas
  let cantidad = mostrandoTodos ? listaFormularios.length : 3;
  let formulariosVisibles = listaFormularios.slice(0, cantidad);

  formulariosVisibles.forEach((form) => {
    contenedor.innerHTML += `
      <div class="col">
        <div class="card h-100 tarjeta-plantilla shadow-sm">
          <div class="card-body d-flex flex-column p-4">
            <div class="d-flex align-items-center gap-3 mb-3">
              <div class="icono-plantilla">
                <i class="bi ${form.icono}"></i>
              </div>
              <div>
                <h5 class="fw-bold mb-1 titulo-formulario">${form.nombre}</h5>
                <span class="badge etiqueta-categoria">${form.categoria}</span>
              </div>
            </div>
            <p class="text-secondary small flex-grow-1">${form.descripcion}</p>
            <p class="small fw-semibold mb-3" style="color: #2C0A3F;">
              <i class="bi bi-ui-checks me-1"></i>${form.campos.length} elementos incluidos
            </p>
            <div class="d-flex gap-2 mt-auto">
              <button type="button" class="btn btn-sm flex-fill btn-plantilla-borde" onclick="verVistaPrevia('${form.id}')">
                Vista previa
              </button>
              <a href="CrearForms.html?plantilla=${form.id}" class="btn btn-sm flex-fill btn-plantilla" onclick="guardarPlantilla('${form.id}')">
                Usar plantilla
              </a>
            </div>
          </div>
        </div>
      </div>`;
  });
}

// guardar la platilla selecionada en el localstorage para pasarla a CrearForms
function guardarPlantilla(idFormulario) {
  const encontrada = listaFormularios.find((f) => f.id === idFormulario);
  if (encontrada) {
    localStorage.setItem("plantillaSeleccionada", JSON.stringify(encontrada));
  }
}

// habrir el modal con la vista previa del fomulario
function verVistaPrevia(idFormulario) {
  const encontrada = listaFormularios.find((f) => f.id === idFormulario);
  if (!encontrada) return;

  document.getElementById("tituloModalPrevia").textContent =
    "Vista previa: " + encontrada.nombre;
  document.getElementById("cuerpoModalPrevia").innerHTML =
    construirFormularioHTML(encontrada);

  const botonUsar = document.getElementById("enlaceUsarPlantillaModal");
  botonUsar.href = "CrearForms.html?plantilla=" + encontrada.id;
  botonUsar.onclick = function () {
    guardarPlantilla(encontrada.id);
  };

  const modal = new bootstrap.Modal(document.getElementById("modalVistaPrevia"));
  modal.show();
}

// cargar la platilla selecionada dentro de CrearForms.html
function iniciarAreaTrabajo() {
  const areaTrabajo = document.getElementById("areaTrabajo");
  if (!areaTrabajo) return;

  // leer el parametro plantilla de la url
  const parametros = new URLSearchParams(window.location.search);
  const idPlantilla = parametros.get("plantilla");

  if (idPlantilla) {
    window.plantillaActual = listaFormularios.find((f) => f.id === idPlantilla) || null;
  }

  // opciones del select para elejir plantilla
  let opcionesSelect = `<option value="">-- Seleccionar formulario predeterminado --</option>`;
  listaFormularios.forEach((f) => {
    let seleccionado =
      window.plantillaActual && window.plantillaActual.id === f.id ? "selected" : "";
    opcionesSelect += `<option value="${f.id}" ${seleccionado}>${f.nombre}</option>`;
  });

  areaTrabajo.innerHTML = `
    <div class="d-flex flex-wrap align-items-center justify-content-between gap-2 bg-secondary-subtle rounded-4 p-3 mb-3">
      <div class="d-flex align-items-center gap-2">
        <label for="selectorPlantilla" class="fw-bold small titulo-formulario mb-0">Plantilla:</label>
        <select id="selectorPlantilla" class="form-select form-select-sm w-auto" onchange="cambiarPlantilla(this.value)">
          ${opcionesSelect}
        </select>
      </div>
      <div class="d-flex gap-2">
        <button type="button" class="btn btn-sm btn-plantilla-borde" onclick="mostrarCodigoHTML()">
          Ver código HTML
        </button>
        <button type="button" class="btn btn-sm btn-outline-secondary" onclick="limpiarAreaTrabajo()">
          Limpiar
        </button>
      </div>
    </div>

    <div id="lienzoFormulario" class="bg-white rounded-4 p-4 shadow-sm border"></div>

    <!-- Modal para mostar el codigo html generado -->
    <div class="modal fade" id="modalCodigoHTML" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title fw-bold titulo-formulario">Código HTML generado</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <pre id="bloqueCodigoHTML" class="bg-dark text-light p-3 rounded-3 small mb-0"></pre>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-plantilla" onclick="copiarCodigoHTML()">Copiar código</button>
          </div>
        </div>
      </div>
    </div>`;

  actualizarLienzo();
}

// pintar el fomulario actual en el area de trabajo
function actualizarLienzo() {
  const lienzo = document.getElementById("lienzoFormulario");
  if (!lienzo) return;

  if (!window.plantillaActual) {
    lienzo.innerHTML = `
      <div class="text-center text-secondary py-5">
        <p class="fw-bold mb-1">Área de trabajo vacía</p>
        <p class="small mb-0">Elige un formulario predeterminado arriba o agrega herramientas desde el panel izquierdo.</p>
      </div>`;
    return;
  }

  lienzo.innerHTML = construirFormularioHTML(window.plantillaActual);
}

// cambiar de platilla desde el select en CrearForms
function cambiarPlantilla(idFormulario) {
  window.plantillaActual = listaFormularios.find((f) => f.id === idFormulario) || null;
  if (window.plantillaActual) {
    localStorage.setItem("plantillaSeleccionada", JSON.stringify(window.plantillaActual));
  } else {
    localStorage.removeItem("plantillaSeleccionada");
  }
  actualizarLienzo();
}

// limpiar el fomulario cargado en el area de trabajo
function limpiarAreaTrabajo() {
  window.plantillaActual = null;
  document.getElementById("selectorPlantilla").value = "";
  localStorage.removeItem("plantillaSeleccionada");
  actualizarLienzo();
}

// mostar en un modal el codigo html del formulario
function mostrarCodigoHTML() {
  const bloque = document.getElementById("bloqueCodigoHTML");
  if (!window.plantillaActual) {
    bloque.textContent = "<!-- Primero selecciona una plantilla -->";
  } else {
    let codigo = "<form>\n";
    window.plantillaActual.campos.forEach((campo) => {
      codigo += "  " + crearCampoHTML(campo).trim() + "\n";
    });
    codigo += "</form>";
    bloque.textContent = codigo;
  }

  const modal = new bootstrap.Modal(document.getElementById("modalCodigoHTML"));
  modal.show();
}

// copiar el codigo html al portapapeles
function copiarCodigoHTML() {
  const codigo = document.getElementById("bloqueCodigoHTML").textContent;
  navigator.clipboard.writeText(codigo);
  alert("Código copiado al portapapeles");
}

// iniciar todo cuando cargue la pagina
document.addEventListener("DOMContentLoaded", async () => {
  await cargarFormulariosJSON();

  // si estamos en la pagina de Formularios.html
  if (document.getElementById("contenedorFormularios")) {
    mostrarTarjetasFormularios();

    const btnVerMas = document.getElementById("verMas");
    if (btnVerMas) {
      btnVerMas.addEventListener("click", (e) => {
        e.preventDefault();
        mostrandoTodos = !mostrandoTodos;
        btnVerMas.textContent = mostrandoTodos ? "Ver menos" : "Ver más";
        mostrarTarjetasFormularios();
      });
    }
  }

  // si estamos en la pagina de CrearForms.html
  if (document.getElementById("areaTrabajo")) {
    iniciarAreaTrabajo();
  }
});
