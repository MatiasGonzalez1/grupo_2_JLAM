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
      mostrar.innerHTML = "El campo no puede estar vacío";
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
      mostrar2.innerHTML = "El campo no puede estar vacío";
    } 
  });
  inputPass.addEventListener("input", () => {
    let mostrar2 = document.querySelector("#er2");
    if (inputPass.value.length < 8) {
      inputPass.classList.add("is-invalid");
      mostrar2.innerHTML = "El campo debe tener más de ocho carácteres";
    } else {
      inputPass.classList.remove("is-invalid");
      mostrar2.innerHTML = "";
    }
  });

  //cierre del load

  //--------------iconos------------------------
  //<i class="fa-regular fa-hexagon-xmark"></i> equis
  //<i class="fa-solid fa-hexagon-check"></i> check
});
