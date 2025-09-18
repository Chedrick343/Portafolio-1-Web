let datosJSON; // variable global para guardar el JSON

// Cargar el JSON
fetch("../data/cursos.json")
    .then(response => response.json())
    .then(data => {
    datosJSON = data; // lo guardamos para usarlo después
    const selectAnio = document.getElementById("selectorAnio");

    // Poblar select de años
    data.anios.forEach(anioObj => {
        const option = document.createElement("option");
        option.value = anioObj.anio;
        option.textContent = anioObj.anio;
        selectAnio.appendChild(option);
    });
    })
    .catch(error => console.error("Error al cargar JSON:", error));

// Evento: cuando cambia el año, llenar semestres
    document.getElementById("selectorAnio").addEventListener("change", function () {
    const anioSeleccionado = this.value;
    const selectSemestre = document.getElementById("selectorSemestre");

  // Limpiar opciones previas
    selectSemestre.innerHTML = '<option value="">Seleccione un semestre</option>';

  if (!anioSeleccionado) return; // si no hay año, no hace nada

  // Buscar el año en el JSON
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