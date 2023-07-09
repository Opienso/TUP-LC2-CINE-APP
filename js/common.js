let peliculas = []
let favoritos = []
let pagina = 1;

let apa = localStorage.getItem("FAVORITOS")
apa = JSON.parse(apa)
apa = Array.from(apa)

if (apa){
    apa.forEach(coso => {
        favoritos.push(coso)
    })
}

////////////////////////////////////////////////

const contenedorPeliculas = document.getElementById("contenedorPeliculas")
const btnAnterior = document.getElementById("btnAnterior")
const btnSiguiente = document.getElementById("btnSiguiente")

/////////////////////////////////////////////////

btnSiguiente.addEventListener("click", ()=> {
    if (pagina < 1000){
        pagina += 1;
        fercho()
    }
})

btnAnterior.addEventListener("click", ()=> {
    if (pagina > 1){
        pagina -= 1;
        fercho()
    }
})

////////////////////////////////////////////////

const fercho = async() => {
    try{
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=2ed62a64b39136b9951145a470e4a689&language=es-MX&page=${pagina}`)

        let datos = await respuesta.json();
        peliculas = datos.results

        console.log(peliculas)

        cargarPeliculas(peliculas);
    }catch(error){
        console.log(error);
    }
}

fercho();

function cargarPeliculas(a) {
    console.log("hola desde cargar peliculas")
    contenedorPeliculas.innerHTML = ""

    a.forEach(pelicula => {
        const div = document.createElement("div");
        div.classList.add("pelicula")
        div.innerHTML = `<img src="https://image.tmdb.org/t/p/w500${pelicula.poster_path}" alt="${pelicula.title}">
            <h3>${pelicula.title}</h3>
            <p><b>Codigo:</b>${pelicula.id}</p>
            <p><b>Título original:</b>${pelicula.original_title}</p>
            <p><b>Idioma original:</b>${pelicula.original_language}</p>
            <p><b>Año:</b>${pelicula.release_date}</p>
            <button class="boton_agregar" id="${pelicula.id}">Agegar a Favoritos</button>`

        contenedorPeliculas.append(div)
    });
    botonAgregarFavorito();
}

//////////////////////////////////////////


function botonAgregarFavorito() {
    let botones = document.getElementsByClassName("boton_agregar")
    
    botones = Array.from(botones)

    botones.forEach(boton => {
        boton.addEventListener("click", (e) => {
            let buscar = e.currentTarget.id

            if(favoritos.includes(buscar)){
                console.log("nono")
            }
            else{
                favoritos.push(buscar)
            }

            localStorage.setItem("FAVORITOS", JSON.stringify(favoritos))
        })
    })
}


