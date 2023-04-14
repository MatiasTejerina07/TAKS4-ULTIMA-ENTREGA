export function crearArticle(evento, link){
    return `<article class="d-flex container cards col-lg col-md-4 col-sm-12 flex-wrap p-1 gap-4 m-3">
                <div class="card" style="width: 16rem;">
                    <img src="${evento.image}" alt="title">
                    <div class="card-body1">
                        <h5 class="card-title">${evento.name}</h5>
                        <p class="card-text">${evento.description}.</p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item text-center">Fecha: ${evento.date}</li>
                        <li class="list-group-item text-center">Categoria: ${evento.category}</li>
                        <li class="list-group-item text-center">Capacidad: ${evento.capacity}</li>
                    </ul>
                    <div class="card-body2">      
                        <a href="${link}?id=${evento._id}" class="card-link">See more</a>
                    </div>
                </div>
        </article>
`
}
export function llevarPantalla(eventos, elemento, link){
    let template = '';
    for (let evento of eventos){
        template += crearArticle(evento, link)
    }
    elemento.innerHTML = template;
}
export function generarPlantillaResultados(resultados) {
    let plantilla = '';
    for (let evento of resultados) {
    plantilla += crearArticle(evento);
    }
    return plantilla;
}
export function crearCheck(evento, elemento){
    let template2 = ''
    for(let categoria of evento){
        template2 += `<div class="form-check">
        <input class="form-check-input" type="checkbox" name = "${categoria}"
            value="${categoria}">
        <label class="form-check-label text-white" for="9">
        ${categoria}
        </label>
    </div>
` 
    } 
    elemento.innerHTML = template2
}
export function estadoRealizado(eventos, categorias, texto) {
    let eventosFiltrados = eventos;
    if (categorias.length > 0) {
    eventosFiltrados = eventosFiltrados.filter((evento) => categorias.includes(evento.category));
    }
    if (texto) {
    const textoMiniscula = texto.toLowerCase();
    eventosFiltrados = eventosFiltrados.filter((evento) => evento.name.toLowerCase().includes(textoMiniscula) || evento.description.toLowerCase().includes(textoMiniscula));
    }
    return eventosFiltrados;
}
export function filtraDate(dates, fechaActual){
    const aux =[]
    for(let evento of dates){
        if(evento.date > fechaActual ){
            aux.push(evento)
        }
    }
    return aux
}
export function filtraDate2(dates, fechaActual){
    const aux =[]
    for(let eventos of dates){
        if(eventos.currentDate < fechaActual ){
            aux.push(eventos)
        }
    }
    return aux
}
  //Event del Buscador// 
export function actualizarResultados(eventos, buscador, elemento) {
    const categoriasSeleccionadas = Array.from(document.querySelectorAll('input:checked')).map((input) => input.value);
    const eventosFiltrados = estadoRealizado(eventos, categoriasSeleccionadas, buscador.value);
    const nuevaPlantilla = generarPlantillaResultados(eventosFiltrados);
    elemento.innerHTML = nuevaPlantilla;
}



export function crearCard(evento, elemento){
    let cards = `<article class="d-flex justify-content-center align-content-center container cards col-lg col-md-4 col-sm-12 flex-wrap p-1 gap-4 m-3">
        <div class="card" style="width: 16rem;">
            <img src="${evento.image}" alt="title">
            <div class="card-body1">
                <h5 class="card-title">${evento.name}</h5>
                <p class="card-text">${evento.description}.</p>
            </div>
            <ul class="list-group aca list-group-flush">
                <li class="list-group-item text-center">Fecha: ${evento.date}</li>
                <li class="list-group-item text-center">Categoria: ${evento.category}</li>
                <li class="list-group-item text-center">Capacidad: ${evento.capacity}</li>
            </ul>
            <div class="card-body2">
                <p class="card-link">Precio: $${evento.price}</p>
            </div>
        </div>
    </article>
    `
    elemento.innerHTML = cards
    }