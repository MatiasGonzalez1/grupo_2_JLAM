    let form = document.querySelector("form.formulario");
    let firstName = document.querySelector("input.nombre");
    let lastName = document.querySelector("input.apellido");
    let address = document.querySelector("input.direccion");
    let floor = document.querySelector("input.departamento");
    let city = document.querySelector("select.ciudad");
    let password = document.querySelector("input.editPassword");
    let email = document.querySelector("input.email");
    let birthDate = document.querySelector("input.fechaNacimiento");
    let profileImg = document.querySelector("input.profileImageUser");


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
    firstName.addEventListener('blur', ()=>{
        if (firstName.value == "") {
            errores.firstName = "El nombre es obligatorio"
            firstName.classList.add('input-warning');
            errorWarning(firstName, errores.firstName);
        }else if(firstName.value.length <=2) {
                errores.firstName = "El nombre debe contener al menos 3 carácteres"
                firstName.classList.add('input-warning');
                errorWarning(firstName, errores.firstName);
        }else{
            delError(firstName);
        }
    })

    //apellido
    lastName.addEventListener('blur', ()=>{
        if (lastName.value == "") {
            errores.lastName = "El apellido es obligatorio"
            lastName.classList.add('input-warning');
            errorWarning(lastName, errores.lastName);
        }else if (lastName.value.length <=2) {
            errores.lastName = "El apellido debe contener al menos 3 carácteres"
            lastName.classList.add('input-warning');
            errorWarning(lastName, errores.lastName);
        }else{
            delError(lastName);
        }
    })
    
    //direccion
    address.addEventListener('blur', ()=>{
        let expresion = (/\d/);
        if (address.value != "") {
            if (address.value.length <3) {
                errores.address = "Ingresa una direccion válida";
                address.classList.add('input-warning');
                errorWarning(address, errores.address);
            }else if (!address.value.match(expresion)) {
                errores.address = "Debes incluir la numeración";
                address.classList.add('input-warning');
                errorWarning(address, errores.address);
            }else{
                delError(address);
            }
        }
    })
    
    //departamento
    floor.addEventListener('blur', ()=>{
        if (floor.value != "") {
            if (floor.value.length <= 1) {
                errores.floor = "Ingresa un piso válido"
                floor.classList.add('input-warning');
                errorWarning(floor, errores.floor);
            }if (floor.value.length > 2) {
                delError(floor);
            }
        }else {
            delError(floor);
        }
    })

    //contraseña
    password.addEventListener('blur', ()=>{
        if (password.value != "") {
            if (password.value.length <8) {
                errores.password = "La contraseña debe de tener como mínimo 8 carácteres"
                password.classList.add('input-warning');
                errorWarning(password, errores.password);
            }
            let expresion = (/^(?=.*[0-9])(?=.*[!@#$_.^&*])[a-zA-Z0-9!@#$_.^&*]{8,16}$/);
            if (!password.value.match(expresion)) {
                errores.password = "La contraseña debe de tener un numero, una mayuscula y un caracter especial"
                password.classList.add('input-warning');
                errorWarning(password, errores.password);
            }
            else{
                delError(password);
            }
        }
    })
    
    //email
    email.addEventListener('blur', ()=>{
        if (email.value == undefined) {
            errores.email = "El email es obligatorio"
            email.classList.add('input-warning');
            errorWarning(email, errores.email);
        }
        if (email.value.length <5 || !email.value.includes("@")) {
            errores.email = "Ingresa un email válido"
            email.classList.add('input-warning');
            errorWarning(email, errores.email);
        }else{
            delError(email);
        }
    })
    
    //fecha Nacimiento
    birthDate.addEventListener('change', ()=>{
        if (birthDate.value == "") {
            errores.birthDate = "La edad es obligatoria"
            birthDate.classList.add('input-warning');
            errorWarning(birthDate, errores.birthDate);
        }
        let edadMinima = "2002/01/01";
        if (birthDate.value > edadMinima) {
            errores.birthDate = "Debes tener 18 años o más"
            birthDate.classList.add('input-warning');
            errorWarning(birthDate, errores.birthDate);
        }else{
            delError(birthDate);
        }
    })
    
    //imagen
    profileImg.addEventListener('input', ()=>{
        //separa la extension del resto del string
        let fileExt = profileImg.value.split('.').pop();
        let extensiones = ["png", "jpg", "jpeg", "webp"];
        //revisa si algunas de mis extensiones permitidas coincide
        if (extensiones.includes(fileExt) == false) {
            profileImg.classList.add('input-warning');
            errores.profileImg = "Solo de admiten archivos .jpeg, .jpg, .png y .webp"
            errorWarning(profileImg, errores.profileImg);
        }else{
            delError(profileImg);
        }
    })

    form.addEventListener('submit', (e)=>{
        e.preventDefault();
       if (Object.keys(errores).length < 1) {
           
             let userId = document.querySelector("input.userId");
             //genero un form nuevo para enviarle al backend lo que inserto el usuario
             bodyInputs = new FormData();
             //seteo los valores dentro de mi form
             bodyInputs.set("id", userId.value);
             bodyInputs.set("nombre", firstName.value);
             bodyInputs.set("apellido", lastName.value);
             bodyInputs.set("email", email.value);
             bodyInputs.set("fechaNacimiento", birthDate.value);
             bodyInputs.set("profileImage", profileImg.files[0]);
             if (Object.keys(password.value).length > 1) {
                bodyInputs.set("password", password.value);
             }
             if (city.value != undefined && Object.keys(city.value).length > 1) {
                bodyInputs.set("codigoPostal", city.value);
             }
             if (address.value) {
                bodyInputs.set("direccion", address.value);
             }
             if(floor.value) {
                bodyInputs.set("departamento", floor.value);;
             }
 
             //ejecuto la funcion que llama a mi fetch y le envio mi objeto con los datos del body
             editProfileProcess(bodyInputs);
       }    
    })

