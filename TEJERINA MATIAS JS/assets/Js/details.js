//Información de la data//
import { crearCard } from "../module/funciones.js"
const contenedor = document.getElementById('contenedor')
//Params//
const url = 'https://mindhub-xj03.onrender.com/api/amazing'
let eventos
fetch ( url )
    .then ( response => response.json() )
    .then ( datos =>{
    const evento = datos.events
    eventos = evento        
    let eventosPorId =  eventos.find(evento=>evento._id == id)
    crearCard(eventosPorId, contenedor)
    })

const urlParams =  location.search;
const params = new URLSearchParams(urlParams);
let id = params.get("id");




