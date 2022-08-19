window.addEventListener('load',() =>{
//mostrar ocultar filtro
const mostrarFiltro = document.getElementById('filter');
mostrarFiltro.addEventListener('click', () => {
let show = document.getElementById('show');
show.style.display === 'none' ? show.style.display = 'block' : show.style.display ='none';
});

//cambiando el rango de precio
const precio = []
const range = document.querySelector('#precio');
range.addEventListener('change', (e)=>{
        let outvol = document.getElementById('outvol');
            outvol.innerHTML = 'Hasta ' + range.value
            let guard = e.target.value
            precio.push(guard)
})

// trayendo productos por precio


//capturando el valor del checkbox
const ti = document.getElementById('tintos');
const bl = document.getElementById('blancos');
const es = document.getElementById('especiales');
const esp = document.getElementById('espumantes');

const catFil = [
    ti, bl, es, esp
]
catFil.forEach(categoria => {
    categoria.addEventListener('change', ()=>{
    if(categoria.checked){
        categoria.setAttribute('checked', 'checked')
    } else if(categoria.checked != true){
    categoria.removeAttribute('checked')
    } 
})
});



//capturando el valor del checkbox variedad
const ma = document.getElementById('malbec');
const mer = document.getElementById('merlot');
const pin = document.getElementById('pinotNoir');
const cab = document.getElementById('cabernet');
const sy = document.getElementById('syrah');
const tem = document.getElementById('tempranillo');
const char = document.getElementById('chardonnay');

const varFil = [
    ma, mer, pin, cab, sy, tem, char
]

varFil.forEach(variedad => {
    variedad.addEventListener('change', ()=>{
    if(variedad.checked){
       // let enter = e.target.value
        variedad.setAttribute('checked', 'checked')
    } else if(variedad.checked != true){
    variedad.removeAttribute('checked')
    } 
})
});

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

}

)