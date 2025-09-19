let datosJSON;
fetch("../data/cursos.json")
    .then(response => response.json())
    .then(data => {
    datosJSON = data;
    const selectAnio = document.getElementById("selectorAnio");

    data.anios.forEach(anioObj => {
        const option = document.createElement("option");
        option.value = anioObj.anio;
        option.textContent = anioObj.anio;
        selectAnio.appendChild(option);
    });
    })
    .catch(error => console.error("Error al cargar JSON:", error));

    document.getElementById("selectorAnio").addEventListener("change", function () {
    const anioSeleccionado = this.value;
    const selectSemestre = document.getElementById("selectorSemestre");

    selectSemestre.innerHTML = '<option value="">Seleccione un semestre</option>';

  if (!anioSeleccionado) return; 
    const anioObj = datosJSON.anios.find(a => a.anio === anioSeleccionado);

    if (anioObj) {
        anioObj.semestres.forEach(sem => {
        const option = document.createElement("option");
        option.value = sem.semestre;
        option.textContent = `Semestre ${sem.semestre}`;
        selectSemestre.appendChild(option);
        });
    }
});
document
  .getElementById("selectorSemestre")
  .addEventListener("change", function () {
    const anioSeleccionado = document.getElementById("selectorAnio").value;
    const semestreSeleccionado = parseInt(this.value);
    const cajaCursos = document.getElementById("cajaDeCursos");
    cajaCursos.innerHTML = "";

    if (!anioSeleccionado || !semestreSeleccionado) return;

    const anioObj = datosJSON.anios.find((a) => a.anio === anioSeleccionado);
    if (!anioObj) return;

    const semestreObj = anioObj.semestres.find(
      (s) => s.semestre === semestreSeleccionado
    );
    if (!semestreObj) return;

    semestreObj.cursos.forEach((curso) => {
      const boton = document.createElement("button");
      boton.classList.add("curso");
      boton.textContent = curso.nombre;

      boton.addEventListener("click", () => {
        mostrarModal(curso);
      });

      cajaCursos.appendChild(boton);
    });
  });

function mostrarModal(curso) {
  const modal = document.getElementById("modalCurso");
  const titulo = document.getElementById("tituloCurso");
  const trabajosDiv = document.getElementById("trabajosCurso");

  titulo.textContent = curso.nombre;
  trabajosDiv.innerHTML = "";

  if (curso.trabajos.length === 0) {
    trabajosDiv.innerHTML = "<p>No hay trabajos registrados.</p>";
  } else {
    curso.trabajos.forEach((t) => {
      const div = document.createElement("div");
      div.classList.add("trabajo");
      div.innerHTML = `
        <h4>${t.nombre} (${t.tipo})</h4>
        <p><strong>Descripción:</strong> ${t.descripcion}</p>
        <p><strong>Fecha de entrega:</strong> ${t.fecha_entrega}</p>
        <p><strong>Tecnologías:</strong> ${t.tecnologias.join(", ")}</p>
        ${
          t.repositorio
            ? `<p><a href="${t.repositorio}" target="_blank">Repositorio</a></p>`
            : ""
        }
        ${
          t.sitio ? `<p><a href="${t.sitio}" target="_blank">Sitio</a></p>` : ""
        }
      `;
      trabajosDiv.appendChild(div);
    });
  }

  modal.style.display = "block";
}

document.getElementById("cerrarModal").addEventListener("click", () => {
  document.getElementById("modalCurso").style.display = "none";
});

window.addEventListener("click", (e) => {
  const modal = document.getElementById("modalCurso");
  if (e.target === modal) {
    modal.style.display = "none";
  }
});