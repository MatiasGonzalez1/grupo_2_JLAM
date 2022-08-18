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

//capturando el checkbox

})