    const botonAbrir = document.getElementById("botonMenuHamburguesaMovil");
    const botonCerrar = document.getElementById("botonCerrarMenuHamburguesa");
    const nav = document.querySelector("nav");

    botonAbrir.addEventListener("click", () => {
        nav.classList.toggle("activo");
    });
    botonCerrar.addEventListener("click", ()=>  {
        nav.classList.toggle("activo");
    });
