document.addEventListener("DOMContentLoaded", () => {
  const contenedorHerramientas = document.getElementById(
    "contenedorHerramientas",
  );
  const formGenerado = document.getElementById("formGenerado");
  const mensajeVacio = document.getElementById("mensajeVacio");

  // Detectamos a que boton de la seccion de la seccion de herramientas se le da click y luego se identifica de que tipo es el
  //componente para asi enviarlo a analizar al switch 
  contenedorHerramientas.addEventListener("click", (e) => {
    const boton = e.target.closest(".btn-herramienta");
    if (boton) {
      const tipo = boton.getAttribute("data-type");
      if (tipo) {
        agregarElemento(tipo);
      }
    }
  });

  // Función principal para agregar y estructurar componentes
  function agregarElemento(tipo) {
    if (mensajeVacio) {
      mensajeVacio.style.display = "none";
    }

    const idUnico = "campo_" + Date.now();

    // Contenedor dinámico principal con clases del Grid de Bootstrap
    const wrapper = document.createElement("div");
    wrapper.className = "col-12 p-2 position-relative elemento-form";
    wrapper.dataset.id = idUnico;

    // Caja interna donde se pinta el componente
    const cajaInterna = document.createElement("div");
    cajaInterna.className =
      "p-3 border rounded bg-light h-100 position-relative";

    let htmlContenido = "";
// Analizamos a que boton en la parte de herramientas se le dio click y en base a eso se analiza en un switch para 
// que dependiendo del caso pintamos o creamos una estructura diferente en la caja Interna que es la secccion de trabajo
    switch (tipo) {
      case "titulo":
        htmlContenido = `<h2 contenteditable="true" class="fw-bold mb-0">Título de la sección</h2>`;
        break;

      case "texto":
        htmlContenido = `<p contenteditable="true" class="text-secondary mb-0">Escribe aquí una descripción...</p>`;
        break;

      case "input":
        htmlContenido = `
          <label class="form-label fw-semibold" contenteditable="true">Nombre del Campo</label>
          <input type="text" class="form-control" placeholder="Ingrese texto..." />
        `;
        break;

      case "textarea":
        htmlContenido = `
          <label class="form-label fw-semibold" contenteditable="true">Comentarios / Mensaje</label>
          <textarea class="form-control" rows="3" placeholder="Escriba aquí..."></textarea>
        `;
        break;

      case "select":
        htmlContenido = `
          <label class="form-label fw-semibold" contenteditable="true">Seleccione una opción</label>
          <select class="form-select">
            <option>Opción 1</option>
            <option>Opción 2</option>
          </select>
        `;
        break;

      case "radio":
        htmlContenido = `
          <label class="form-label fw-semibold d-block" contenteditable="true">Seleccione una opción</label>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="${idUnico}">
            <label class="form-check-label" contenteditable="true">Opción A</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="${idUnico}">
            <label class="form-check-label" contenteditable="true">Opción B</label>
          </div>
        `;
        break;

      case "file":
        htmlContenido = `
          <label class="form-label fw-semibold" contenteditable="true">Adjuntar documento</label>
          <input type="file" class="form-control" />
        `;
        break;

      case "submit":
        htmlContenido = `
          <button type="submit" class="btn btn-primary w-100 h-10">Enviar Formulario</button>
        `;
        break;
//En este caso del switch creamos como una estructura donde se puede definir las filas y las columnas que el usuarios desee para su formulario
      case "grid_dinamico":
        htmlContenido = `
          <div class="panel-grid-config p-3 border border-secondary border-dashed rounded bg-white">
            <h6 class="fw-bold mb-3 text-primary">Configurar Cuadrícula Dinámica</h6>
            <div class="row g-2 align-items-center mb-3">
              <div class="col-6 col-sm-4">
                <label class="form-label small fw-semibold mb-1">Filas:</label>
                <input type="number" class="form-control form-control-sm input-filas" min="1" max="5" value="2">
              </div>
              <div class="col-6 col-sm-4">
                <label class="form-label small fw-semibold mb-1">Columnas por fila:</label>
                <input type="number" class="form-control form-control-sm input-cols" min="1" max="4" value="2">
              </div>
              <div class="col-12 col-sm-4 d-flex align-items-end">
                <button type="button" class="btn btn-sm btn-primary w-100 btn-generar-grid">
                  Generar Grid
                </button>
              </div>
            </div>
            <div class="contenedor-grid-resultado mt-2"></div>
          </div>
        `;
        break;

      default:
        return;
    }

    // Barra de herramientas flotante (Controles de tamaño + Botón eliminar)
    const barraControles = `
      <div class="position-absolute top-0 end-0 m-2 d-flex gap-1 align-items-center controles-elemento" style="z-index: 10;">
        ${
          tipo !== "grid_dinamico"
            ? `
          <div class="btn-group btn-group-sm" role="group" aria-label="Ancho de columna">
            <button type="button" class="btn btn-outline-secondary btn-ancho active btn-secondary" data-col="col-12" title="Fila completa (100%)">100%</button>
            <button type="button" class="btn btn-outline-secondary btn-ancho" data-col="col-md-6" title="Media fila (50%)">50%</button>
            <button type="button" class="btn btn-outline-secondary btn-ancho" data-col="col-md-4" title="Tercio de fila (33%)">33%</button>
          </div>
        `
            : ""
        }
        <button type="button" class="btn btn-danger btn-sm btn-eliminar" aria-label="Eliminar">&times;</button>
      </div>
    `;
    //Cargamos en la caja interna el componente seleccionado y una pequeña barra de controles para modificar el tamaño del componente
    cajaInterna.innerHTML = htmlContenido + barraControles;
    //creamos el elemento
    wrapper.appendChild(cajaInterna);
    // lo agregamos en el contenedor
    formGenerado.appendChild(wrapper);

    // Evento para cambiar el ancho dinámicamente con los botones de la barra
    wrapper.querySelectorAll(".btn-ancho").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const nuevaCol = e.currentTarget.getAttribute("data-col");

        // Limpiar clases col-* anteriores manteniendo estilos base
        wrapper.className = wrapper.className.replace(/\bcol-\S+/g, "").trim();
        wrapper.classList.add(
          nuevaCol,
          "p-2",
          "position-relative",
          "elemento-form",
        );

        // Marcar botón activo
        wrapper.querySelectorAll(".btn-ancho").forEach((b) => {
          b.classList.remove("active", "btn-secondary");
          b.classList.add("btn-outline-secondary");
        });
        e.currentTarget.classList.add("active", "btn-secondary");
        e.currentTarget.classList.remove("btn-outline-secondary");
      });
    });

    // Lógica de cálculo dinámico para la cuadrícula
    if (tipo === "grid_dinamico") {
      const btnGenerar = wrapper.querySelector(".btn-generar-grid");
      const contenedorResultado = wrapper.querySelector(
        ".contenedor-grid-resultado",
      );
    // capturamos el numero de filas y de columnas para crear un layout definido para un formulario
      btnGenerar.addEventListener("click", () => {
        const numFilas =
          parseInt(wrapper.querySelector(".input-filas").value) || 1;
        const numCols =
          parseInt(wrapper.querySelector(".input-cols").value) || 1;

        // Calcular la clase de columna para dividirlas equitativamente
        const spanCol = Math.floor(12 / Math.min(Math.max(numCols, 1), 12));
        const claseCol = `col-12 col-md-${spanCol}`;

        let htmlGrid = "";
        //recorremos la cantidad de filas que tendra el formulario
        for (let f = 0; f < numFilas; f++) {
          htmlGrid += `<div class="row g-2 mb-2">`;
          //Por cada cantidad de filas recorremos la cantidad de columnas
          for (let c = 0; c < numCols; c++) {
            htmlGrid += `
              <div class="${claseCol}">
                <div class="p-2 border rounded bg-light">
                  <label class="form-label small fw-semibold" contenteditable="true">Fila ${f + 1} - Campo ${c + 1}</label>
                  <input type="text" class="form-control form-control-sm" placeholder="Ingrese dato..." />
                </div>
              </div>
            `;
          }
          htmlGrid += `</div>`;
        }
        // Mostramos el resultado
        contenedorResultado.innerHTML = htmlGrid;
      });
    }

    // Evento para eliminar el elemento del lienzo
    wrapper.querySelector(".btn-eliminar").addEventListener("click", () => {
      wrapper.remove();
      if (formGenerado.children.length === 0 && mensajeVacio) {
        mensajeVacio.style.display = "block";
      }
    });
  }
});
