let formRegister = document.querySelector("form.formulario");
let campoNombre = document.querySelector("input.nombre")
let campoApellido = document.querySelector("input.apellido")
let campoEmail = document.querySelector("input.email")
let campoDate = document.querySelector("input.fechaNacimiento")
let campoPassword = document.querySelector("input.password")
let campoRepassword = document.querySelector("input.repassword")
let campoProfileImage = document.querySelector("input.profileImage")
let errores = []
let arrayCampos = [campoNombre, campoApellido, campoEmail, campoDate, campoPassword, campoRepassword, campoProfileImage];

function deleteError(input) {
    input.classList.remove('is-invalid');
    input.nextElementSibling.innerHTML = "";
}
function createError(input) {
    errores.push(input.name)
    
}
async function checkInputs(arrayCampos) {
    for (let i = 0; i < arrayCampos.length; i++) {
        if (arrayCampos[i].length < 1) {
            arrayCampos[i].classList.add('is-invalid')
            arrayCampos[i].nextElementSibling.innerHTML = "Éste campo no puede estar vacío"
            errores.push(arrayCampos[i]);
            return errores;
        }
    }
    
    if(errores.length < 1) {
        isEmpty = true
    }
}

//Validacion para el nombre
campoNombre.addEventListener('blur', function () {
    //let especials = /^[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/ || campoNombre.value.includes(especials)
    if (campoNombre.value == "") {
        campoNombre.classList.add('is-invalid')
        campoNombre.nextElementSibling.innerHTML = "El campo nombre no puede estar vacio"
        createError(campoNombre)
    } else if (campoNombre.value.length < 3) {
        campoNombre.classList.add('is-invalid')
        campoNombre.nextElementSibling.innerHTML = "Debe ingresar un nombre valido"
        createError(campoNombre)
    } else {
        deleteError(campoNombre)
    }

});


//Validacion para Apellido
campoApellido.addEventListener('blur', function () {
    if (campoApellido.value == "") {
        campoApellido.classList.add('is-invalid')
        campoApellido.nextElementSibling.innerHTML = "El campo apellido no puede estar vacio"
        createError(campoApellido)
    } else if (campoApellido.value.length < 3) {
        campoApellido.classList.add('is-invalid')
        campoApellido.nextElementSibling.innerHTML = "Debe ingresar mas de 3 caracteres"
        createError(campoApellido)
    } else {
        deleteError(campoApellido)
    }
});

    /*let especials = /^[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/
    } else if (campoApellido.value == especials) {
        campoApellido.classList.add('is-invalid')
        campoApellido.nextElementSibling.innerHTML = "No se admiten caracteres especiales"
        createError(campoApellido)
    } else {
        deleteError(campoApellido)
    }
});*/

//Validacion para Email
campoEmail.addEventListener('blur', function () {
    const valido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (campoEmail.value == "") {
        campoEmail.classList.add('is-invalid')
        campoEmail.nextElementSibling.innerHTML = "El campo email no puede estar vacio"
        createError(campoEmail)
    } else if (!campoEmail.value.match(valido)) {
        campoEmail.classList.add('is-invalid')
        campoEmail.nextElementSibling.innerHTML = "Debes ingresar un email válido"
        createError(campoEmail)
    } else {
        deleteError(campoEmail)
    }
});


//Validacion para fecha de nacimiento
campoDate.addEventListener('input', function () {
    let fechaNacimiento = "2002/01/01"
    if (campoDate.value == "") {
        campoDate.classList.add('is-invalid')
        campoDate.nextElementSibling.innerHTML = "Debes seleccionar una fecha"
        createError(campoDate)
    } else  if (campoDate.value > fechaNacimiento) {
        campoDate.classList.add('is-invalid')
        campoDate.nextElementSibling.innerHTML = "Debes ser mayor de 18 años"
        createError(campoDate)
    } else {
        deleteError(campoDate)
    }
});
//Validacion para contraseña
campoPassword.addEventListener('blur', function () {
    let caracteres = /^(?=.*[0-9])(?=.*[!@#$_.^&*])[a-zA-Z0-9!@#$_.^&*]{8,16}$/;
    if (campoPassword.value == "") {
        campoPassword.classList.add('is-invalid')
        campoPassword.nextElementSibling.innerHTML = "Debes ingresar una contraseña"
        createError(campoPassword)
    } else if (campoPassword.value.length < 8) {
        campoPassword.classList.add('is-invalid')
        campoPassword.nextElementSibling.innerHTML = "La contraseña debe tener como mínimo 8 caracteres"
        createError(campoPassword)
    } else if (!campoPassword.value.match(caracteres)) {
        campoPassword.classList.add('is-invalid')
        campoPassword.nextElementSibling.innerHTML = "La contraseña debe de tener un numero, una mayúscula y un caracter especial"
        createError(campoPassword)
    } else {
        deleteError(campoPassword)
    }
});

//Validacion para reingresar contraseña
campoRepassword.addEventListener('blur', function () {
    if (campoRepassword.value == "") {
        campoRepassword.classList.add('is-invalid')
        campoRepassword.nextElementSibling.innerHTML = "Debes reingresar la contraseña"
        createError(campoRepassword)
    } else if (campoRepassword.value != campoPassword.value) {
        campoRepassword.classList.add('is-invalid')
        campoRepassword.nextElementSibling.innerHTML = "La contraseña no coincide con la ingresada"
        createError(campoRepassword)
    } else {
        deleteError(campoRepassword)
    }
});
//Validacion para imagen
campoProfileImage.addEventListener('input', function () {
    let fileExt = campoProfileImage.value.split('.').pop();
    let coincidence = ['jpg', 'png', 'gif', 'webp'];
    if (campoProfileImage.value == "") {
        campoProfileImage.classList.add('is-invalid')
        campoProfileImage.nextElementSibling.innerHTML = "Debes ingresar una imagen"
    } else if (coincidence.includes(fileExt) == false) {
        campoProfileImage.classList.add('is-invalid')
        campoProfileImage.nextElementSibling.innerHTML = "Solo se admiten archivos .jpeg, .jpg, .png y .webp"
        createError(campoRepassword)
    } else {
        deleteError(campoProfileImage)
    }
})

//se guarda informacion proveniente del fetch registerProcess
let resFetch;

let isEmpty = false;
formRegister.addEventListener("submit", async (e) => {
   
    // el event.default va si o si al inicio porque usamos un fetch para acceder a la ruta backend que se ejecuta en la linea 218
    e.preventDefault();
   
    //llama a la funcion para que se ejecute
    checkInputs(arrayCampos);
     //revisa si hay errores al momento de hacer submit 
     if(errores.length < 1) {
        isEmpty = true
    }
   
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









