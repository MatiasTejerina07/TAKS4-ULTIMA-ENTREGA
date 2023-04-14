
const url = 'https://mindhub-xj03.onrender.com/api/amazing'
const contenedorElement = document.getElementById ( 'cuerpo1')
let eventos
fetch ( url )
.then(response => response.json())
.then( datos =>{
    const evento = datos.events

    //PastEvent//

    const pastEvents = evento.filter(elemento => elemento.date < datos.currentDate)
    const estadisticasDepast = pastEvents.reduce((ac, categoria)=>{
        if (!ac[categoria.category]){
            ac[categoria.category] = {revenues:0 , porcentajeAsistencia:0, contador:0}
        }
        ac[categoria.category].contador += 1 
        ac[categoria.category].revenues += categoria.assistance * categoria.price
        ac[categoria.category].porcentajeAsistencia += categoria.assistance / categoria.capacity * 100
        return ac
        
    }, {})
    const pastEventsMayorAsistencia = [...pastEvents].sort(function ( a, b ) {
        let porcentajeA = a.assistance / a.capacity * 100
        let porcentajeB = b.assistance / b.capacity * 100
        if ( porcentajeA< porcentajeB) {
        return 1;
        }
        if (porcentajeA > porcentajeB) {
        return -1;
        }
        return 0;
    });
    const pastEventsMayorCapacidad = [...pastEvents].sort(function ( a, b ) {
        if (a.capacity < b.capacity) {
        return 1;
        }
        if (a.capacity > b.capacity) {
        return -1;
        }
        return 0;
    });
    const eventoconMayorAsistencia = pastEventsMayorAsistencia[0]
    const eventoconMenorAsistencia = pastEventsMayorAsistencia[pastEventsMayorAsistencia.length -1]
    const eventoconMayorCapacidad = pastEventsMayorCapacidad[0]
    //Upcomming//
    const upCooming = evento.filter(elemento => elemento.date > datos.currentDate)
    const estadisticasDeUpcomming =  upCooming.reduce((ac, categoria)=>{
        if (!ac[categoria.category]){
            ac[categoria.category] = {revenues :0, porcentajeEstimado:0, contador :0}
        }
            ac[categoria.category].contador += 1
            ac[categoria.category].revenues += categoria.estimate * categoria.price
            ac[categoria.category].porcentajeEstimado += categoria.estimate / categoria.capacity * 100
    return ac
}, {})
    
console.log(estadisticasDepast)
let tabla1 = `
            <thead class= "text-center">
                <th>
                    Event with the highest % of attendance
                </th>
                <th>
                    Event with the lowest % of attendance
                </th>
                <th>
                    Event with larger capacity
                </th>
            </thead>
            <tr>
                <td>
                    ${eventoconMayorAsistencia.name} ${(eventoconMayorAsistencia.assistance / eventoconMayorAsistencia.capacity * 100).toFixed(1)} %
                </td>
                <td>
                    ${eventoconMenorAsistencia.name} ${(eventoconMenorAsistencia.assistance / eventoconMenorAsistencia.capacity * 100).toFixed(1)} %
                </td>
                <td>
                    ${eventoconMayorCapacidad.name} ${eventoconMayorAsistencia.capacity *2}
                </td>
            </tr>
            <tr>
                <td>
                    Category
                </td>
                <td>
                    Revenues
                </td>
                <td>
                    % of attendance
                </td>
            </tr>
            <tr>
                <td>
                    Food
                </td>
                <td>
                    ${estadisticasDeUpcomming["Food"].revenues}    
                </td>
                <td>
                    ${estadisticasDeUpcomming["Food"].porcentajeEstimado} %
                </td>
            </tr>
            <tr>
                <td>
                    Books
                </td>
                <td>
                    ${estadisticasDeUpcomming["Books"].revenues}    
                </td>
                <td>
                    ${(estadisticasDeUpcomming["Books"].porcentajeEstimado / estadisticasDeUpcomming["Books"].contador).toFixed(2)} %
                </td>
            </tr>
            <tr>
                <td>
                    Party
                </td>
                <td>
                    ${estadisticasDeUpcomming["Party"].revenues}    
                </td>
                <td>
                    ${(estadisticasDeUpcomming["Party"].porcentajeEstimado / estadisticasDeUpcomming["Party"].contador).toFixed(2)} %
                </td>
            </tr>
            <tr>
                <td>
                    Race
                </td>
                <td>
                    ${estadisticasDeUpcomming["Race"].revenues}    
                </td>
                <td>
                    ${(estadisticasDeUpcomming["Race"].porcentajeEstimado / estadisticasDeUpcomming["Race"].contador).toFixed(2)} %
                </td>
            </tr>
            <tr>
                <td>
                    Concert
                </td>
                <td>
                    ${estadisticasDeUpcomming["Concert"].revenues}    
                </td>
                <td>
                    ${(estadisticasDeUpcomming["Concert"].porcentajeEstimado / estadisticasDeUpcomming["Concert"].contador).toFixed(2)} %
                </td>
            </tr>
            <tr>
                <td>
                    Museum
                </td>
                <td>
                    ${estadisticasDeUpcomming["Museum"].revenues}    
                </td>
                <td>
                    ${(estadisticasDeUpcomming["Museum"].porcentajeEstimado / estadisticasDeUpcomming["Museum"].contador).toFixed(2)} %
                </td>
            </tr>
            <tr >
                <td class= "text-center"colspan="3">
                    Past events statistics by category
                </td>
            </tr>
            <tr>
                <td>
                    Category
                </td>
                <td>
                    Revenues
                </td>
                <td>
                    % of attendance
                </td>
            </tr>
            <tr>
                <td>
                    Food
                </td>
                <td>
                    ${estadisticasDepast["Food"].revenues}    
                </td>
                <td>
                    ${(estadisticasDepast["Food"].porcentajeAsistencia / estadisticasDepast["Food"].contador).toFixed(2)} %
                </td>
            </tr>
            <tr>
                <td>
                    Books
                </td>
                <td>
                    ${estadisticasDepast["Books"].revenues}    
                </td>
                <td>
                    ${(estadisticasDepast["Books"].porcentajeAsistencia / estadisticasDepast["Books"].contador).toFixed(2)} %
                </td>
            </tr>
            <tr>
                <td>
                    Party
                </td>
                <td>
                    ${estadisticasDepast["Party"].revenues}    
                </td>
                <td>
                    ${(estadisticasDepast["Party"].porcentajeAsistencia / estadisticasDepast["Party"].contador).toFixed(2)} %
                </td>
            </tr>
            <tr>
                <td>
                    Race
                </td>
                <td>
                    ${estadisticasDepast["Race"].revenues}    
                </td>
                <td>
                    ${(estadisticasDepast["Race"].porcentajeAsistencia / estadisticasDepast["Race"].contador).toFixed(2)} %
                </td>
            </tr>
            <tr>
                <td>
                    Concert
                </td>
                <td>
                    ${estadisticasDepast["Concert"].revenues}    
                </td>
                <td>
                    ${(estadisticasDepast["Concert"].porcentajeAsistencia / estadisticasDepast["Concert"].contador).toFixed(2)} %
                </td>
            </tr>
            <tr>
                <td>
                    Museum
                </td>
                <td>
                    ${estadisticasDepast["Museum"].revenues}    
                </td>
                <td>
                    ${(estadisticasDepast["Museum"].porcentajeAsistencia / estadisticasDepast["Museum"].contador).toFixed(2)} %
                </td>
            </tr>             
            `
    contenedorElement.innerHTML = tabla1
})



