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
console.log(precio)

// trayendo productos por precio


//capturando el valor del checkbox
const ti = document.getElementById('tintos');
const bl = document.getElementById('blancos');
const es = document.getElementById('especiales');
const esp = document.getElementById('espumantes');

const catFil = [ti, bl, es, esp]
let cat = []
for(let i = 0; i < catFil.length; i++){
    const elemento = catFil[i];
    catFil[i].addEventListener('change', (e)=>{
    if(catFil[i].checked == true && !cat.includes(catFil[i])){
    cat.push(elemento)
    } else if(catFil[i].checked == false){
        cat.pop(elemento)
    }
    console.log(cat)
})
};


//capturando el valor del checkbox variedad
const ma = document.getElementById('malbec');
const mer = document.getElementById('merlot');
const pin = document.getElementById('pinotNoir');
const cab = document.getElementById('cabernetSauvignon');
const sy = document.getElementById('syrah');
const tem = document.getElementById('tempranillo');
const char = document.getElementById('chardonnay');

const varFil = [
    ma, mer, pin, cab, sy, tem, char
]
let varf = [];

for(let i = 0; i < varFil.length; i++){
    const el = varFil[i];
    varFil[i].addEventListener('change', (e)=>{
    if(varFil[i].checked == true && !varf.includes(varFil[i])){
    varf.push(el)
    } else if(varFil[i].checked == false){
        varf.pop(el)
    }
    console.log(varf)
})
};

}
)