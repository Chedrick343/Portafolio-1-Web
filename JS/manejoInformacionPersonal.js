fetch("/data/informacionProfesional.json")
    .then((res) => res.json())
    .then((data) => {
        document.getElementById("nombre").textContent = data.nombre;
        document.getElementById("biografia").textContent = data.biografia;
        let habilidadesHTML = "<h2 style=\"color:white\">Habilidades Tecnicas</h2>";

        for (let categoria in data.habilidades) {
            habilidadesHTML += `<h3 style="color: #b1b1b1ff;">${categoria}</h3>`;

            data.habilidades[categoria].forEach((habilidad) => {
                habilidadesHTML += `
        <div style="margin-bottom: 10px;">
            <span style="color: white;">${habilidad.nombre}</span>
            <div style="width: 300px; height: 20px; background-color: #333; border-radius: 10px; overflow: hidden; margin-top: 5px;">
                <div style="width: ${habilidad.nivel}%; height: 100%; background-color: #8f1e89ff;"></div>
            </div>
        </div>`;
            });
        }

        document.getElementById("habilidadesTecnicas").innerHTML = habilidadesHTML;

        let certHTML = "<h2 style=\"color:white\">Certificaciones</h2>"
        certHTML += data.certificaciones
            .map(
                (cert) =>
                    `<li class = "elementoBlanco">${cert.titulo} - ${cert.entidad} (<a href="${cert.url}" target="_blank">Ver</a>)</li>`
            )
            .join("");
        document.getElementById("certificaciones").innerHTML = certHTML;
        let extraHTML = "<h2 style=\"color:white\">Informacion Adicional</h2>" 
        extraHTML += data.informacionAdicional
            .map(item => `<li class = "elementoBlanco">${item}</li>`)
            .join("");
    
        document.getElementById("infoAdicional").innerHTML = `<ul>${extraHTML}</ul>`;
        let redesHTML = "<h2 style=\"color:white\">Redes</h2>" 
        redesHTML += Object.entries(data.redes)
            .map(([nombre, url]) => `<a href="${url}" target="_blank">${nombre}</a>`)
            .join(" | ");
        document.getElementById("redes").innerHTML = redesHTML;
    })
    .catch((err) => console.error("Error cargando JSON:", err));


document.getElementById("descargarPdf").addEventListener("click", () => {
    fetch("/data/informacionProfesional.json")
        .then(res => res.json())
        .then(data => {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();


            const img = new Image();
            img.src = "/sources/images/imagen-personal.png"; 
            img.onload = () => {
                doc.addImage(img, "JPEG", 15, 10, 40, 40); 


                doc.setFontSize(16);
                doc.text(data.nombre, 70, 20);

                doc.setFontSize(12);
                doc.text("Biografía:", 15, 60);
                doc.text(doc.splitTextToSize(data.biografia, 180), 15, 70);


                doc.setFontSize(12);
                doc.text("Habilidades:", 15, 100);
                let y = 110;
                for (let categoria in data.habilidades) {
                    doc.text(`${categoria}:`, 20, y);
                    y += 6;
                    data.habilidades[categoria].forEach(hab => {
                        let texto = hab.nombre
                            ? `${hab.nombre} (${hab.nivel}%)`
                            : hab;
                        doc.text(`- ${texto}`, 30, y);
                        y += 6;
                    });
                }

                doc.text("Certificaciones:", 15, y + 10);
                y += 16;
                data.certificaciones.forEach(cert => {
                    doc.text(`- ${cert.titulo} - ${cert.entidad}`, 20, y);
                    y += 6;
                });

                doc.text("Redes:", 15, y + 10);
                y += 16;
                for (let red in data.redes) {
                    doc.text(`${red}: ${data.redes[red]}`, 20, y);
                    y += 6;
                }
                doc.text("Información adicional:", 15, y + 10);
                y += 16;
                data.informacionAdicional.forEach(info => {
                    doc.text(`- ${info}`, 20, y);
                    y += 6;
                });

                doc.save("perfil.pdf");
            };
        });
});