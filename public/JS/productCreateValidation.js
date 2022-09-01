window.addEventListener('load', ()=>{
   let form = document.querySelector('form');
   let name = document.getElementById('name');
   let categoria = document.getElementById('fcategoria');
   let anioCose = document.getElementById('fcoseAnio');
   let variedad = document.getElementById('fvariety');
   let crianza = document.getElementById('fcrianza');
   let guarda = document.getElementById('fguarda');
   let notaCata = document.getElementById('fnotacata');
   let fimg = document.getElementById('fimg');
   let precio = document.getElementById('fprecio');
   let stock = document.getElementById('fstock');
   let send = document.getElementById('create');

   let errores = {};
      // callbacks de implementacion

    //creacion de elemento HTML para error
    let elemento = (error,input)=>{
      let p = document.createElement('p');
      p.classList.add('product-warning');
      p.setAttribute('id', `${input.name}Err`)
      p.textContent = error
      return p
  }

  //Insercion del elemento creado con el error fijado
  let errorLog = (input, error)=>{

    let errEncontrado = document.getElementById(`${input.name}Err`);

    if(!errEncontrado){
        input.insertAdjacentElement('afterend', elemento(error, input));
    }else{
        input.classList.remove('is-invalid')
        input.nextElementSibling.remove()
        input.insertAdjacentElement('afterend', elemento(error, input));
    }
}

//Eliminación del elemento creado con el error fijado
let delErrorLog = (input)=>{
  input.classList.remove('is-invalid')
  input.nextElementSibling.remove()
}
   const arrInp = [name, categoria, anioCose, variedad, crianza, guarda, notaCata, fimg, precio, stock, send]
   form.addEventListener('submit', (e)=>{
    arrInp.forEach((inp) => {   
    if(inp.value.trim() == ''){
           e.preventDefault()
           inp.classList.add('is-invalid')
           errores.inp = 'El campo no debe estar vacio';
        errorLog(inp, errores.inp);
       }
      })

      if(categoria.value == 'Seleccione una categoría'){
                    categoria.classList.add('is-invalid')
                    errores.categoria = 'Debe seleccionar una categoria';
                    errorLog(categoria, errores.categoria);

                } else{
                    categoria.classList.remove("is-invalid");
                    // let catErr = document.getElementById('fcat');
                    // catErr.innerHTML = '';
        
                }
   })




   //Nombre
   name.addEventListener("blur", () => {
            if (name.value.trim() == "") {
              errores.name = 'El nombre no debe estar vacio';
              errorLog(name, errores.name);
              name.classList.add("is-invalid");
            }
          });
   name.addEventListener('input', ()=>{
    if(name.value == ''){
        errores.name = 'El nombre no debe estar vacio';
        errorLog(name, errores.name);
        name.classList.add('is-invalid');
    }else if (name.value.length < 6){
        errores.name = 'El nombre debe de tener al menos seis carácteres';
        errorLog(name, errores.name);
        name.classList.add('is-invalid');
    }else{
        delErrorLog(name)
        delete errores.name
    }
})

//Categoria
categoria.addEventListener("click", () => {
          if(categoria.value == 'Seleccione una categoría'){
            errores.categoria = 'Debes seleccionar una categoría';
      categoria.classList.add('is-invalid');
      errorLog(categoria, errores.categoria)
          } 
        });
categoria.addEventListener('input',()=>{
        
  if(categoria.value == 'Seleccione una categoría'){
      errores.categoria = 'Debes seleccionar una categoría';
      categoria.classList.add('is-invalid');
      errorLog(categoria, errores.categoria)
  }else{
      delErrorLog(categoria)
      delete errores.categoria
  }
})

//Año de cosecha
anioCose.addEventListener('blur', ()=>{
          if (anioCose.value.trim() == "") {
            errores.anioCose = 'El campo año de cosecha no puede estar vacío';
      errorLog(anioCose, errores.anioCose);
      anioCose.classList.add('is-invalid');
          }
        })
anioCose.addEventListener('input',()=>{
  if(anioCose.value == ''){
      errores.anioCose = 'El campo año de cosecha no puede estar vacío';
      errorLog(anioCose, errores.anioCose);
      anioCose.classList.add('is-invalid');
  }else if(anioCose.value < 1900 || anioCose.value > 2022){
    errores.anioCose = 'Ingrese un año de cosecha entre 1900 y 2022';
    errorLog(anioCose, errores.anioCose);
    anioCose.classList.add('is-invalid');
  }else{
    delErrorLog(anioCose)
      delete errores.anioCose
  }
})

 //Variedad 
 variedad.addEventListener('blur', ()=>{
          if (variedad.value.trim() == "") {
            errores.variedad = 'El campo variedad no puede estar vacío';
            errorLog(variedad, errores.variedad)
            variedad.classList.add('is-invalid');
          }
        })
 variedad.addEventListener('input',()=>{
  if(variedad.value == ''){
      errores.variedad = 'El campo variedad no puede estar vacío';
      errorLog(variedad, errores.variedad)
      variedad.classList.add('is-invalid');
  }else if (variedad.value.length < 6){
      errores.variedad = 'El nombre debe de tener al menos seis carácteres';
      errorLog(variedad, errores.variedad);
      variedad.classList.add('is-invalid');
  }else{
      delErrorLog(variedad)
      delete errores.variedad
  }
})

//Crianza
crianza.addEventListener('blur', ()=>{
          if (crianza.value.trim() == "") {
            errores.crianza = 'El campo crianza no puede estar vacío';
            errorLog(crianza, errores.crianza)
            crianza.classList.add('is-invalid');
          }
        })
crianza.addEventListener('input',()=>{
  if(crianza.value == ''){
      errores.crianza = 'El campo crianza no puede estar vacío';
      errorLog(crianza, errores.crianza)
      crianza.classList.add('is-invalid');
  }else if (crianza.value.length < 6){
      errores.crianza = 'Crianza debe de tener al menos seis carácteres';
      errorLog(crianza, errores.crianza);
      crianza.classList.add('is-invalid');
  }else{
      delErrorLog(crianza)
      delete errores.crianza
  }
})

 //Guarda 
 guarda.addEventListener('blur', ()=>{
          if (guarda.value.trim() == "") {
            errores.guarda = 'El campo guarda no puede estar vacío';
            errorLog(guarda, errores.guarda)
            guarda.classList.add('is-invalid');
          }
        })
 guarda.addEventListener('input',()=>{
  if(guarda.value == ''){
      errores.guarda = 'El campo guarda no puede estar vacío';
      errorLog(guarda, errores.guarda)
      guarda.classList.add('is-invalid');
  }else if (guarda.value.length < 5){
      errores.guarda = 'Guarda debe de tener al menos cinco carácteres';
      errorLog(guarda, errores.guarda);
      guarda.classList.add('is-invalid');
  }else{
      delErrorLog(guarda)
      delete errores.guarda
  }
})

//notaCata 
notaCata.addEventListener('blur', ()=>{
          if (notaCata.value.trim() == "") {
            errores.notaCata = 'El campo nota cata no puede estar vacío';
            errorLog(notaCata, errores.notaCata)
            notaCata.classList.add('is-invalid');
          }
        })
notaCata.addEventListener('input',()=>{
  if(notaCata.value == ''){
      errores.notaCata = 'El campo nota cata no puede estar vacío';
      errorLog(notaCata, errores.notaCata)
      notaCata.classList.add('is-invalid');
  }else if (notaCata.value.length < 40){
      errores.notaCata = 'La descripcion del producto debe tener al menos cuarenta carácteres';
      errorLog(notaCata, errores.notaCata);
      notaCata.classList.add('is-invalid');
  }else{
      delErrorLog(notaCata)
      delete errores.notaCata
  }
})

//Imagen
fimg.addEventListener('input', ()=>{
  let fileExt = fimg.value.split('.').pop();
  let extensiones = ["png", "jpg", "jpeg", "webp"];

  if (extensiones.includes(fileExt) == false) {
      errores.fimg = "Solo de admiten archivos .jpeg, .jpg, .png y .webp";
      errorLog(fimg, errores.fimg)    
      fimg.classList.add('is-invalid');
  }else{
      delErrorLog(fimg)
      delete errores.fimg
  }
})

//Precio
precio.addEventListener('blur', ()=>{
        if (precio.value.trim() == "") {
          errores.precio = 'El campo precio no puede estar vacío';
          errorLog(precio, errores.precio)
          precio.classList.add('is-invalid');
        }
      })
precio.addEventListener('input',()=>{
  if(precio.value == ''){
      errores.precio = 'El campo precio no puede estar vacío';
      errorLog(precio, errores.precio)
      precio.classList.add('is-invalid');
  }else if(precio.value < 1000 || precio.value > 20000){
    errores.precio = 'Ingrese un precio entre $1.000 y $20.000';
      errorLog(precio, errores.precio)
      precio.classList.add('is-invalid');
  }
  else{
      delErrorLog(precio)
      delete errores.precio
  }
})

//stock
stock.addEventListener('blur', ()=>{
        if (stock.value.trim() == "") {
          errores.stock = 'El campo stock no puede estar vacío';
          errorLog(stock, errores.stock)
          stock.classList.add('is-invalid');
        }
      })
stock.addEventListener('input',()=>{
  if(stock.value == ''){
      errores.stock = 'El campo stock no puede estar vacío';
      errorLog(stock, errores.stock)
      stock.classList.add('is-invalid');
  }else if(stock.value == 0){
    errores.stock = 'El stock no puede ser 0';
    errorLog(stock, errores.stock)
    stock.classList.add('is-invalid');
  } else if(stock.value > 1000){
    errores.stock = 'Sólo tenemos permitido guardar hasta 1000 unidades';
    errorLog(stock, errores.stock)
    stock.classList.add('is-invalid');
  }
  else{
      delErrorLog(stock)
      delete errores.stock
  }
})

//    const arrInp = [name, categoria, anioCose, variedad, crianza, guarda, notaCata, img, precio, stock, send]
//     form.addEventListener("submit", (e) => {
//         arrInp.forEach((inp) => {
//           if (inp.value.trim() == '') {
//             inp.classList.add("is-invalid");
//             inp.nextElementSibling.innerHTML = 'Éste campo no puede estar vacío'
//             e.preventDefault()
//           }

//           if (inp.value != "") {
//             inp.classList.remove("is-invalid");
//           }
//         }
        
//         );

//         if(categoria.value == 'Seleccione una categoría'){
//             categoria.classList.add("is-invalid");
//             let catErr = document.getElementById('fcat');
//             catErr.innerHTML = 'Debes seleccionar una categoría';
//         } else{
//             categoria.classList.remove("is-invalid");
//             let catErr = document.getElementById('fcat');
//             catErr.innerHTML = '';

//         }
//       });
// //validaciones campo nombre
//       name.addEventListener("blur", () => {
//         if (name.value.trim() == "") {
//           name.classList.add("is-invalid");
//           name.nextElementSibling.innerHTML = "El campo nombre no puede estar vacío";
//         }
//       });
//       name.addEventListener("input", () => {
//         if (name.value.trim() == "") {
//             name.classList.add("is-invalid");
//             name.nextElementSibling.innerHTML = "El campo nombre no puede estar vacío";
//         }
//         else if (name.value.length < 5) {
//             name.classList.add("is-invalid");
//             name.nextElementSibling.innerHTML = "El campo nombre debe tener más de 5 carácteres";        
//         }
//            else {
//           name.classList.remove("is-invalid");
//           name.nextElementSibling.innerHTML = "";
//         }
//       });

//       //validaciones campo categoria
//       categoria.addEventListener("click", () => {
//         if(categoria.value == 'Seleccione una categoría'){
//             categoria.classList.add("is-invalid");
//             let catErr = document.getElementById('fcat');
//             catErr.innerHTML = 'Debes seleccionar una categoría';
//         } else {
//             categoria.classList.remove("is-invalid");
//             let catErr = document.getElementById('fcat');
//             catErr.innerHTML = '';
//         }
//       });
//       categoria.addEventListener("input", () => {
//         if(categoria.value == 'Seleccione una categoría'){
//             categoria.classList.add("is-invalid");
//             let catErr = document.getElementById('fcat');
//             catErr.innerHTML = 'Debes seleccionar una categoría';
//         } else {
//             categoria.classList.remove("is-invalid");
//             let catErr = document.getElementById('fcat');
//             catErr.innerHTML = '';
//         }
//       });
//       //validaciones campo año cosecha
//       anioCose.addEventListener('blur', ()=>{
//         if (anioCose.value.trim() == "") {
//           anioCose.classList.add("is-invalid");
//           anioCose.nextElementSibling.innerHTML = "El campo año de cosecha no puede estar vacío";
//         }
//       })

//       anioCose.addEventListener('input', ()=>{
//         if (anioCose.value.trim() == "") {
//           anioCose.classList.add("is-invalid");
//           anioCose.nextElementSibling.innerHTML = "El campo año de cosecha no puede estar vacío";
//       }
//       else if(anioCose.value < 1900 || anioCose.value > 2022){
//         anioCose.classList.add("is-invalid");
//         anioCose.nextElementSibling.innerHTML = "Ingrese un año de cosecha entre 1900 y 2022";
//       }
//          else {
//         anioCose.classList.remove("is-invalid");
//         anioCose.nextElementSibling.innerHTML = "";
//       }
//       })


//       //validaciones campo variedad

//       variedad.addEventListener('blur', ()=>{
//         if (variedad.value.trim() == "") {
//           variedad.classList.add("is-invalid");
//           variedad.nextElementSibling.innerHTML = "El campo variedad no puede estar vacío";
//         }
//       })

//       variedad.addEventListener("input", () => {
//         if (variedad.value.trim() == "") {
//             variedad.classList.add("is-invalid");
//             variedad.nextElementSibling.innerHTML = "El campo variedad no puede estar vacío";
//         }
//         else if (variedad.value.length < 5) {
//             variedad.classList.add("is-invalid");
//             variedad.nextElementSibling.innerHTML = "El campo variedad debe tener más de 5 carácteres";        
//         }
//            else {
//           variedad.classList.remove("is-invalid");
//           variedad.nextElementSibling.innerHTML = "";
//         }
//       });

//       //validaciones campo crianza
//       crianza.addEventListener('blur', ()=>{
//         if (crianza.value.trim() == "") {
//           crianza.classList.add("is-invalid");
//           crianza.nextElementSibling.innerHTML = "El campo crianza no puede estar vacío";
//         }
//       })

//       crianza.addEventListener("input", () => {
//         if (crianza.value.trim() == "") {
//             crianza.classList.add("is-invalid");
//             crianza.nextElementSibling.innerHTML = "El campo crianza no puede estar vacío";
//         }
//         if (crianza.value.length < 5) {
//             crianza.classList.add("is-invalid");
//             crianza.nextElementSibling.innerHTML = "El campo crianza debe tener más de 5 carácteres";        
//         }
//            else {
//           crianza.classList.remove("is-invalid");
//           crianza.nextElementSibling.innerHTML = "";
//         }
//       });

//       //validaciones campo potencial de guarda
//       guarda.addEventListener('blur', ()=>{
//         if (guarda.value.trim() == "") {
//           guarda.classList.add("is-invalid");
//           guarda.nextElementSibling.innerHTML = "El campo guarda no puede estar vacío";
//         }
//       })

//       guarda.addEventListener("input", () => {
//         if (guarda.value.trim() == "") {
//             guarda.classList.add("is-invalid");
//             guarda.nextElementSibling.innerHTML = "El campo guarda no puede estar vacío";
//         }
//         if (guarda.value.length < 5) {
//             guarda.classList.add("is-invalid");
//             guarda.nextElementSibling.innerHTML = "El campo guarda debe tener más de 5 carácteres";        
//         }
//            else {
//           guarda.classList.remove("is-invalid");
//           guarda.nextElementSibling.innerHTML = "";
//         }
//       });

//       //validaciones campo nota cata
//       notaCata.addEventListener('blur', ()=>{
//         if (notaCata.value.trim() == "") {
//           notaCata.classList.add("is-invalid");
//           notaCata.nextElementSibling.innerHTML = "El campo nota cata no puede estar vacío";
//         }
//       })

//       notaCata.addEventListener("input", () => {
//         if (notaCata.value.trim() == "") {
//             notaCata.classList.add("is-invalid");
//             notaCata.nextElementSibling.innerHTML = "El campo nota cata no puede estar vacío";
//         }
//         if (notaCata.value.length < 40) {
//             notaCata.classList.add("is-invalid");
//             notaCata.nextElementSibling.innerHTML = "El campo nota cata debe tener almenos 40 carácteres";        
//         }
//            else {
//           notaCata.classList.remove("is-invalid");
//           notaCata.nextElementSibling.innerHTML = "";
//         }
//       });

//       //valicaciones input img

//       img.addEventListener('input', ()=>{
//         //separa la extension del resto del string
//         let fileExt = img.value.split('.').pop();
//         let extensiones = ["png", "jpg", "jpeg", "webp"];
//         //revisa si algunas de mis extensiones permitidas coincide
//         if (extensiones.includes(fileExt) == false) {
//             img.classList.add('is-invalid');
//             img.nextElementSibling.innerHTML = "Solo de admiten archivos .jpeg, .jpg, .png y .webp";        
//         }else{
//           img.classList.remove("is-invalid");
//           img.nextElementSibling.innerHTML = "";
//         }
//     })

//     //validaciones campo precio
//     precio.addEventListener('blur', ()=>{
//       if (precio.value.trim() == "") {
//         precio.classList.add("is-invalid");
//         precio.nextElementSibling.innerHTML = "El campo precio no puede estar vacío";
//       }
//     })

//     precio.addEventListener('input', ()=>{
//       if (precio.value.trim() == "") {
//         precio.classList.add("is-invalid");
//         precio.nextElementSibling.innerHTML = "El campo precio no puede estar vacío";
//     }
//     else if(precio.value < 1000 || precio.value > 20000){
//       precio.classList.add("is-invalid");
//       precio.nextElementSibling.innerHTML = "Ingrese un precio entre $1.000 y $20.000";
//     }
//        else {
//       precio.classList.remove("is-invalid");
//       precio.nextElementSibling.innerHTML = "";
//     }
//     })


//      //validaciones campo stock
//      stock.addEventListener('blur', ()=>{
//       if (stock.value.trim() == "") {
//         stock.classList.add("is-invalid");
//         stock.nextElementSibling.innerHTML = "El campo stock no puede estar vacío";
//       }
//     })

//     stock.addEventListener('input', ()=>{
//       if (stock.value.trim() == "") {
//         stock.classList.add("is-invalid");
//         stock.nextElementSibling.innerHTML = "El campo stock no puede estar vacío";
//     }
//     else if(stock.value == 0){
//       stock.classList.add("is-invalid");
//       stock.nextElementSibling.innerHTML = "El stock no puede ser 0";
//     }
//     else if(stock.value > 1000){
//       stock.classList.add("is-invalid");
//       stock.nextElementSibling.innerHTML = "Sólo tenemos permitido guardar hasta 1000 unidades";
//     }
//        else {
//       stock.classList.remove("is-invalid");
//       stock.nextElementSibling.innerHTML = "";
//     }
//     })
})