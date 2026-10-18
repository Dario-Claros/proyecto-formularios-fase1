document.addEventListener("DOMContentLoaded", () => {
  const contenedorHerramientas = document.getElementById("contenedorHerramientas");
  const formGenerado = document.getElementById("formGenerado");
  const mensajeVacio = document.getElementById("mensajeVacio");

  if (!contenedorHerramientas || !formGenerado) {
    console.error("No se encontraron los elementos necesarios en CrearForms.html.");
    return;
  }

  let contadorElementos = 0;

  // funcion para selecionar un elemento y mandar el evento a las opciones
  function seleccionarElemento(wrapper) {
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
        }),
      );
    } else {
      document.dispatchEvent(
        new CustomEvent("elementoSeleccionado", {
          detail: { wrapper: null, tipo: null },
        }),
      );
    }
  }

  contenedorHerramientas.addEventListener("click", (e) => {
    const boton = e.target.closest(".btn-herramienta");
    if (!boton) return;

    const tipo = boton.dataset.type;
    if (tipo) agregarElemento(tipo);
  });

  // =========================================================
  // VALIDAR Y PROSESAR EL ENVIO DEL FOMULARIO
  // =========================================================

  formGenerado.addEventListener("submit", (e) => {
    e.preventDefault();

    // limpiar mensajes de envios anteriores
    formGenerado.querySelectorAll(".mensaje-error-envio").forEach((mensaje) => {
      mensaje.remove();
    });

    formGenerado.querySelectorAll(".is-invalid").forEach((campo) => {
      campo.classList.remove("is-invalid");
    });

    // evitar que la confirmacion se duplique
    const confirmacionAnterior = formGenerado.querySelector(
      ".mensaje-confirmacion-envio"
    );

    if (confirmacionAnterior) {
      confirmacionAnterior.remove();
    }

    let formularioValido = true;
    let primerCampoInvalido = null;

    // validar los campos que esten marcados como obligatorios
    const campos = formGenerado.querySelectorAll(
      "input, textarea, select"
    );

    campos.forEach((campo) => {
      // ignorar controles internos del editor
      if (
        campo.closest(".controles-elemento") ||
        campo.matches(".input-filas, .input-cols") ||
        campo.type === "button" ||
        campo.type === "submit" ||
        campo.type === "reset"
      ) {
        return;
      }

      // solo validar los campos obligatorios
      if (campo.required && !campo.checkValidity()) {
        formularioValido = false;
        campo.classList.add("is-invalid");

        if (!primerCampoInvalido) {
          primerCampoInvalido = campo;
        }

        const mensaje = document.createElement("div");
        mensaje.className = "mensaje-error-envio text-danger small mt-1";
        mensaje.textContent = campo.validity.valueMissing
          ? "Este campo es obligatorio."
          : "Revisa el formato de este campo.";

        campo.insertAdjacentElement("afterend", mensaje);
      }
    });

    // validar tambien formatos por ejemplo correo electronico
    const camposConFormatoInvalido = Array.from(campos).filter((campo) => {
      if (
        campo.closest(".controles-elemento") ||
        campo.matches(".input-filas, .input-cols") ||
        campo.type === "button" ||
        campo.type === "submit" ||
        campo.type === "reset"
      ) {
        return false;
      }

      return !campo.checkValidity();
    });

    if (camposConFormatoInvalido.length > 0) {
      formularioValido = false;

      camposConFormatoInvalido.forEach((campo) => {
        campo.classList.add("is-invalid");

        if (!primerCampoInvalido) {
          primerCampoInvalido = campo;
        }
      });
    }

    // si hay errores no continuar con el envio
    if (!formularioValido) {
      alert("Revisa los campos marcados antes de enviar.");

      if (primerCampoInvalido) {
        primerCampoInvalido.focus();
      }

      return;
    }

    // recopilar las respuestas de los elementos del fomulario
    const respuestas = {};

    formGenerado.querySelectorAll(".elemento-form").forEach((wrapper) => {
      const tipo = wrapper.dataset.tipo;

      // el boton de envio y los textos no son preguntas que deban guardarse
      if (tipo === "submit" || tipo === "titulo" || tipo === "texto") {
        return;
      }

      const etiqueta = wrapper.querySelector(
        "label.form-label, .form-check-label"
      );

      const nombreCampo = etiqueta
        ? etiqueta.textContent.trim()
        : tipo;

      const valores = [];

      wrapper.querySelectorAll("input, textarea, select").forEach((campo) => {
        // ignorar controles internos de la cuadricula
        if (
          campo.closest(".controles-elemento") ||
          campo.matches(".input-filas, .input-cols") ||
          campo.type === "button" ||
          campo.type === "submit" ||
          campo.type === "reset"
        ) {
          return;
        }

        if (campo.type === "radio") {
          if (campo.checked) {
            const etiquetaRadio = campo
              .closest(".form-check")
              ?.querySelector(".form-check-label");

            valores.push(
              etiquetaRadio?.textContent.trim() || campo.value
            );
          }
        } else if (campo.type === "checkbox") {
          if (campo.checked) {
            valores.push(campo.value);
          }
        } else if (campo.type === "file") {
          if (campo.files && campo.files.length > 0) {
            valores.push(
              ...Array.from(campo.files).map((archivo) => archivo.name)
            );
          }
        } else {
          valores.push(campo.value.trim());
        }
      });

      if (valores.length > 0) {
        respuestas[nombreCampo] =
          valores.length === 1 ? valores[0] : valores;
      }
    });

    // mostar las respuestas en la consola para comprobarlas
    console.log("Respuestas del formulario:", respuestas);

    // mostar confirmacion al usuario
    const confirmacion = document.createElement("div");
    confirmacion.className =
      "alert alert-success mt-3 mensaje-confirmacion-envio";
    confirmacion.setAttribute("role", "status");
    confirmacion.textContent = "¡Formulario enviado correctamente!";

    formGenerado.appendChild(confirmacion);

    // evitar que se vuelva a enviar por accidente
    const botonEnviar = e.submitter;

    if (botonEnviar) {
      botonEnviar.disabled = true;
    }
  });

  // =========================================================
  // FIN DE LA FUNCIONALIDAD DE ENVIO
  // =========================================================

  function agregarElemento(tipo) {
    const idUnico = `campo_${Date.now()}_${++contadorElementos}`;

    let htmlContenido = "";

    switch (tipo) {
      case "titulo":
        htmlContenido = `
          <h2 contenteditable="true" class="fw-bold mb-0">
            Título de la sección
          </h2>`;
        break;

      case "texto":
        htmlContenido = `
          <p contenteditable="true" class="text-secondary mb-0">
            Escribe aquí una descripción...
          </p>`;
        break;

      case "input":
        htmlContenido = `
          <label class="form-label fw-semibold" contenteditable="true">
            Nombre del Campo
          </label>
          <input type="text" class="form-control" placeholder="Ingrese texto...">`;
        break;

      case "textarea":
        htmlContenido = `
          <label class="form-label fw-semibold" contenteditable="true">
            Comentarios / Mensaje
          </label>
          <textarea class="form-control" rows="3" placeholder="Escriba aquí..."></textarea>`;
        break;

      case "select":
        htmlContenido = `
          <label class="form-label fw-semibold" contenteditable="true">
            Seleccione una opción
          </label>
          <select class="form-select">
            <option>Opción 1</option>
            <option>Opción 2</option>
          </select>`;
        break;

      case "radio":
        htmlContenido = `
          <label class="form-label fw-semibold d-block" contenteditable="true">
            Seleccione una opción
          </label>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="${idUnico}">
            <label class="form-check-label" contenteditable="true">Opción A</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="${idUnico}">
            <label class="form-check-label" contenteditable="true">Opción B</label>
          </div>`;
        break;

      case "file":
        htmlContenido = `
          <label class="form-label fw-semibold" contenteditable="true">
            Adjuntar documento
          </label>
          <input type="file" class="form-control">`;
        break;

      case "submit":
        htmlContenido = `
          <button type="submit" class="btn btn-primary w-100">
            Enviar Formulario
          </button>`;
        break;

      case "grid_dinamico":
        htmlContenido = `
          <div class="panel-grid-config p-3 border rounded bg-white">
            <h6 class="fw-bold mb-3 text-primary">Configurar Cuadrícula Dinámica</h6>
            <div class="row g-2 align-items-end mb-3">
              <div class="col-6 col-sm-4">
                <label class="form-label small fw-semibold">Filas:</label>
                <input type="number" class="form-control form-control-sm input-filas"
                  min="1" max="5" value="2">
              </div>
              <div class="col-6 col-sm-4">
                <label class="form-label small fw-semibold">Columnas por fila:</label>
                <input type="number" class="form-control form-control-sm input-cols"
                  min="1" max="4" value="2">
              </div>
              <div class="col-12 col-sm-4">
                <button type="button" class="btn btn-sm btn-primary w-100 btn-generar-grid">
                  Generar Grid
                </button>
              </div>
            </div>
            <div class="contenedor-grid-resultado mt-2"></div>
          </div>`;
        break;

      default:
        console.warn("Tipo de elemento desconocido:", tipo);
        return;
    }

    if (mensajeVacio) mensajeVacio.style.display = "none";

    const wrapper = document.createElement("div");
    wrapper.className = "col-12 p-2 position-relative elemento-form";
    wrapper.dataset.id = idUnico;
    wrapper.dataset.tipo = tipo;

    const cajaInterna = document.createElement("div");
    cajaInterna.className = "p-3 border rounded bg-light h-100 position-relative";

    const barraControles = `
      <div class="position-absolute top-0 end-0 m-2 d-flex gap-1 align-items-center controles-elemento"
           style="z-index:10;">
        ${
          tipo !== "grid_dinamico"
            ? `<div class="btn-group btn-group-sm" role="group" aria-label="Ancho del elemento">
                 <button type="button" class="btn btn-secondary btn-ancho active" data-col="col-12">100%</button>
                 <button type="button" class="btn btn-outline-secondary btn-ancho" data-col="col-md-6">50%</button>
                 <button type="button" class="btn btn-outline-secondary btn-ancho" data-col="col-md-4">33%</button>
               </div>`
            : ""
        }
        <button type="button" class="btn btn-danger btn-sm btn-eliminar"
                aria-label="Eliminar elemento" title="Eliminar">&times;</button>
      </div>`;

    cajaInterna.innerHTML = htmlContenido + barraControles;
    wrapper.appendChild(cajaInterna);
    formGenerado.appendChild(wrapper);

    // selecionar el elemento al hacer clic sobre el
    wrapper.addEventListener("click", (e) => {
      if (e.target.closest(".controles-elemento")) return;
      seleccionarElemento(wrapper);
    });

    // cambiar ancho
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
        seleccionarElemento(wrapper);
      });
    });

    // generar cuadricula
    if (tipo === "grid_dinamico") {
      wrapper.querySelector(".btn-generar-grid").addEventListener("click", (e) => {
        e.stopPropagation();

        const filas = Math.min(5, Math.max(1,
          parseInt(wrapper.querySelector(".input-filas").value, 10) || 1));
        const columnas = Math.min(4, Math.max(1,
          parseInt(wrapper.querySelector(".input-cols").value, 10) || 1));

        const resultado = wrapper.querySelector(".contenedor-grid-resultado");
        resultado.innerHTML = "";

        for (let f = 0; f < filas; f++) {
          const fila = document.createElement("div");
          fila.className = "row g-2 mb-2";

          for (let c = 0; c < columnas; c++) {
            const columna = document.createElement("div");
            columna.className = `col-12 col-md-${12 / columnas}`;

            const caja = document.createElement("div");
            caja.className = "p-2 border rounded bg-light";

            const etiqueta = document.createElement("label");
            etiqueta.className = "form-label small fw-semibold";
            etiqueta.contentEditable = "true";
            etiqueta.textContent = `Fila ${f + 1} - Campo ${c + 1}`;

            const input = document.createElement("input");
            input.type = "text";
            input.className = "form-control form-control-sm";
            input.placeholder = "Ingrese dato...";

            caja.append(etiqueta, input);
            columna.appendChild(caja);
            fila.appendChild(columna);
          }

          resultado.appendChild(fila);
        }
      });
    }

    // eliminar elemento
    wrapper.querySelector(".btn-eliminar").addEventListener("click", (e) => {
      e.stopPropagation();

      const estabaSeleccionado = wrapper.classList.contains("seleccionado");
      wrapper.remove();

      if (formGenerado.children.length === 0 && mensajeVacio) {
        mensajeVacio.style.display = "block";
      }

      if (estabaSeleccionado) seleccionarElemento(null);
    });

    seleccionarElemento(wrapper);
  }
});
