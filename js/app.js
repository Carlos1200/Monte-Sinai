const menuBtn = document.querySelector('.menu-btn');
const navegacion = document.querySelector('.navegacion');
const reflexiones = document.querySelector('.reflexiones');
const reflexi = document.querySelector('.reflexionar');
var contenidoAnuncio = document.querySelector('.anuncio');
let menuOpen = false;
var counter = 1;
menuBtn.addEventListener('click', () => {
    if (!menuOpen) {
        menuBtn.classList.add('open');
        navegacion.classList.add('grid');
        navegacion.classList.remove('hidden');
        menuOpen = true;
    } else {
        menuBtn.classList.remove('open');
        navegacion.classList.remove('grid');
        navegacion.classList.add('hidden');
        menuOpen = false;
    }
});

if (filename() !== 'reflexiones.html' || filename() !== 'reflexion.html') {

    document.addEventListener('DOMContentLoaded', () => {
        new Glider(document.querySelector('.minister'), {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: '#dots',
            dragDistance: true,
            scrollLock: true,
            draggable: true,
            arrows: {
                prev: ".left",
                next: ".right"
            }
        });
        mostrarAnuncios();
        setInterval(function() {
            document.getElementById('radio' + counter).checked = true;
            counter++;
            if (counter > 4) {
                counter = 1;
            }
        }, 5000);
    });
}

if (filename() === 'reflexiones.html') {
    document.addEventListener('DOMContentLoaded', obtenerDatos);
}
if (filename().includes('reflexion.html')) {
    document.addEventListener('DOMContentLoaded', llenarDatos);
}



function filename() {
    var rutaAbsoluta = self.location.href;
    var posicionUltimaBarra = rutaAbsoluta.lastIndexOf("/");
    var rutaRelativa = rutaAbsoluta.substring(posicionUltimaBarra + "/".length, rutaAbsoluta.length);
    return rutaRelativa;
}



function obtenerDatos() {
    url = 'https://iglesia-monte-sinai.herokuapp.com/reflexion';
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => crearCards(resultado));
}

function crearCards(data) {

    data.forEach(reflex => {
        const { titulo, imagenUrl, resumen, _id } = reflex;
        const divCard = document.createElement('div');
        const titul = document.createElement('h2');
        const imagen = document.createElement('img');
        const sinopsis = document.createElement('p');
        const boton = document.createElement('a');

        //Agregar clases y atributos
        divCard.className = 'rounded-2xl border-2 border-black border-opacity-50 grid bg-white px-4 shadow-lg';
        titul.classList.add('text-center', 'text-4xl', 'my-3');
        imagen.src = imagenUrl;
        imagen.classList.add('w-full');
        sinopsis.classList.add('text-xl');
        boton.className = 'py-3 text-center text-2xl text-white bg-green-900 my-3 rounded-2xl uppercase font-bold hover:bg-green-700';
        boton.href = '#';
        boton.setAttribute('id', _id);

        //Agregar valores
        titul.textContent = titulo;
        sinopsis.textContent = resumen;
        boton.textContent = 'Leer';

        divCard.appendChild(titul);
        divCard.appendChild(imagen);
        divCard.appendChild(sinopsis);
        divCard.appendChild(boton);
        reflexiones.appendChild(divCard);

        boton.onclick = () => {
            window.location.href = `reflexion.html?id=${boton.getAttribute('id')}`;
        }
    });
}

function mostrarAnuncios() {
    fetch('https://iglesia-monte-sinai.herokuapp.com/anuncio')
        .then(respuesta => respuesta.json())
        .then(resultado => imprimirAnuncios(resultado));
}

function imprimirAnuncios(anuncios) {
    let htmlAnuncio = '';
    anuncios.forEach(anuncio => {
        const { anuncioUrl } = anuncio;
        htmlAnuncio = `
            <div class="mx-auto">
                <img class="w-full" src="${anuncioUrl}">
            </div>
            
        `;
        contenidoAnuncio.innerHTML += htmlAnuncio;
    });
    new Glider(document.querySelector('.anuncio'), {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: '#resp-dots',
        dragDistance: true,
        scrollLock: true,
        draggable: true,
        arrows: {
            prev: ".glider-prev",
            next: ".glider-next"
        }
    });

}

function llenarDatos() {
    let params = new URLSearchParams(location.search);
    const id = params.get('id');
    fetch(`https://iglesia-monte-sinai.herokuapp.com/reflexion/${id}`)
        .then(respuesta => respuesta.json())
        .then(resultado => llenarReflexion(resultado));
}

function llenarReflexion(datos) {
    let dHTML;
    const { titulo, imagenUrl, reflexion } = datos;
    dHTML = `
        <h1 class="text-5xl text-white text-center">${titulo}</h1>
        <div class="grid grid-cols-2 gap-6 my-10">
            <img src="${imagenUrl}" class="mx-auto md:w-full">
            <p class="text-white text-xl">${reflexion}</p>
        </div>
    `;

    reflexi.innerHTML = dHTML;
}