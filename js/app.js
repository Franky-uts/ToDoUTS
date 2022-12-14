console.log('Hola mundo :)')
const formulario = document.getElementById('Formulario')
const listatareas = document.getElementById('listadetareas')
const template = document.getElementById('template').content
const fragment = document.createDocumentFragment()

let Tareas = {}

document.addEventListener('DOMContentLoaded', () => {
    console.log('Cargo pagina')
    if(localStorage.getItem('tareas')){
        Tareas = JSON.parse(localStorage.getItem('tareas'))
        pintarTareas()
    }
})

listatareas.addEventListener('click', e => {
    btnAcciones(e)
})

formulario.addEventListener('submit',event =>{
    event.preventDefault()
    //console.log('evento',event)
    setTarea(event)
})
const setTarea = e => {
    const texto = e.target.querySelector('input').value
    //console.log(texto)
    if(texto.trim()==''){
        console.log('Cadena vacia')
        return
    }
    const tarea = {
        id: Date.now(),
        texto,
        estado: false
    }
    //console.log('Tarea',tarea)
    Tareas[Tareas.id]=tarea
    pintarTareas()
    formulario.request()
    e.target.querySelector('imput').focus()
}
const pintarTareas = () =>{
    localStorage.setItem('tareas',JSON.stringify(Tareas))
    if (Object.values(Tareas).length === 0) {
        listatareas.innerHTML =         
        `<div class="alert alert-dark">
            sin tareas pendientes
        </div>`
        return
    }
    listatareas.innerHTML = ''
    Object.values(Tareas).forEach(item=>{
        //console.log('item',item)
        const clone = template.cloneNode(True)
        clone.querySelector('p').textContent = item.texto
        if(item.estado){
            clone.querySelectorAll('.fas')[0].classList.replace('fa-check-circle','fa-undo-alt')
            clone.querySelector('.alert').classList.replace('alert-warning', 'alert-primary')
            clone.querySelector('p').style.textDecoration = 'line-through'
        }
        clone.querySelectorAll('.fas')[0].dataset.id = item.id
        clone.querySelectorAll('.fas')[1].dataset.id = item.id
        fragment.appendChild(clone)
    })
    listatareas.appendChild(fragment)
}

const btnAcciones = e => {
    if (e.target.classList.contains('fa-check-circle')) {
        Tareas[e.target.dataset.id].estado = true 
        pintarTareas()       
    }

    if (e.target.classList.contains('fa-undo-alt')) {
        Tareas[e.target.dataset.id].estado = false 
        pintarTareas()       
    }

    if (e.target.classList.contains('fa-minus-circle')) {
        delete Tareas[e.target.dataset.id]
        pintarTareas()       
    }

    e.stopPropagation();
}
