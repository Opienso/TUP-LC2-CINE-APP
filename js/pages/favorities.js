let favoritos = localStorage.getItem('FAVORITOS');

const contenedorPeliculasFavoritas = document.getElementById("contenedorPeliculasFavoritas")
const mensajeWarningFavoritos = document.getElementById("algo")

const mercho = async () => {
    console.log(favoritos)
    favoritos = JSON.parse(favoritos);
    if (favoritos.length != 0) {
        console.log("hola desde donde no se debe")

        mensajeWarningFavoritos.classList.add("hidden")
        for (let i = 0; i < favoritos.length; i++) {
            const respuesta = await fetch(`https://api.themoviedb.org/3/movie/${favoritos[i]}?api_key=2ed62a64b39136b9951145a470e4a689&language=es-MX`)
        
            let favorito = await respuesta.json();

            const div = document.createElement("div");
            div.classList.add("pelicula")
            div.classList.add(favorito.id)
            div.innerHTML = `<img src="https://image.tmdb.org/t/p/w500/${favorito.poster_path}" alt="${favorito.title}">
            <h3>${favorito.title}</h3>
            <p><b>Codigo:</b>${favorito.id}</p>
            <p><b>Titulo original:</b>${favorito.original_title}</p>
            <p><b>Idioma original:</b>${favorito.original_language}</p>
            <p><b>Resumen:</b>${favorito.overview}</p>
            <button class="boton_quitar button" id="${favorito.id}">Quitar de Favoritos</button>
            </div>`

            contenedorPeliculasFavoritas.append(div)
        }
        quitarFavorito();
    }else{
        mensajeWarningFavoritos.classList.remove("hidden")
    }
}

mercho();

function quitarFavorito() {
    let botones = document.getElementsByClassName("boton_quitar")

    botones = Array.from(botones)

    let favoritosss = localStorage.getItem('FAVORITOS');

    favoritosss = JSON.parse(favoritosss);
    favoritosss = Array.from(favoritosss);

    botones.forEach(boton => {
        boton.addEventListener("click", (e)=> {
            console.log("hola paloma")
            id = e.currentTarget.id

            borrarDiv = document.getElementsByClassName(id)
            console.log(borrarDiv)

            indice = favoritosss.indexOf(id)

            if(indice !== -1){
                favoritosss.splice(indice, 1);
                localStorage.setItem("FAVORITOS", JSON.stringify(favoritosss))

                let contenedor = document.getElementsByClassName(id);
                contenido = contenedor[0] 
                contenido.parentNode.removeChild(contenido);
            }
            
        })
    });
}