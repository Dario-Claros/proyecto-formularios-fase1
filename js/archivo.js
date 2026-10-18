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
      { id: "c3", tipo: "input", subtipo: "text", etiqueta: "Nombre", placeholder: "Ingresa tu nombre", requerido: true },
      { id: "c4", tipo: "input", subtipo: "email", etiqueta: "Correo Electronico", placeholder: "correo@ejemplo.com", requerido: true },
      { id: "c5", tipo: "select", etiqueta: "Motivo", opciones: ["Consulta", "Soporte", "Sugerencia", "Otro"], requerido: true },
      { id: "c6", tipo: "textarea", etiqueta: "Mensaje", placeholder: "Escribe tu mensaje aqui...", filas: 4, requerido: true },
      { id: "c7", tipo: "submit", texto: "Enviar" }
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
      { id: "r3", tipo: "input", subtipo: "text", etiqueta: "Nombre completo", placeholder: "Ingresa tu nombre completo", requerido: true },
      { id: "r4", tipo: "input", subtipo: "email", etiqueta: "Correo Electronico", placeholder: "usuario@correo.com", requerido: true },
      { id: "r5", tipo: "input", subtipo: "password", etiqueta: "Contraseña", placeholder: "Minimo 8 caracteres", requerido: true },
      { id: "r6", tipo: "input", subtipo: "date", etiqueta: "Fecha de nacimiento", requerido: true },
      { id: "r7", tipo: "radio", etiqueta: "Genero", opciones: ["Femenino", "Masculino", "Otro"], requerido: true },
      { id: "r8", tipo: "submit", texto: "Registrarse" }
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
      { id: "l3", tipo: "input", subtipo: "email", etiqueta: "Correo Electronico", placeholder: "correo@ejemplo.com", requerido: true },
      { id: "l4", tipo: "input", subtipo: "password", etiqueta: "Contraseña", placeholder: "Ingresa tu contraseña", requerido: true },
      { id: "l5", tipo: "submit", texto: "Entrar" }
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
      { id: "e3", tipo: "select", etiqueta: "Area que deseas evaluar", opciones: ["Atencion al cliente", "Pagina web", "Soporte", "Otro"], requerido: true },
      { id: "e4", tipo: "radio", etiqueta: "Como calificas el servicio", opciones: ["Excelente", "Bueno", "Regular", "Malo"], requerido: true },
      { id: "e5", tipo: "textarea", etiqueta: "Comentarios adicionales", placeholder: "Escribe algun comentario...", filas: 3, requerido: false },
      { id: "e6", tipo: "submit", texto: "Enviar encuesta" }
    ]
  },
  {
    id: "evento",
    nombre: "Inscripcion a Evento",
    categoria: "Educacion",
    descripcion: "Formulario para inscribirse a talleres o charlas de la universidad.",
    icono: "bi-calendar-event",
    campos: [
      { id: "ev1", tipo: "titulo", texto: "Inscripcion al taller" },
      { id: "ev2", tipo: "texto", texto: "Registrate para participar en el taller de la universidad." },
      { id: "ev3", tipo: "input", subtipo: "text", etiqueta: "Nombre del estudiante", placeholder: "Ingresa tu nombre", requerido: true },
      { id: "ev4", tipo: "input", subtipo: "email", etiqueta: "Correo institucional", placeholder: "alumno@udb.edu.sv", requerido: true },
      { id: "ev5", tipo: "input", subtipo: "date", etiqueta: "Fecha de asistencia", requerido: true },
      { id: "ev6", tipo: "radio", etiqueta: "Modalidad", opciones: ["Presencial", "Virtual"], requerido: true },
      { id: "ev7", tipo: "submit", texto: "Inscribirse" }
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
      { id: "em3", tipo: "input", subtipo: "text", etiqueta: "Nombre completo", placeholder: "Ingresa tu nombre", requerido: true },
      { id: "em4", tipo: "input", subtipo: "email", etiqueta: "Correo Electronico", placeholder: "correo@ejemplo.com", requerido: true },
      { id: "em5", tipo: "select", etiqueta: "Puesto al que aplica", opciones: ["Programador Web", "Diseñador", "Soporte Tecnico"], requerido: true },
      { id: "em6", tipo: "input", subtipo: "number", etiqueta: "Años de experiencia", placeholder: "0", requerido: true },
      { id: "em7", tipo: "file", etiqueta: "Subir CV (PDF)", aceptar: ".pdf", requerido: true },
      { id: "em8", tipo: "submit", texto: "Enviar solicitud" }
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

// crear el html de cada campo segun el tipo que tenga (para la vista previa)
function crearCampoHTML(campo) {
  let requerido = campo.requerido ? "required" : "";
  let asterisco = campo.requerido ? ' <span class="text-danger">*</span>' : "";
  let html = "";

  if (campo.tipo === "titulo") {
    html = `<h3 class="titulo-formulario mb-2">${campo.texto}</h3>`;
  } else if (campo.tipo === "texto") {
    html = `<p class="text-secondary mb-3">${campo.texto}</p>`;
  } else if (campo.tipo === "input" || campo.tipo === "cuadroTexto") {
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
  } else if (campo.tipo === "textarea" || campo.tipo === "areaTexto") {
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
  } else if (campo.tipo === "select" || campo.tipo === "desplegable") {
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
  } else if (campo.tipo === "file" || campo.tipo === "archivo") {
    html = `
      <div class="mb-3">
        <label class="form-label">${campo.etiqueta}${asterisco}</label>
        <input type="file" class="form-control campo-personalizado" accept="${campo.aceptar || ""}" ${requerido}>
      </div>`;
  } else if (campo.tipo === "submit" || campo.tipo === "botonEnviar") {
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

// funcion auxiliar para selecionar un campo cargado de platilla y actualizar el panel de opciones
function seleccionarElementoDePlantilla(wrapper) {
  document.querySelectorAll(".elemento-form.seleccionado").forEach((elemento) => {
    elemento.classList.remove("seleccionado");
  });

  if (wrapper) {
    wrapper.classList.add("seleccionado");
    document.dispatchEvent(
      new CustomEvent("elementoSeleccionado", {
        detail: {
          wrapper,
          tipo: wrapper.dataset.tipo,
        },
      })
    );
  } else {
    document.dispatchEvent(
      new CustomEvent("elementoSeleccionado", {
        detail: { wrapper: null, tipo: null },
      })
    );
  }
}

// crear cada bloque editable dentro de #formGenerado usando la misma estructura de forms.js
function agregarCampoDePlantillaAlLienzo(campo) {
  const formGenerado = document.getElementById("formGenerado");
  const mensajeVacio = document.getElementById("mensajeVacio");
  if (!formGenerado) return;

  if (mensajeVacio) {
    mensajeVacio.style.display = "none";
  }

  const wrapper = document.createElement("div");
  wrapper.className = "col-12 p-2 position-relative elemento-form";
  wrapper.dataset.id = campo.id;
  wrapper.dataset.tipo = campo.tipo;

  const cajaInterna = document.createElement("div");
  cajaInterna.className = "p-3 border rounded bg-light h-100 position-relative";

  let requeridoAttr = campo.requerido ? "required" : "";
  let htmlContenido = "";

  if (campo.tipo === "titulo") {
    htmlContenido = `<h2 contenteditable="true" class="fw-bold mb-0">${campo.texto}</h2>`;
  } else if (campo.tipo === "texto") {
    htmlContenido = `<p contenteditable="true" class="text-secondary mb-0">${campo.texto}</p>`;
  } else if (campo.tipo === "input" || campo.tipo === "cuadroTexto") {
    htmlContenido = `
      <label class="form-label fw-semibold" contenteditable="true">${campo.etiqueta}</label>
      <input type="${campo.subtipo || "text"}" class="form-control" placeholder="${campo.placeholder || ""}" ${requeridoAttr} />
    `;
  } else if (campo.tipo === "textarea" || campo.tipo === "areaTexto") {
    htmlContenido = `
      <label class="form-label fw-semibold" contenteditable="true">${campo.etiqueta}</label>
      <textarea class="form-control" rows="${campo.filas || 3}" placeholder="${campo.placeholder || ""}" ${requeridoAttr}></textarea>
    `;
  } else if (campo.tipo === "select" || campo.tipo === "desplegable") {
    let opciones = "";
    campo.opciones.forEach((op) => {
      opciones += `<option>${op}</option>`;
    });
    htmlContenido = `
      <label class="form-label fw-semibold" contenteditable="true">${campo.etiqueta}</label>
      <select class="form-select" ${requeridoAttr}>${opciones}</select>
    `;
  } else if (campo.tipo === "radio") {
    let radios = "";
    campo.opciones.forEach((op, indice) => {
      let reqRadio = campo.requerido && indice === 0 ? "required" : "";
      radios += `
        <div class="form-check">
          <input class="form-check-input" type="radio" name="${campo.id}" ${reqRadio}>
          <label class="form-check-label" contenteditable="true">${op}</label>
        </div>`;
    });
    htmlContenido = `
      <label class="form-label fw-semibold d-block" contenteditable="true">${campo.etiqueta}</label>
      ${radios}
    `;
  } else if (campo.tipo === "file" || campo.tipo === "archivo") {
    htmlContenido = `
      <label class="form-label fw-semibold" contenteditable="true">${campo.etiqueta}</label>
      <input type="file" class="form-control" accept="${campo.aceptar || ""}" ${requeridoAttr} />
    `;
  } else if (campo.tipo === "submit" || campo.tipo === "botonEnviar") {
    htmlContenido = `
      <button type="submit" class="btn btn-primary w-100">${campo.texto}</button>
    `;
  }

  // misma barra de controles de ancho (100%, 50%, 33%) y boton eliminar que usa forms.js
  const barraControles = `
    <div class="position-absolute top-0 end-0 m-2 d-flex gap-1 align-items-center controles-elemento" style="z-index: 10;">
      <div class="btn-group btn-group-sm" role="group" aria-label="Ancho del elemento">
        <button type="button" class="btn btn-secondary btn-ancho active" data-col="col-12">100%</button>
        <button type="button" class="btn btn-outline-secondary btn-ancho" data-col="col-md-6">50%</button>
        <button type="button" class="btn btn-outline-secondary btn-ancho" data-col="col-md-4">33%</button>
      </div>
      <button type="button" class="btn btn-danger btn-sm btn-eliminar" aria-label="Eliminar elemento" title="Eliminar">&times;</button>
    </div>
  `;

  cajaInterna.innerHTML = htmlContenido + barraControles;
  wrapper.appendChild(cajaInterna);
  formGenerado.appendChild(wrapper);

  // selecionar el elemento al hacer clic sobre el para mostar sus opciones
  wrapper.addEventListener("click", (e) => {
    if (e.target.closest(".controles-elemento")) return;
    seleccionarElementoDePlantilla(wrapper);
  });

  // eventos para cambiar el ancho del campo
  wrapper.querySelectorAll(".btn-ancho").forEach((boton) => {
    boton.addEventListener("click", (e) => {
      e.stopPropagation();

      const nuevaCol = boton.dataset.col;
      wrapper.classList.remove("col-12", "col-md-6", "col-md-4");
      wrapper.classList.add(nuevaCol);

      wrapper.querySelectorAll(".btn-ancho").forEach((b) => {
        b.classList.remove("active", "btn-secondary");
        b.classList.add("btn-outline-secondary");
      });
      boton.classList.add("active", "btn-secondary");
      boton.classList.remove("btn-outline-secondary");
      seleccionarElementoDePlantilla(wrapper);
    });
  });

  // evento para eliminar el campo
  wrapper.querySelector(".btn-eliminar").addEventListener("click", (e) => {
    e.stopPropagation();

    const estabaSeleccionado = wrapper.classList.contains("seleccionado");
    wrapper.remove();

    if (formGenerado.children.length === 0 && mensajeVacio) {
      mensajeVacio.style.display = "block";
    }

    if (estabaSeleccionado) seleccionarElementoDePlantilla(null);
  });
}

// cargar la platilla selecionada dentro de CrearForms.html
function iniciarAreaTrabajo() {
  const barraPlantillas = document.getElementById("barraPlantillas");
  if (!barraPlantillas) return;

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

  barraPlantillas.innerHTML = `
    <div class="d-flex flex-wrap align-items-center justify-content-between gap-2 bg-secondary-subtle rounded-4 p-3">
      <div class="d-flex align-items-center gap-2">
        <label for="selectorPlantilla" class="fw-bold small titulo-formulario mb-0">Plantilla predeterminada:</label>
        <select id="selectorPlantilla" class="form-select form-select-sm w-auto" onchange="cambiarPlantilla(this.value)">
          ${opcionesSelect}
        </select>
      </div>
      <div class="d-flex gap-2">
        <button type="button" class="btn btn-sm btn-outline-secondary" onclick="limpiarAreaTrabajo()">
          Limpiar lienzo
        </button>
      </div>
    </div>`;

  if (window.plantillaActual) {
    cargarCamposEnLienzo(window.plantillaActual);
  }
}

// pintar los campos de la platilla dentro de #formGenerado
function cargarCamposEnLienzo(plantilla) {
  const formGenerado = document.getElementById("formGenerado");
  const mensajeVacio = document.getElementById("mensajeVacio");
  if (!formGenerado) return;

  formGenerado.innerHTML = "";
  seleccionarElementoDePlantilla(null);

  if (!plantilla) {
    if (mensajeVacio) mensajeVacio.style.display = "block";
    return;
  }

  plantilla.campos.forEach((campo) => {
    agregarCampoDePlantillaAlLienzo(campo);
  });

  // selecionar el primer elemento de la platilla para que ya aparesca en opciones
  const primerElemento = formGenerado.querySelector(".elemento-form");
  if (primerElemento) {
    seleccionarElementoDePlantilla(primerElemento);
  }
}

// cambiar de platilla desde el select en CrearForms
function cambiarPlantilla(idFormulario) {
  window.plantillaActual = listaFormularios.find((f) => f.id === idFormulario) || null;
  if (window.plantillaActual) {
    localStorage.setItem("plantillaSeleccionada", JSON.stringify(window.plantillaActual));
  } else {
    localStorage.removeItem("plantillaSeleccionada");
  }
  cargarCamposEnLienzo(window.plantillaActual);
}

// limpiar el fomulario cargado en el area de trabajo
function limpiarAreaTrabajo() {
  window.plantillaActual = null;
  const selector = document.getElementById("selectorPlantilla");
  if (selector) selector.value = "";
  localStorage.removeItem("plantillaSeleccionada");
  cargarCamposEnLienzo(null);
}

// =========================================================
// PANEL DE OPCIONES DE LAS HERAMIENTAS Y CARGA INICIAL
// =========================================================

document.addEventListener("DOMContentLoaded", async () => {
  // configurar primero las pestanas de heramientas y opciones si existen en la pagina
  const tabHerramientas = document.getElementById("tabHerramientas");
  const tabOpciones = document.getElementById("tabOpciones");
  const panelHerramientas = document.getElementById("panelHerramientas");
  const panelOpciones = document.getElementById("panelOpciones");
  const contenidoOpciones = document.getElementById("contenidoOpciones");
  const mensajeOpciones = document.getElementById("mensajeOpciones");

  let elementoSeleccionado = null;

  if (
    tabHerramientas &&
    tabOpciones &&
    panelHerramientas &&
    panelOpciones &&
    contenidoOpciones
  ) {
    function mostrarPestana(nombre) {
      const verHerramientas = nombre === "herramientas";

      panelHerramientas.hidden = !verHerramientas;
      panelOpciones.hidden = verHerramientas;

      tabHerramientas.classList.toggle("btn-pestana-activa", verHerramientas);
      tabHerramientas.classList.toggle("text-white", verHerramientas);
      tabHerramientas.classList.toggle("text-dark", !verHerramientas);
      tabHerramientas.classList.toggle("fw-bold", verHerramientas);
      tabHerramientas.classList.toggle("bg-secondary-subtle", !verHerramientas);

      tabOpciones.classList.toggle("btn-pestana-activa", !verHerramientas);
      tabOpciones.classList.toggle("text-white", !verHerramientas);
      tabOpciones.classList.toggle("text-dark", verHerramientas);
      tabOpciones.classList.toggle("fw-bold", !verHerramientas);
      tabOpciones.classList.toggle("bg-secondary-subtle", verHerramientas);
    }

    tabHerramientas.addEventListener("click", () => mostrarPestana("herramientas"));
    tabOpciones.addEventListener("click", () => mostrarPestana("opciones"));

    function escaparHTML(valor) {
      return String(valor ?? "").replace(/[&<>"']/g, (caracter) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[caracter]);
    }

    function normalizarColor(color, respaldo = "#212529") {
      if (!color) return respaldo;

      const colorLimpio = String(color).trim();

      const rgb = colorLimpio.match(
        /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i
      );

      if (rgb) {
        return (
          "#" +
          rgb
            .slice(1, 4)
            .map((valor) => Number(valor).toString(16).padStart(2, "0"))
            .join("")
        );
      }

      if (/^#[0-9a-f]{6}$/i.test(colorLimpio)) {
        return colorLimpio;
      }

      if (/^#[0-9a-f]{3}$/i.test(colorLimpio)) {
        return (
          "#" +
          colorLimpio
            .slice(1)
            .split("")
            .map((letra) => letra + letra)
            .join("")
        );
      }

      return respaldo;
    }

    function obtenerContenido(wrapper, tipo) {
      if (tipo === "titulo") return wrapper.querySelector("h2");
      if (tipo === "texto") return wrapper.querySelector("p");
      if (tipo === "submit") return wrapper.querySelector('button[type="submit"]');
      if (tipo === "grid_dinamico") {
        return wrapper.querySelector(".panel-grid-config");
      }

      return wrapper.querySelector(".form-label");
    }

    // determina que elemento debe resibir los cambios de apariencia
    function obtenerElementoApariencia(wrapper, tipo) {
      if (tipo === "titulo") return wrapper.querySelector("h2");
      if (tipo === "texto") return wrapper.querySelector("p");
      if (tipo === "submit") {
        return wrapper.querySelector('button[type="submit"]');
      }
      if (tipo === "input") {
        return wrapper.querySelector("input:not([type='radio'])");
      }
      if (tipo === "textarea") {
        return wrapper.querySelector("textarea");
      }
      if (tipo === "select") {
        return wrapper.querySelector("select");
      }
      if (tipo === "radio") {
        return wrapper.querySelector(".form-check-label");
      }
      if (tipo === "file") {
        return wrapper.querySelector('input[type="file"]');
      }

      return obtenerContenido(wrapper, tipo);
    }

    function crearCampo(etiqueta, propiedad, valor, tipo = "text", extra = "") {
      return `
        <div class="mb-3">
          <label class="form-label small fw-semibold">${etiqueta}</label>
          <input class="form-control form-control-sm" type="${tipo}"
            data-prop="${propiedad}" value="${escaparHTML(valor)}" ${extra}>
        </div>`;
    }

    function crearCasilla(etiqueta, propiedad, marcada) {
      return `
        <div class="form-check mb-3">
          <input class="form-check-input" type="checkbox"
            id="opcion-${propiedad}" data-prop="${propiedad}"
            ${marcada ? "checked" : ""}>
          <label class="form-check-label small" for="opcion-${propiedad}">
            ${etiqueta}
          </label>
        </div>`;
    }

    function crearSelect(etiqueta, propiedad, opciones, seleccionado) {
      return `
        <div class="mb-3">
          <label class="form-label small fw-semibold">${etiqueta}</label>
          <select class="form-select form-select-sm" data-prop="${propiedad}">
            ${opciones.map((opcion) => `
              <option value="${opcion.valor}"
                ${opcion.valor === seleccionado ? "selected" : ""}>
                ${opcion.texto}
              </option>`).join("")}
          </select>
        </div>`;
    }

    function obtenerEtiqueta(wrapper) {
      return wrapper.querySelector(".form-label");
    }

    function obtenerCampo(wrapper) {
      return wrapper.querySelector(
        "input:not([type='radio']), textarea, select"
      );
    }

    function obtenerOpciones(wrapper, tipo) {
      if (tipo === "select") {
        return Array.from(wrapper.querySelectorAll("select option"))
          .map((opcion) => opcion.textContent.trim())
          .join("\n");
      }

      if (tipo === "radio") {
        return Array.from(wrapper.querySelectorAll(".form-check-label"))
          .map((etiqueta) => etiqueta.textContent.trim())
          .join("\n");
      }

      return "";
    }

    function renderizarOpciones(wrapper, tipo) {
      elementoSeleccionado = wrapper;
      contenidoOpciones.innerHTML = "";

      if (!wrapper) {
        mensajeOpciones.hidden = false;
        mensajeOpciones.textContent =
          "Selecciona un elemento del formulario para configurar sus propiedades.";
        return;
      }

      mensajeOpciones.hidden = true;

      const contenido = obtenerContenido(wrapper, tipo);
      const etiqueta = obtenerEtiqueta(wrapper);
      const campo = obtenerCampo(wrapper);
      const elementoApariencia = obtenerElementoApariencia(wrapper, tipo);

      let html = `
        <p class="small text-secondary">
          Tipo de elemento: <strong>${escaparHTML(tipo)}</strong>
        </p>`;

      if (tipo === "titulo" || tipo === "texto") {
        html += crearCampo(
          "Texto",
          "texto",
          contenido?.innerText.trim() || ""
        );
      }

      if (
        etiqueta &&
        !["titulo", "texto", "submit", "grid_dinamico"].includes(tipo)
      ) {
        html += crearCampo(
          "Etiqueta",
          "etiqueta",
          etiqueta.innerText.trim()
        );
      }

      if (tipo === "input") {
        const input = wrapper.querySelector("input:not([type='radio'])");

        html += crearSelect("Tipo de campo", "tipoCampo", [
          { valor: "text", texto: "Texto" },
          { valor: "email", texto: "Correo electrónico" },
          { valor: "number", texto: "Número" },
          { valor: "tel", texto: "Teléfono" },
          { valor: "date", texto: "Fecha" },
          { valor: "password", texto: "Contraseña" },
        ], input?.type || "text");

        html += crearCampo(
          "Texto de ejemplo",
          "placeholder",
          input?.placeholder || ""
        );

        html += crearCasilla(
          "Campo obligatorio",
          "obligatorio",
          !!input?.required
        );
      }

      if (tipo === "textarea") {
        html += crearCampo(
          "Texto de ejemplo",
          "placeholder",
          campo?.placeholder || ""
        );

        html += crearCampo(
          "Número de filas",
          "filas",
          campo?.rows || 3,
          "number",
          'min="1" max="15"'
        );

        html += crearCasilla(
          "Campo obligatorio",
          "obligatorio",
          !!campo?.required
        );
      }

      if (tipo === "select" || tipo === "radio") {
        html += `
          <div class="mb-3">
            <label class="form-label small fw-semibold">
              Opciones (una por línea)
            </label>
            <textarea class="form-control form-control-sm" rows="4"
              data-prop="opciones">${escaparHTML(
                obtenerOpciones(wrapper, tipo)
              )}</textarea>
          </div>`;

        html += crearCasilla(
          "Selección obligatoria",
          "obligatorio",
          !!wrapper.querySelector(
            tipo === "select" ? "select" : 'input[type="radio"]'
          )?.required
        );
      }

      if (tipo === "file") {
        const inputArchivo = wrapper.querySelector('input[type="file"]');

        html += crearCampo(
          "Tipos permitidos (ej. .pdf,.png)",
          "accept",
          inputArchivo?.accept || ""
        );

        html += crearCasilla(
          "Archivo obligatorio",
          "obligatorio",
          !!inputArchivo?.required
        );
      }

      if (tipo === "submit") {
        html += crearCampo(
          "Texto del botón",
          "textoBoton",
          contenido?.textContent.trim() || ""
        );
      }

      if (tipo === "grid_dinamico") {
        html += `
          <p class="small text-secondary">
            Puedes definir filas y columnas en el elemento y pulsar «Generar Grid».
          </p>`;
      }

      // opciones de apariencia
      html += `
        <hr>
        <h6 class="fw-bold mb-3">Apariencia</h6>`;

      // la alineacion solo aparece para titulos y parrafos
      if (tipo === "titulo" || tipo === "texto") {
        html += crearSelect(
          "Alineación",
          "alineacion",
          [
            { valor: "left", texto: "Izquierda" },
            { valor: "center", texto: "Centro" },
            { valor: "right", texto: "Derecha" },
          ],
          contenido?.style.textAlign || "left"
        );
      }

      // el tamano y color se aplican al elemento visual corespondiente
      if (elementoApariencia) {
        html += crearCampo(
          "Tamaño de letra (px)",
          "tamanoLetra",
          parseInt(getComputedStyle(elementoApariencia).fontSize, 10) || 16,
          "number",
          'min="8" max="72"'
        );

        html += crearCampo(
          "Color del texto",
          "colorTexto",
          normalizarColor(
            getComputedStyle(elementoApariencia).color,
            "#212529"
          ),
          "color"
        );
      }

      contenidoOpciones.innerHTML = html;
    }

    function aplicarOpciones(propiedad, control) {
      const wrapper = elementoSeleccionado;
      if (!wrapper) return;

      const tipo = wrapper.dataset.tipo;
      const valor =
        control.type === "checkbox" ? control.checked : control.value;

      const contenido = obtenerContenido(wrapper, tipo);
      const etiqueta = obtenerEtiqueta(wrapper);
      const campo = obtenerCampo(wrapper);
      const elementoApariencia = obtenerElementoApariencia(wrapper, tipo);

      switch (propiedad) {
        case "texto":
          if (contenido) contenido.innerText = valor;
          break;

        case "etiqueta":
          if (etiqueta) etiqueta.innerText = valor;
          break;

        case "placeholder":
          if (campo) campo.placeholder = valor;
          break;

        case "tipoCampo": {
          const input = wrapper.querySelector("input:not([type='radio'])");

          if (
            input &&
            ["text", "email", "number", "tel", "date", "password"].includes(valor)
          ) {
            input.type = valor;
          }
          break;
        }

        case "filas":
          if (campo) {
            campo.rows = Math.min(15, Math.max(1, Number(valor) || 1));
          }
          break;

        case "obligatorio":
          if (tipo === "radio") {
            wrapper.querySelectorAll('input[type="radio"]').forEach(
              (radio, indice) => {
                radio.required = valor && indice === 0;
              }
            );
          } else if (campo) {
            campo.required = valor;
          }
          break;

        case "opciones": {
          const lineas = valor
            .split("\n")
            .map((linea) => linea.trim())
            .filter(Boolean);

          if (tipo === "select") {
            const select = wrapper.querySelector("select");

            if (select) {
              const valorAnterior = select.value;
              select.innerHTML = "";

              lineas.forEach((linea) => {
                const option = document.createElement("option");
                option.textContent = linea;
                select.appendChild(option);
              });

              if (
                Array.from(select.options).some(
                  (opcion) => opcion.value === valorAnterior
                )
              ) {
                select.value = valorAnterior;
              }
            }
          }

          if (tipo === "radio") {
            const grupo = wrapper.querySelector(".form-check")?.parentElement;

            if (grupo) {
              const primerRadio = wrapper.querySelector('input[type="radio"]');
              const esObligatorio = !!primerRadio?.required;

              wrapper.querySelectorAll(".form-check").forEach((elemento) => {
                elemento.remove();
              });

              lineas.forEach((linea, indice) => {
                const div = document.createElement("div");
                div.className = "form-check";

                const radio = document.createElement("input");
                radio.className = "form-check-input";
                radio.type = "radio";
                radio.name = wrapper.dataset.id;
                radio.id = `${wrapper.dataset.id}_opcion_${indice}`;
                radio.required = esObligatorio && indice === 0;

                const label = document.createElement("label");
                label.className = "form-check-label";
                label.contentEditable = "true";
                label.htmlFor = radio.id;
                label.textContent = linea;

                div.append(radio, label);
                grupo.appendChild(div);
              });
            }
          }
          break;
        }

        case "accept": {
          const archivo = wrapper.querySelector('input[type="file"]');
          if (archivo) archivo.accept = valor;
          break;
        }

        case "textoBoton":
          if (contenido) contenido.textContent = valor;
          break;

        case "alineacion":
          if (contenido && ["titulo", "texto"].includes(tipo)) {
            contenido.style.setProperty("text-align", valor, "important");
          }
          break;

        case "tamanoLetra":
          if (elementoApariencia) {
            const tamano = Math.min(72, Math.max(8, Number(valor) || 16));

            elementoApariencia.style.setProperty(
              "font-size",
              `${tamano}px`,
              "important"
            );

            // en los radios aplicar el tamano a todas las opciones
            if (tipo === "radio") {
              wrapper.querySelectorAll(".form-check-label").forEach((label) => {
                label.style.setProperty("font-size", `${tamano}px`, "important");
              });
            }
          }
          break;

        case "colorTexto":
          if (elementoApariencia) {
            elementoApariencia.style.setProperty("color", valor, "important");

            // aplicar el color a todas las opciones del grupo de radios
            if (tipo === "radio") {
              wrapper.querySelectorAll(".form-check-label").forEach((label) => {
                label.style.setProperty("color", valor, "important");
              });
            }
          }
          break;
      }
    }

    contenidoOpciones.addEventListener("input", (e) => {
      const control = e.target.closest("[data-prop]");
      if (control) aplicarOpciones(control.dataset.prop, control);
    });

    contenidoOpciones.addEventListener("change", (e) => {
      const control = e.target.closest("[data-prop]");
      if (control) aplicarOpciones(control.dataset.prop, control);
    });

    document.addEventListener("elementoSeleccionado", (e) => {
      const detalle = e.detail || {};
      renderizarOpciones(detalle.wrapper, detalle.tipo);
    });

    mostrarPestana("herramientas");
  }

  // cargar los datos del json de fomularios predeteminados
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
  if (document.getElementById("barraPlantillas")) {
    iniciarAreaTrabajo();
  }
});
