let peliculas = []
let favoritos = []
let pagina = 1;

let apa = localStorage.getItem("FAVORITOS")

if (apa) {
    apa = JSON.parse(apa)
    apa = Array.from(apa)
    apa.forEach(coso => {
        favoritos.push(coso)
    })
}

////////////////////////////////////////////////

const contenedorPeliculas = document.getElementById("contenedorPeliculas")
const btnAnterior = document.getElementById("btnAnterior")
const btnSiguiente = document.getElementById("btnSiguiente")
const agregarPeli = document.getElementById("agregarPeli")
const mensajeSucces = document.getElementById("contenedor-mensaje-succes")
const mensajeWarning = document.getElementById("contenedor-mensaje-warning")
const mensajeError = document.getElementById("contenedor-mensaje-error")


/////////////////////////////////////////////////

btnSiguiente.addEventListener("click", ()=> {
    if (pagina < 1000){
        pagina += 1;
        window.scrollTo(0, 0);
        fercho()
    }
})

btnAnterior.addEventListener("click", ()=> {
    if (pagina > 1){
        pagina -= 1;
        window.scrollTo(0, 0);
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
            <button class="boton_agregar" id="${pelicula.id}">Agegar a Favoritos</button>
            <div id="contenedor-mensaje-succes-2${pelicula.id}" class="hidden">
                <p class="succes2">Película agregada<br>con éxito</p>
            </div>
            <div id="contenedor-mensaje-warning-2${pelicula.id}" class="hidden">
                <p class="warning2">La Pelicula ingresada ya se encuentra almacenada</p>
            </div>
            <div id="contenedor-mensaje-error-2${pelicula.id}" class="hidden">
                <p class="error2">Error: La Película seleccionada no se encuentra en la API o se produjo un error al consultar</p>
            </div>`
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

            const mensajeSucces2 = document.getElementById(`contenedor-mensaje-succes-2${buscar}`)
            const mensajeWarning2 = document.getElementById(`contenedor-mensaje-warning-2${buscar}`)

            if(favoritos.includes(buscar)){
                console.log(mensajeWarning2)
                mensajeWarning2.classList.remove("hidden")
                setTimeout(() => {
                    mensajeWarning2.classList.add("hidden")
                }, 3000)
            }
            else{
                mensajeSucces2.classList.remove("hidden")
                setTimeout(() => {
                    mensajeSucces2.classList.add("hidden")
                }, 3000)
                favoritos.push(buscar)
            }

            localStorage.setItem("FAVORITOS", JSON.stringify(favoritos))
        })
    })
}

////////////////////////////////////////

const agregarPorCodigo = async() => {
    console.log(agregarPeli.value)

    let respuesta = await fetch (`https://api.themoviedb.org/3/movie/${agregarPeli.value}?api_key=2ed62a64b39136b9951145a470e4a689&language=es-MX`)

    mensajitos(respuesta);

}

function mensajitos(a){
    if(a.status === 404){
        console.log("No se encontro la peli")
        mensajeError.classList.remove("hidden")
        setTimeout(() => {
            mensajeError.classList.add("hidden")
        }, 8000)
    }else if(a.status === 200){
        if(favoritos.includes(agregarPeli.value)){
            console.log("nono, esa pelicula ya esta almacenada")
            mensajeWarning.classList.remove("hidden")
            setTimeout(() => {
                mensajeWarning.classList.add("hidden")
            }, 8000)
        }
        else{
            favoritos.push(agregarPeli.value)
            mensajeSucces.classList.remove("hidden")
            setTimeout(() => {
                mensajeSucces.classList.add("hidden")
            }, 8000)
        }
        localStorage.setItem("FAVORITOS", JSON.stringify(favoritos))
    }
}