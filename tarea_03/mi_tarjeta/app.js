document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("miFormulario");
    const otraEspecie = document.getElementById("otra_especie");
    const selectEspecie = document.getElementById("especie");
    const contenedorTarjetas = document.getElementById("tarjetas");
    const contadorMascotas = document.getElementById("contadorMascotas");

    let totalMascotas = 0;

    // imágenes por especie (fallback)
    const imagenesPorEspecie = {
        Gato: "https://placekitten.com/200/200",
        Perro: "https://placedog.net/200/200",
        Pez: "https://picsum.photos/200?random=1",
        Reptil: "https://picsum.photos/200?random=2",
        Ave: "https://picsum.photos/200?random=3",
        Otro: "https://picsum.photos/200?random=4",
    };

    // habilitar/deshabilitar "Otra especie"
    selectEspecie.addEventListener("change", () => {
        if (selectEspecie.value === "Otro") {
            otraEspecie.disabled = false;
            otraEspecie.required = true;
        } else {
            otraEspecie.disabled = true;
            otraEspecie.required = false;
            otraEspecie.value = "";
        }
    });

    // actualizar contador
    function actualizarContador() {
        contadorMascotas.innerHTML = `<strong>Mascotas registradas:</strong> ${totalMascotas}`;
    }

    // manejar envío del formulario
    formulario.addEventListener("submit", (e) => {
        e.preventDefault();

        const nombre = document.getElementById("nombreMascota").value.trim();
        const edad = document.getElementById("edad").value.trim();
        const especie = selectEspecie.value === "Otro" ? otraEspecie.value.trim() : selectEspecie.value;
        const vacunado = formulario.vacunado.value;
        const descripcion = document.getElementById("descripcion").value.trim();
        const inputImagen = document.getElementById("imagenMascota");
        
        if (!nombre || !edad || !especie || !vacunado) {
            mostrarError("Por favor, completa todos los campos obligatorios.");
            return;
        }

        // Crear tarjeta
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta");

        // Imagen: usar subida o fallback
        let urlImagen = imagenesPorEspecie[especie] || imagenesPorEspecie["Otro"];
        if (inputImagen.files.length > 0) {
            urlImagen = URL.createObjectURL(inputImagen.files[0]);
        }

        tarjeta.innerHTML = `
            <img src="${urlImagen}" alt="Imagen de ${especie}" style="width:100%; border-radius:8px; margin-bottom:1rem;">
            <h2>${nombre}</h2>
            <p><strong>Edad:</strong> ${edad}</p>
            <p><strong>Especie:</strong> ${especie}</p>
            <p><strong>Vacunado:</strong> ${vacunado}</p>
            <p><strong>Descripción:</strong> ${descripcion}</p>
            <button class="eliminar">Eliminar</button>
        `;

        // botón eliminar
        tarjeta.querySelector(".eliminar").addEventListener("click", () => {
            tarjeta.remove();
            totalMascotas--;
            actualizarContador();
        });

        contenedorTarjetas.appendChild(tarjeta);

        // actualizar contador
        totalMascotas++;
        actualizarContador();

        // reset
        formulario.reset();
        otraEspecie.disabled = true;
    });

    // mostrar errores debajo del form
    function mostrarError(mensaje) {
        let errorBox = document.getElementById("error-form");
        if (!errorBox) {
            errorBox = document.createElement("p");
            errorBox.id = "error-form";
            errorBox.style.color = "red";
            formulario.appendChild(errorBox);
        }
        errorBox.textContent = mensaje;
    }
});
