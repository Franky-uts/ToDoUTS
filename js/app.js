console.log('Hola mundo :)')
const formulario = document.getElementById('Formulario')
const listatareas = document.getElementById('listadetareas')
const template = document.getElementById('template').content
const fragment = document.createDocumentFragment()

let Tareas = {}

document.addEventListener('DOMContentLoaded', () => {
    console.log('Cargo pagina')
})

formulario.addEventListener('submit',event =>{
    event.preventDefault()
    //console.log('evento',event)
    setTarea(event)
})