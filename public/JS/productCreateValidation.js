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
            inp.nextElementSibling.innerHTML = 'Éste campo no puede estar vacío'
            e.preventDefault()
          }

          if (inp.value != "") {
            inp.classList.remove("is-invalid");
          }
        }
        
        );

        if(categoria.value == 'Seleccione una categoría'){
            categoria.classList.add("is-invalid");
            let catErr = document.getElementById('fcat');
            catErr.innerHTML = 'Debes seleccionar una categoría';
        } else{
            categoria.classList.remove("is-invalid");
            let catErr = document.getElementById('fcat');
            catErr.innerHTML = '';

        }
      });
//validaciones campo nombre
      name.addEventListener("blur", () => {
        if (name.value.trim() == "") {
          name.classList.add("is-invalid");
          name.nextElementSibling.innerHTML = "El campo nombre no puede estar vacío";
        }
      });
      name.addEventListener("input", () => {
        if (name.value.trim() == "") {
            name.classList.add("is-invalid");
            name.nextElementSibling.innerHTML = "El campo nombre no puede estar vacío";
        }
        else if (name.value.length < 5) {
            name.classList.add("is-invalid");
            name.nextElementSibling.innerHTML = "El campo nombre debe tener más de 5 carácteres";        
        }
           else {
          name.classList.remove("is-invalid");
          name.nextElementSibling.innerHTML = "";
        }
      });

      //validaciones campo categoria
      categoria.addEventListener("click", () => {
        if(categoria.value == 'Seleccione una categoría'){
            categoria.classList.add("is-invalid");
            let catErr = document.getElementById('fcat');
            catErr.innerHTML = 'Debes seleccionar una categoría';
        } else {
            categoria.classList.remove("is-invalid");
            let catErr = document.getElementById('fcat');
            catErr.innerHTML = '';
        }
      });
      categoria.addEventListener("input", () => {
        if(categoria.value == 'Seleccione una categoría'){
            categoria.classList.add("is-invalid");
            let catErr = document.getElementById('fcat');
            catErr.innerHTML = 'Debes seleccionar una categoría';
        } else {
            categoria.classList.remove("is-invalid");
            let catErr = document.getElementById('fcat');
            catErr.innerHTML = '';
        }
      });
      //validaciones campo año cosecha
      anioCose.addEventListener('blur', ()=>{
        if (anioCose.value.trim() == "") {
          anioCose.classList.add("is-invalid");
          anioCose.nextElementSibling.innerHTML = "El campo año de cosecha no puede estar vacío";
        }
      })

      anioCose.addEventListener('input', ()=>{
        if (anioCose.value.trim() == "") {
          anioCose.classList.add("is-invalid");
          anioCose.nextElementSibling.innerHTML = "El campo año de cosecha no puede estar vacío";
      }
      else if(anioCose.value < 1900 || anioCose.value > 2022){
        anioCose.classList.add("is-invalid");
        anioCose.nextElementSibling.innerHTML = "Ingrese un año de cosecha entre 1900 y 2022";
      }
         else {
        anioCose.classList.remove("is-invalid");
        anioCose.nextElementSibling.innerHTML = "";
      }
      })


      //validaciones campo variedad

      variedad.addEventListener('blur', ()=>{
        if (variedad.value.trim() == "") {
          variedad.classList.add("is-invalid");
          variedad.nextElementSibling.innerHTML = "El campo variedad no puede estar vacío";
        }
      })

      variedad.addEventListener("input", () => {
        if (variedad.value.trim() == "") {
            variedad.classList.add("is-invalid");
            variedad.nextElementSibling.innerHTML = "El campo variedad no puede estar vacío";
        }
        else if (variedad.value.length < 5) {
            variedad.classList.add("is-invalid");
            variedad.nextElementSibling.innerHTML = "El campo variedad debe tener más de 5 carácteres";        
        }
           else {
          variedad.classList.remove("is-invalid");
          variedad.nextElementSibling.innerHTML = "";
        }
      });

      //validaciones campo crianza
      crianza.addEventListener('blur', ()=>{
        if (crianza.value.trim() == "") {
          crianza.classList.add("is-invalid");
          crianza.nextElementSibling.innerHTML = "El campo crianza no puede estar vacío";
        }
      })

      crianza.addEventListener("input", () => {
        if (crianza.value.trim() == "") {
            crianza.classList.add("is-invalid");
            crianza.nextElementSibling.innerHTML = "El campo crianza no puede estar vacío";
        }
        if (crianza.value.length < 5) {
            crianza.classList.add("is-invalid");
            crianza.nextElementSibling.innerHTML = "El campo crianza debe tener más de 5 carácteres";        
        }
           else {
          crianza.classList.remove("is-invalid");
          crianza.nextElementSibling.innerHTML = "";
        }
      });

      //validaciones campo potencial de guarda
      guarda.addEventListener('blur', ()=>{
        if (guarda.value.trim() == "") {
          guarda.classList.add("is-invalid");
          guarda.nextElementSibling.innerHTML = "El campo guarda no puede estar vacío";
        }
      })

      guarda.addEventListener("input", () => {
        if (guarda.value.trim() == "") {
            guarda.classList.add("is-invalid");
            guarda.nextElementSibling.innerHTML = "El campo guarda no puede estar vacío";
        }
        if (guarda.value.length < 5) {
            guarda.classList.add("is-invalid");
            guarda.nextElementSibling.innerHTML = "El campo guarda debe tener más de 5 carácteres";        
        }
           else {
          guarda.classList.remove("is-invalid");
          guarda.nextElementSibling.innerHTML = "";
        }
      });

      //validaciones campo nota cata
      notaCata.addEventListener('blur', ()=>{
        if (notaCata.value.trim() == "") {
          notaCata.classList.add("is-invalid");
          notaCata.nextElementSibling.innerHTML = "El campo nota cata no puede estar vacío";
        }
      })

      notaCata.addEventListener("input", () => {
        if (notaCata.value.trim() == "") {
            notaCata.classList.add("is-invalid");
            notaCata.nextElementSibling.innerHTML = "El campo nota cata no puede estar vacío";
        }
        if (notaCata.value.length < 40) {
            notaCata.classList.add("is-invalid");
            notaCata.nextElementSibling.innerHTML = "El campo nota cata debe tener almenos 40 carácteres";        
        }
           else {
          notaCata.classList.remove("is-invalid");
          notaCata.nextElementSibling.innerHTML = "";
        }
      });

      //valicaciones input img

      img.addEventListener('input', ()=>{
        //separa la extension del resto del string
        let fileExt = img.value.split('.').pop();
        let extensiones = ["png", "jpg", "jpeg", "webp"];
        //revisa si algunas de mis extensiones permitidas coincide
        if (extensiones.includes(fileExt) == false) {
            img.classList.add('is-invalid');
            img.nextElementSibling.innerHTML = "Solo de admiten archivos .jpeg, .jpg, .png y .webp";        
        }else{
          img.classList.remove("is-invalid");
          img.nextElementSibling.innerHTML = "";
        }
    })

    //validaciones campo precio
    precio.addEventListener('blur', ()=>{
      if (precio.value.trim() == "") {
        precio.classList.add("is-invalid");
        precio.nextElementSibling.innerHTML = "El campo precio no puede estar vacío";
      }
    })

    precio.addEventListener('input', ()=>{
      if (precio.value.trim() == "") {
        precio.classList.add("is-invalid");
        precio.nextElementSibling.innerHTML = "El campo precio no puede estar vacío";
    }
    else if(precio.value < 1000 || precio.value > 20000){
      precio.classList.add("is-invalid");
      precio.nextElementSibling.innerHTML = "Ingrese un precio entre $1.000 y $20.000";
    }
       else {
      precio.classList.remove("is-invalid");
      precio.nextElementSibling.innerHTML = "";
    }
    })


     //validaciones campo stock
     stock.addEventListener('blur', ()=>{
      if (stock.value.trim() == "") {
        stock.classList.add("is-invalid");
        stock.nextElementSibling.innerHTML = "El campo stock no puede estar vacío";
      }
    })

    stock.addEventListener('input', ()=>{
      if (stock.value.trim() == "") {
        stock.classList.add("is-invalid");
        stock.nextElementSibling.innerHTML = "El campo stock no puede estar vacío";
    }
    else if(stock.value == 0){
      stock.classList.add("is-invalid");
      stock.nextElementSibling.innerHTML = "El stock no puede ser 0";
    }
    else if(stock.value > 1000){
      stock.classList.add("is-invalid");
      stock.nextElementSibling.innerHTML = "Sólo tenemos permitido guardar hasta 1000 unidades";
    }
       else {
      stock.classList.remove("is-invalid");
      stock.nextElementSibling.innerHTML = "";
    }
    })
})