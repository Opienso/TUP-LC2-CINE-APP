let favoritosLS = localStorage.getItem('FAVORITOS');

favoritos = JSON.parse(favoritosLS)

console.log(typeof(favoritos))

if (favoritos){
    favoritos.forEach(e => {
        
    });
}

localStorage.setItem("FAVORITOSS", favoritos)

const contenedorPeliculasFavoritas = document.getElementById("contenedorPeliculasFavoritas")

const mercho = async () => {
    if (favoritosLS != null) {
        favoritos = JSON.parse(favoritosLS);
        for (let i = 0; i < favoritos.length; i++) {
            const respuesta = await fetch(`https://api.themoviedb.org/3/movie/${favoritos[i]}?api_key=2ed62a64b39136b9951145a470e4a689&language=es-MX`)
        
            let favorito = await respuesta.json();

            console.log(favorito)

            const div = document.createElement("div");
            div.classList.add("pelicula")
            div.innerHTML = `<img src="https://image.tmdb.org/t/p/w500/${favorito.poster_path}" alt="${favorito.title}">
            <h3>${favorito.title}</h3>
            <p><b>Codigo:</b>${favorito.id}</p>
            <p><b>Titulo original:</b>${favorito.original_title}</p>
            <p><b>Idioma original:</b>${favorito.original_language}</p>
            <p><b>Resumen:</b>${favorito.overview}</p>
            </div>`

            contenedorPeliculasFavoritas.append(div)

        }
    }
}

mercho();


