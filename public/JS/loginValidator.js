window.addEventListener("load", (e) => {
  //capturando inputs y form
  let inputEmail = document.querySelector("#email");
  let inputPass = document.querySelector("#password");
  let formulario = document.querySelector("form");

  let arrInp = [inputEmail, inputPass];

  formulario.addEventListener("submit", (e) => {
    arrInp.forEach((inp) => {
      if (inp.value.length < 1) {
        inp.classList.add("is-invalid");
        inp.nextElementSibling.innerHTML = 'Éste campo no puede estar vacío'        
        e.preventDefault();
      }
      if (inp.value != "") {
        inp.classList.remove("is-invalid");
      }
    });
  });

  inputEmail.addEventListener("blur", () => {
    let mostrar = document.querySelector("#er");
    if (inputEmail.value == "") {
      inputEmail.classList.add("is-invalid");
      mostrar.innerHTML = "El campo email no puede estar vacío";
    }
  });

  inputEmail.addEventListener("input", () => {
    let mostrar = document.querySelector("#er");
    const emailValido = (email) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };
    if (inputEmail.value.length < 2) {
      inputEmail.classList.add("is-invalid");
      mostrar.innerHTML = "El campo debe tener más de dos carácteres";
      return;
    } else if (!emailValido(inputEmail.value)) {
      inputEmail.classList.add("is-invalid");
      mostrar.innerHTML = "Debe de ingresarse un email válido";
    } else {
      inputEmail.classList.remove("is-invalid");
      mostrar.innerHTML = "";
    }
  });

  inputPass.addEventListener("blur", () => {
    let mostrar2 = document.querySelector("#er2");
    if (inputPass.value == "") {
      inputPass.classList.add("is-invalid");
      mostrar2.innerHTML = "El campo contraseña no puede estar vacío";
    } 
  });
  inputPass.addEventListener("input", () => {
    const password = /^(?=.*[0-9])(?=.*[!@#$_.^&*])[a-zA-Z0-9!@#$_.^&*]{8,16}$/;
    
    let mostrar2 = document.querySelector("#er2");
    if (inputPass.value.length < 8) {
      inputPass.classList.add("is-invalid");
      mostrar2.innerHTML = "El campo debe tener más de ocho carácteres";
    } 
    else if(!inputPass.value.match(password)){
      inputPass.classList.add("is-invalid");
      mostrar2.innerHTML = "La contraseña debe de tener un numero, una mayuscula y un caracter especial"
    }
    else {
      inputPass.classList.remove("is-invalid");
      mostrar2.innerHTML = "";
    }
  });
});
