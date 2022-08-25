window.addEventListener("load", (e) => {
  let inputEmail = document.querySelector("#email");
  let inputPass = document.querySelector("#password");
  let formulario = document.querySelector("form");

  let arrInp = [inputEmail, inputPass];

  formulario.addEventListener("submit", (e) => {
    let errores = 0;
    arrInp.forEach((inp) => {
      if (inp.value.length == 0) {
        inp.classList.add("is-invalid");
        
        errores++
      }
      if (inp.value != "") {
        inp.classList.remove("is-invalid");
      }
    });

    if(errores > 0){
        e.preventDefault();
    }
  });

  
    inputEmail.addEventListener('input',()=>{
        let mostrar = document.querySelector('#er')
        const emailValido = email => {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
          }
        if(inputEmail.value == ''){
            inputEmail.classList.add("is-invalid");
                mostrar.innerHTML = 'El campo no puede estar vacío'
                return
            }
         else if(inputEmail.value.length < 2){
            mostrar.innerHTML = 'El campo debe tener más de dos carácteres'
            return
        }
        else if(!emailValido(inputEmail.value)){
            mostrar.innerHTML = 'Debe de ingresarse un email válido'
            return
        }
       // else if() aca voy a comprobar si es un email valido
         
            // else if (inputEmail.value != ''){
            //     inputEmail.classList.remove("is-invalid");
            //     document.querySelector('#er').innerHTML = ''
            // }

            else if (inputEmail.value != ''){
                inputEmail.classList.remove('is-invalid')
                mostrar.innerHTML = ''
            }
  })

  inputPass.addEventListener('input',()=>{
  let mostrar2 = document.querySelector('#er2')
  if(inputPass.value == ''){
    inputPass.classList.add("is-invalid");
        mostrar2.innerHTML = 'El campo no puede estar vacío'
        return
    }
    else if(inputPass.value.length < 8){
        mostrar2.innerHTML = 'El campo debe tener más de ocho carácteres'
    }
    else{
        inputPass.classList.remove('is-invalid')
        mostrar2.innerHTML = ''
    }
    
})

  //cierre del load

  //--------------iconos------------------------
  //<i class="fa-regular fa-hexagon-xmark"></i> equis
  //<i class="fa-solid fa-hexagon-check"></i> check
});
