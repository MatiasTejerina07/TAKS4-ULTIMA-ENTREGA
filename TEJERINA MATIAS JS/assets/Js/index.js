//contenedores//
import {llevarPantalla, crearCheck, actualizarResultados} from '../module/funciones.js'
const contenedorElement = document.getElementById('contenedor-article');
const buscador= document.getElementById('buscador-js');
const check = document.getElementById('div-check')
let link = "./pages/details.html"
const url = 'https://mindhub-xj03.onrender.com/api/amazing'
let eventos
fetch( url )
    .then(response=> response.json())
    .then(datos =>{
        const evento = datos.events
        eventos = evento
        const category = evento.map(evento=> evento.category)
        const setCategory = new Set(category )
        const arrayCategory = Array.from(setCategory)
        crearCheck(arrayCategory, check)
        llevarPantalla(evento, contenedorElement, link)
    })
    .catch(err => console.log(err))
    

    buscador.addEventListener('input', ()=>{
        actualizarResultados(eventos, buscador, contenedorElement)
    });
    
    check.addEventListener('change', ()=>{
        actualizarResultados(eventos, buscador, contenedorElement)
    })