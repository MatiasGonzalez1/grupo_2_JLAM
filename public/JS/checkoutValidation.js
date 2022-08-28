window.addEventListener('load', ()=>{

    let form = document.querySelector("form.form-checkout");

    //inputs datos del envio
    let nameCheck = document.querySelector("input.checkoutName");
    let lastNameCheck = document.querySelector("input.checkoutLastName");
    let emailheck = document.querySelector("input.checkoutEmail");
    let cityCheck = document.querySelector("select.checkoutCity");
    let addressCheck = document.querySelector("input.checkoutAddress");
    let floorCheck = document.querySelector("input.checkoutFloor");

    //inputs medio de pago - pendientes

    let errores = {};


     //funcion que quita mi clase cuando pasa la validacion y elimina el mensaje de error
    function delError(param) {
        param.classList.remove('input-warning');
        param.nextElementSibling.innerHTML= "";
        param.nextElementSibling.style.display = 'none';
        delete errores.param;
    }
             
    //funcion que genera mi html (recibe el input a aplicar y el error)
    function errorWarning(input, error) {
        input.nextElementSibling.innerHTML= error;
        input.nextElementSibling.style.display = 'block';
    }
        

     // //nombre
     nameCheck.addEventListener('input', ()=>{
        if (nameCheck.value == "") {
            errores.nameCheck = "El nombre es obligatorio"
            nameCheck.classList.add('input-warning');
            errorWarning(nameCheck, errores.nameCheck);
        }else if(nameCheck.value.length <=2) {
                errores.nameCheck = "El nombre debe contener al menos 3 carácteres"
                nameCheck.classList.add('input-warning');
                errorWarning(nameCheck, errores.nameCheck);
        }else{
            delError(nameCheck);
        }
    })

     //apellido
     lastNameCheck.addEventListener('input', ()=>{
        if(lastNameCheck.value == "") {
            errores.lastNameCheck = "El apellido es obligatorio"
            lastNameCheck.classList.add('input-warning');
            errorWarning(lastNameCheck, errores.lastNameCheck);
        }else if(lastNameCheck.value.length <=2) {
            errores.lastNameCheck = "El apellido debe contener al menos 3 carácteres"
            lastNameCheck.classList.add('input-warning');
            errorWarning(lastNameCheck, errores.lastNameCheck);
        }else{
            delError(lastNameCheck);
        }
    })

     //email
     emailheck.addEventListener('input', ()=>{
        if (emailheck.value == "") {
            errores.emailheck = "El email es obligatorio"
            emailheck.classList.add('input-warning');
            errorWarning(emailheck, errores.emailheck);
        }else if(emailheck.value.length <5 || !emailheck.value.includes("@")) {
            errores.emailheck = "Ingresa un email válido"
            emailheck.classList.add('input-warning');
            errorWarning(emailheck, errores.emailheck);
        }else{
            delError(emailheck);
        }
    })

    //ciudad
    cityCheck.addEventListener('blur', ()=>{
        if (cityCheck.value == "") {
            errores.cityCheck = "La ciudad es obligatoria";
            cityCheck.classList.add('input-warning');
            errorWarning(cityCheck, errores.cityCheck);
        }else{
            delError(cityCheck);
        }   
    })

     //direccion
     addressCheck.addEventListener('input', ()=>{
        let expresion = (/\d/);
        if (addressCheck.value == "") {
            errores.addressCheck = "La dirección es obligatoria";
            addressCheck.classList.add('input-warning');
            errorWarning(addressCheck, errores.addressCheck);
        }
        else if (addressCheck.value.length <4) {
            errores.addressCheck = "Ingresa una direccion válida";
            addressCheck.classList.add('input-warning');
            errorWarning(addressCheck, errores.addressCheck);
        }else if (!addressCheck.value.match(expresion)) {
            errores.addressCheck = "Debes incluir la numeración";
            addressCheck.classList.add('input-warning');
            errorWarning(addressCheck, errores.addressCheck);
        }else{
            delError(addressCheck);
        }   
    })

    //departamento
    floorCheck.addEventListener('input', ()=>{
        if (floorCheck.value != "") {
            if (floorCheck.value.length <= 1) {
                errores.floorCheck = "Ingresa un piso válido"
                floorCheck.classList.add('input-warning');
                errorWarning(floorCheck, errores.floorCheck);
            }else{
                delError(floorCheck);
            }
        }else {
            delError(floorCheck);
        }
    })
    
    form.addEventListener('submit', (e)=>{
        e.preventDefault();
       if (Object.keys(errores).length < 1) {
            form.submit();
       }    
    })
})