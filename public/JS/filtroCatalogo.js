window.addEventListener('load',() =>{
//mostrar ocultar filtro
const mostrarFiltro = document.getElementById('filter');
mostrarFiltro.addEventListener('click', () => {
let show = document.getElementById('show');
show.style.display === 'none' ? show.style.display = 'block' : show.style.display ='none';
});

//cambiando el rango de precio
const range = document.querySelector('#precio');
range.addEventListener('change', ()=>{
        let outvol = document.getElementById('outvol');
            outvol.innerHTML = 'Hasta ' + range.value
})

const ti = document.getElementById('tintos');
const bl = document.getElementById('blancos');
const es = document.getElementById('especiales');
const esp = document.getElementById('espumantes');

const catFil = [
    ti, bl, es, esp
]

catFil.forEach(categoria => {
    categoria.addEventListener('click', (e)=>{
    if(categoria.checked){
     let enter = e.target.value
     filtro.push(enter)
     console.log(filtro)
    } else if(categoria.unchecked){
    filtro = []
    }
})
});

// trayendo productos por precio

//capturando el valor del checkbox
const filtro = []

// const todos = document.querySelectorAll('[type="checkbox"]');

// for(let i = 0, len = todos.length; i<len ; i++){
//     todos[i].addEventListener('change', ()=>{
//         if (todos[i].checked == true) {
//             console.log('esta checkeado')
//             filtro.push(todos[i].name)}

//     })
// }

// todos.addEventListener('change', ()=>{
//     todos.forEach(valor =>{
//              if(valor.checked){
//                 console.log('chequeado')
//                 filtro.push(valor.defaultValue)
//              }
//             })
// });

// todos.forEach(valor =>{
//     valor.addEventListener('change', (e)=>{
//          if(valor.checked){
//             let s = e.target.value
//         filtro.push(s)
//          }
//     })
// })

console.log(filtro)
}

)