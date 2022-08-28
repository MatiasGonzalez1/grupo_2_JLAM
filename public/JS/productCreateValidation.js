window.addEventListener('load', ()=>{
   let form = document.querySelector('form');
   let name = document.getElementById('name');
   let categoria = document.getElementById('fcategoria');
   let anioCose = document.getElementById('fcoseAnio');
   let variedad = document.getElementById('fvariety');
   let crianza = document.getElementById('fcrianza');
   let guarda = document.getElementById('fguarda');
   let notaCata = document.getElementById('fnotacata');
   let img = document.getElementById('fimg');
   let precio = document.getElementById('fprecio');
   let stock = document.getElementById('fstock');
   let send = document.getElementById('create');


   const arrInp = [name, categoria, anioCose, variedad, crianza, guarda, notaCata, img, precio, stock, send]
    form.addEventListener("submit", (e) => {
        arrInp.forEach((inp) => {
          if (inp.value.trim() == '') {
            inp.classList.add("is-invalid");
            inp.nextElementSibling.innerHTML = `Éste campo no puede estar vacío`
            e.preventDefault()
          }

          if (inp.value != "") {
            inp.classList.remove("is-invalid");
          }
        });
      });
})