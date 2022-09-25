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
    let inputs = [firstName, lastName, address, floor, city, password, email, birthDate, profileImg];
    

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
    firstName.addEventListener('input', ()=>{
        if (firstName.value == "") {
            Object.defineProperty(errores,'firstName',{value:"El nombre es obligatorio",configurable: true});
            firstName.classList.add('input-warning');
            errorWarning(firstName, errores.firstName);
        }else if(firstName.value.length <=2) {
            Object.defineProperty(errores,'firstName',{value:"El nombre debe contener al menos 3 carácteres",configurable: true});
                firstName.classList.add('input-warning');
                errorWarning(firstName, errores.firstName);
        }else{
            delError(firstName);
        }
    })

    //apellido
    lastName.addEventListener('blur', ()=>{
        if (lastName.value == "") {
            Object.defineProperty(errores,'lastName',{value:"El apellido es obligatorio",configurable: true});
            lastName.classList.add('input-warning');
            errorWarning(lastName, errores.lastName);
        }else if (lastName.value.length <=2) {
            Object.defineProperty(errores,'lastName',{value:"El apellido debe contener al menos 3 carácteres",configurable: true});
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
                Object.defineProperty(errores,'address',{value:"Ingresa una direccion válida",configurable: true});
                address.classList.add('input-warning');
                errorWarning(address, errores.address);
            }else if (!address.value.match(expresion)) {
                Object.defineProperty(errores,'address',{value:"Debes incluir la numeración",configurable: true});
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
                Object.defineProperty(errores,'floor',{value:"Ingresa un piso válido",configurable: true});
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
                Object.defineProperty(errores,'password',{value:"La contraseña debe de tener como mínimo 8 carácteres",configurable: true});
                password.classList.add('input-warning');
                errorWarning(password, errores.password);
            }
            let expresion = (/^(?=.*[0-9])(?=.*[!@#$_.^&*])[a-zA-Z0-9!@#$_.^&*]{8,16}$/);
            if (!password.value.match(expresion)) {
                Object.defineProperty(errores,'password',{value:"La contraseña debe de tener un numero, una mayuscula y un caracter especial",configurable: true});
                password.classList.add('input-warning');
                errorWarning(password, errores.password);
            }
            else{
                delError(password);
            }
        }else{
            delError(password);
        }
    })
    
    //email
    email.addEventListener('blur', ()=>{
        if (email.value == undefined) {
            Object.defineProperty(errores,'email',{value:"El email es obligatorio",configurable: true});
            email.classList.add('input-warning');
            errorWarning(email, errores.email);
        }
        if (email.value.length <5 || !email.value.includes("@")) {
            Object.defineProperty(errores,'email',{value:"Ingresa un email válido",configurable: true});
            email.classList.add('input-warning');
            errorWarning(email, errores.email);
        }else{
            delError(email);
        }
    })
    
    //fecha Nacimiento
    birthDate.addEventListener('change', ()=>{
        if (birthDate.value == "") {
            Object.defineProperty(errores,'birthDate',{value:"La edad es obligatoria",configurable: true});
            birthDate.classList.add('input-warning');
            errorWarning(birthDate, errores.birthDate);
        }
        let edadMinima = "2002/01/01";
        if (birthDate.value > edadMinima) {
            Object.defineProperty(errores,'birthDate',{value:"Debes tener 18 años o más",configurable: true});
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
            Object.defineProperty(errores,'profileImg',{value:"Solo de admiten archivos .jpeg, .jpg, .png y .webp",configurable: true});
            errorWarning(profileImg, errores.profileImg);
        }else{
            delError(profileImg);
        }
    })
    let resFetch;
    form.addEventListener('submit', async(e)=>{
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
            resFetch = await editProfileProcess(bodyInputs);
       }

        if (resFetch.errors != undefined) {
            resFetch.errors.errors.forEach((error) => {
                inputs.forEach((input) => {
                    if (input.name == error.param) {
                        input.classList.add('input-warning');
                        errorWarning(input, error.msg);
                    }
                });
            });
        }
    })

