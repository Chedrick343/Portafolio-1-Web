    const botonAbrir = document.getElementById("botonMenuHamburguesaMovil");
    const botonCerrar = document.getElementById("botonCerrarMenuHamburguesa");
    const botonCursos = document.getElementById("botonCursos");
    const botonInicio = document.getElementById("botonInicio");
    const botonExperiencia = document.getElementById("botonExperiencia");
    const botonComentarios = document.getElementById("botonComentarios");
    const nav = document.querySelector("nav");

    botonAbrir.addEventListener("click", () => {
        nav.classList.toggle("activo");
    });
    botonCerrar.addEventListener("click", ()=>  {
        nav.classList.toggle("activo");
    });
    botonCursos.addEventListener("click", () => {
        window.location.href = "/HTML/cursos.html";
    });
    botonInicio.addEventListener("click", () => {
        window.location.href = "../index.html";
    });
    botonExperiencia.addEventListener("click",() =>{
        window.location.href = "/HTML/experiencia.html"
    });
    botonComentarios.addEventListener("click",() =>{
        window.location.href = "/HTML/comentarios.html"
    });