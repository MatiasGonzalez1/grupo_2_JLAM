window.addEventListener('load', () => {
    //formulario visible/
    const paymentVisible = document.getElementById('checkoutNext');
    const shippingVisible = document.getElementById('checkoutPrev');
    const paymentData = document.getElementById('paymentData');
    const shippingForm = document.getElementById('shippingForm');
    const paymentForm = document.getElementById('paymentForm');
   

    
    paymentVisible.addEventListener("click", () => {
      paymentData.classList.toggle("disabled");
      paymentData.classList.toggle("enabled");
      shippingForm.classList.toggle("checkout-hidden");
      paymentForm.classList.toggle("checkout-hidden");
    });

    shippingVisible.addEventListener("click", () => {
      paymentData.classList.toggle("disabled");
      paymentData.classList.toggle("enabled");
      shippingForm.classList.toggle("checkout-hidden");
      paymentForm.classList.toggle("checkout-hidden");
    });
    
    //formulario
    let form = document.querySelector("form.form-checkout");

    //inputs datos del envio
    let nameCheck = document.querySelector("input.checkoutName");
    let lastNameCheck = document.querySelector("input.checkoutLastName");
    let emailheck = document.querySelector("input.checkoutEmail");
    let cityCheck = document.querySelector("select.checkoutCity");
    let addressCheck = document.querySelector("input.checkoutAddress");
    let floorCheck = document.querySelector("input.checkoutFloor");
    let numberCheck = document.querySelector(".card__number");
    let nameSurCheck = document.querySelector(".name__user");
    let dateCheck = document.querySelector(".date__card");
    let codeCheck = document.querySelector(".code__segurity");
    let dniCheck = document.querySelector(".dni__user");

    //inputs medio de pago - pendientes
    let errores = {};

    //funcion que quita mi clase cuando pasa la validacion y elimina el mensaje de error
    function delError(param) {
        param.classList.remove('input-warning');
        param.nextElementSibling.innerHTML = "";
        param.nextElementSibling.style.display = 'none';
        delete errores.param;
    }

    //funcion que genera mi html (recibe el input a aplicar y el error)
    function errorWarning(input, error) {
        input.nextElementSibling.innerHTML = error;
        input.nextElementSibling.style.display = 'block';
    }


    // //nombre
    nameCheck.addEventListener('input', () => {
        if (nameCheck.value == "") {
            errores.nameCheck = "El nombre es obligatorio"
            nameCheck.classList.add('input-warning');
            errorWarning(nameCheck, errores.nameCheck);
        } else if (nameCheck.value.length <= 2) {
            errores.nameCheck = "El nombre debe contener al menos 3 carácteres"
            nameCheck.classList.add('input-warning');
            errorWarning(nameCheck, errores.nameCheck);
        } else {
            delError(nameCheck);
        }
    })

    //apellido
    lastNameCheck.addEventListener('input', () => {
        if (lastNameCheck.value == "") {
            errores.lastNameCheck = "El apellido es obligatorio"
            lastNameCheck.classList.add('input-warning');
            errorWarning(lastNameCheck, errores.lastNameCheck);
        } else if (lastNameCheck.value.length <= 2) {
            errores.lastNameCheck = "El apellido debe contener al menos 3 carácteres"
            lastNameCheck.classList.add('input-warning');
            errorWarning(lastNameCheck, errores.lastNameCheck);
        } else {
            delError(lastNameCheck);
        }
    })

    //email
    emailheck.addEventListener('input', () => {
        if (emailheck.value == "") {
            errores.emailheck = "El email es obligatorio"
            emailheck.classList.add('input-warning');
            errorWarning(emailheck, errores.emailheck);
        } else if (emailheck.value.length < 5 || !emailheck.value.includes("@")) {
            errores.emailheck = "Ingresa un email válido"
            emailheck.classList.add('input-warning');
            errorWarning(emailheck, errores.emailheck);
        } else {
            delError(emailheck);
        }
    })

    //ciudad
    cityCheck.addEventListener('blur', () => {
        if (cityCheck.value == "") {
            errores.cityCheck = "La ciudad es obligatoria";
            cityCheck.classList.add('input-warning');
            errorWarning(cityCheck, errores.cityCheck);
        } else {
            delError(cityCheck);
        }
    });

    //direccion
    addressCheck.addEventListener('input', () => {
        let expresion = (/\d/);
        if (addressCheck.value == "") {
            errores.addressCheck = "La dirección es obligatoria";
            addressCheck.classList.add('input-warning');
            errorWarning(addressCheck, errores.addressCheck);
        }
        else if (addressCheck.value.length < 4) {
            errores.addressCheck = "Ingresa una direccion válida";
            addressCheck.classList.add('input-warning');
            errorWarning(addressCheck, errores.addressCheck);
        } else if (!addressCheck.value.match(expresion)) {
            errores.addressCheck = "Debes incluir la numeración";
            addressCheck.classList.add('input-warning');
            errorWarning(addressCheck, errores.addressCheck);
        } else {
            delError(addressCheck);
        }
    })

    //departamento
    floorCheck.addEventListener('input', () => {
        if (floorCheck.value != "") {
            if (floorCheck.value.length <= 1) {
                errores.floorCheck = "Ingresa un piso válido"
                floorCheck.classList.add('input-warning');
                errorWarning(floorCheck, errores.floorCheck);
            } else {
                delError(floorCheck);
            }
        } else {
            delError(floorCheck);
        }
    })

    //Validacion para el numero
    numberCheck.addEventListener('input', () =>  {
        if (numberCheck.value == "") {
            errores.numberCheck = "Este campo es obligatorio"
            numberCheck.classList.add('input-warning');
            errorWarning(numberCheck, errores.numberCheck);
        } else if (numberCheck.value.length < 7) {
            errores.numberCheck = "El campo debe tener al menos 8 números"
            numberCheck.classList.add('input-warning');
            errorWarning(numberCheck, errores.numberCheck);
        } else {
            delError(numberCheck)
        }

    });

    //Validacion para el nombre y apellido
    nameSurCheck.addEventListener('input', function () {
        if (nameSurCheck.value == "") {
            errores.nameSurCheck = "El campo nombre y apellido no puede estar vacío"
            nameSurCheck.classList.add('input-warning');
            errorWarning(nameSurCheck, errores.nameSurCheck);
        } else if (nameSurCheck.value.length < 5) {
            errores.nameSurCheck = "Este campo debe tener al menos cinco caracteres y no pueden ser especiales"
            nameSurCheck.classList.add('input-warning');
            errorWarning(nameSurCheck, errores.nameSurCheck);
        } else {
            delError(nameSurCheck);
        }

    });

    //Validacion para la fecha de expiracion
    dateCheck.addEventListener('change', function () {
        let dateExpi = "2022/01/01"
        let dateExpiracion = "2018/01/01"
        if (dateCheck.value == "") {
            errores.dateCheck = "Debes seleccionar una fecha"
            dateCheck.classList.add('input-warning');
            errorWarning(dateCheck, errores.dateCheck);
        } else if (dateCheck.value > dateExpi || dateCheck.value < dateExpiracion) {
            errores.dateCheck = "Debes ingresar una tarjeta válida"
            dateCheck.classList.add('input-warning');
            errorWarning(dateCheck, errores.dateCheck);
        } else {
            delError(dateCheck)
        }
    });

    //Validacion para el codigo
    codeCheck.addEventListener('input', function () {
        if (codeCheck.value == "") {
            errores.codeCheck = "Este campo es obligatorio"
            codeCheck.classList.add('input-warning');
            errorWarning(codeCheck, errores.codeCheck)
        } else if (codeCheck.value.length < 3) {
            errores.codeCheck = "Este campo debe tener tres carácteres"
            codeCheck.classList.add('input-warning');
            errorWarning(codeCheck, errores.codeCheck)
        } else {
            delError(codeCheck)
        }

    });

    //Validacion para el dni del titular
    dniCheck.addEventListener('input', function () {
        if (dniCheck.value == "") {
            errores.dniCheck = "Este campo es obligatorio"
            dniCheck.classList.add('input-warning');
            errorWarning(dniCheck, errores.dniCheck)
        } else if (dniCheck.value.length < 7) {
            errores.dniCheck = "Este campo debe tener mas de siete carácteres"
            dniCheck.classList.add('input-warning');
            errorWarning(dniCheck, errores.dniCheck)
        } else {
            delError(dniCheck)
        }

    });

    let pass;
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (Object.keys(errores).length >= 1) {
            pass = false
            e.preventDefault()                
        } else {
            pass = true
            form.submit();
        }
        
         
    })
    
    
})