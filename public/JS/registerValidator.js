
//Variables globales
let isEmpty;
let resFetch;

//Capturo los inputs de mi form
let formRegister = document.querySelector("form.formulario");
let campoNombre = document.querySelector("input.nombre");
let campoApellido = document.querySelector("input.apellido");
let campoEmail = document.querySelector("input.email");
let campoDate = document.querySelector("input.fechaNacimiento");
let campoPassword = document.querySelector("input.password");
let campoRepassword = document.querySelector("input.repassword");
let campoProfileImage = document.querySelector("input.profileImage");

//Creo objeto que almacena mis errores
let errores = {};
let arrayCampos = [campoNombre, campoApellido, campoEmail, campoDate, campoPassword, campoRepassword, campoProfileImage];

//funciones 
let crearError = (input, error)=>{
    input.classList.add('is-invalid');
    input.nextElementSibling.innerHTML = error;
}

let delError = (input)=>{
    input.classList.remove('is-invalid');
    input.nextElementSibling.innerHTML = '';
}

//Validacion para el nombre
campoNombre.addEventListener('input', function () {
    if (campoNombre.value == "") {
        crearError(campoNombre,"El campo nombre no puede estar vacío")
        errores.campoNombre = "El campo nombre no puede estar vacío"
    } else if (campoNombre.value.length < 3) {
        crearError(campoNombre,"El nombre debe tener al menos tres caracteres y no pueden ser especiales")
        errores.campoNombre = "El nombre debe tener al menos tres caracteres y no pueden ser especiales"
    } else {
        delError(campoNombre)
        delete errores.campoNombre
    }

});

//Validacion para el apellido
campoApellido.addEventListener('input', function () {
    if (campoApellido.value == "") {
        crearError(campoApellido,"El campo apellido no puede estar vacío")
        errores.campoApellido = "El campo apellido no puede estar vacío"
    } else if (campoApellido.value.length < 3) {
        crearError(campoApellido,"El apellido debe tener al menos tres caracteres y no pueden ser especiales")
        errores.campoApellido = "El apellido debe tener al menos tres caracteres y no pueden ser especiales"
    } else {
        delError(campoApellido)
        delete errores.campoApellido
    }
});
//Validacion para Email
campoEmail.addEventListener('input', function () {
    const valido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (campoEmail.value == "") {
        crearError(campoEmail,"El campo email no puede estar vacío")
        errores.campoEmail = "El campo email no puede estar vacío"
    } else if (!campoEmail.value.match(valido)) {
        crearError(campoEmail,"Debe ingresar un email valido")
        errores.campoEmail = "Debe ingresar un email valido"
    } else {
        delError(campoEmail)
        delete errores.campoEmail
    }
});
//Validacion para fecha de nacimiento
campoDate.addEventListener('change', function () {
    let fechaNacimiento = "2002/01/01"
    if (campoDate.value == "") {
        crearError(campoDate,"Debes seleccionar una fecha")
        errores.campoDate = "Debes seleccionar una fecha"
    } else  if (campoDate.value > fechaNacimiento) {
        crearError(campoDate,"Debes ser mayor de 18 años")
        errores.campoDate = "Debes ser mayor de 18 años"
    } else {
        delError(campoDate)
        delete errores.campoDate
    }
});
//Validacion para contraseña
campoPassword.addEventListener('input', function () {
    let caracteres = /^(?=.*[0-9])(?=.*[!@#$_.^&*])[a-zA-Z0-9!@#$_.^&*]{8,16}$/;
    if (campoPassword.value == "") {
        crearError(campoPassword,"Debes ingresar una contraseña")
        errores.campoPassword = "Debes ingresar una contraseña"
    } else if (campoPassword.value.length < 8) {
        crearError(campoPassword,"La contraseña debe tener como mínimo 8 caracteres")
        errores.campoPassword = "La contraseña debe tener como mínimo 8 caracteres"
    } else if (!campoPassword.value.match(caracteres)) {
        crearError(campoPassword,"La contraseña debe tener un número, una mayúscula y un caracter especial")
        errores.campoPassword = "La contraseña debe tener un número, una mayúscula y un caracter especial"  
    } else {
        delError(campoPassword)
        delete errores.campoPassword
    }
});
//Validacion para reingresar contraseña
campoRepassword.addEventListener('input', function () {
    if (campoRepassword.value == "") {
        crearError(campoRepassword,"Debes reingresar la contraseña")
        errores.campoRepassword = "Debes reingresar la contraseña"
    } else if (campoRepassword.value != campoPassword.value) {
        crearError(campoRepassword,"La contraseña no coincide con la ingresada")
        errores.campoRepassword = "La contraseña no coincide con la ingresada"
    } else {
        delError(campoRepassword)
        delete errores.campoRepassword
    }
});
//Validacion para imagen
campoProfileImage.addEventListener('input', function () {
    let fileExt = campoProfileImage.value.split('.').pop();
    let coincidence = ['jpg', 'png', 'gif', 'webp'];
    if (campoProfileImage.value == "") {
        crearError(campoProfileImage,"Debes ingresar una imágen")
        errores.campoProfileImage = "Debes ingresar una imágen"
    } else if (coincidence.includes(fileExt) == false) {
        crearError(campoProfileImage,"Solo se admiten archivos .jpeg, .jpg, .png y .webp")
        errores.campoProfileImage = "Solo se admiten archivos .jpeg, .jpg, .png y .webp"
    } else {
        delError(campoProfileImage)
        delete errores.campoProfileImage
    }
})

let envioForm = async (isEmpty)=>{
    if (isEmpty == true) {
        //genero un form nuevo para enviarle al backend lo que inserto el usuario
        bodyInputs = new FormData();
        //seteo los valores dentro de mi form
        bodyInputs.set("nombre", campoNombre.value);
        bodyInputs.set("apellido", campoApellido.value);
        bodyInputs.set("email", campoEmail.value);
        bodyInputs.set("fechaNacimiento", campoDate.value);
        bodyInputs.set("profileImage", campoProfileImage.files[0]);
        bodyInputs.set("password", campoPassword.value);
        //creo el atributo repassword dentro de mi nuevo form
        bodyInputs.append("repassword", campoRepassword.value);
    
        //ejecuto la funcion que llama a mi fetch y le envio mi objeto con los datos del body
        resFetch = await registerProcess(bodyInputs);
    }
}

//Envio el formulario 
formRegister.addEventListener('submit', async (e)=>{

    e.preventDefault()
    //recorro el array de los input
    arrayCampos.forEach((input)=>{
        if(input.value < 1){
            crearError(input, `El campo ${input.name} no puede estar vacío `);
            errores.input = `El campo ${input.name} no puede estar vacío `
            e.preventDefault();
        }else{
            delete errores.input
        }
    })

    //si el objeto errores tiene errores seteo la variable isEmty en false para que no queden los errores del back a la vista.
    if(Object.keys(errores).length >= 1){
        isEmpty = false
        e.preventDefault()
    }else{
        isEmpty = true;
    }

    await envioForm(isEmpty)
    
    if (resFetch.errors != undefined) {
        resFetch.errors.errors.forEach((error) => {
            arrayCampos.forEach((input) => {
                if (input.name == error.param) {
                    input.nextElementSibling.innerHTML = error.msg;
                }
            });
        });
    }
})

