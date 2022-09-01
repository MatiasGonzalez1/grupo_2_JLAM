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
function createError (input) {
    if(!input == "") {
        errores.push(input)
    }
}
//Validacion para el nombre
campoNombre.addEventListener('blur', function () {
    if (campoNombre.value == "") {
        campoNombre.classList.add('is-invalid')
        campoNombre.nextElementSibling.innerHTML = "El campo nombre no puede estar vacio"
        createError(campoNombre)
    } else {
        deleteError(campoNombre)
    }
});
campoNombre.addEventListener('input', function (e) {
    let especials = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/
    if (campoNombre.value.length < 3) {
        campoNombre.classList.add('is-invalid')
        campoNombre.nextElementSibling.innerHTML = "Debe ingresar mas de 3 caracteres"
    } else if (e.key != especials) {
        campoNombre.classList.add('is-invalid')
        campoNombre.nextElementSibling.innerHTML = "No se admiten caracteres especiales"
        createError(campoNombre)
    } else {
        deleteError(campoNombre)
    }

})

//Validacion para Apellido
campoApellido.addEventListener('blur', function () {
    if (campoApellido.value == "") {
        campoApellido.classList.add('is-invalid')
        campoApellido.nextElementSibling.innerHTML = "El campo apellido no puede estar vacio"
        createError(campoApellido)
    } else {
        deleteError(campoApellido)
    }
});
campoApellido.addEventListener('input', function () {
    let especials = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/
    if (campoApellido.value.length < 3) {
        campoApellido.classList.add('is-invalid')
        campoApellido.nextElementSibling.innerHTML = "Debe ingresar mas de 3 caracteres"
    } else if (campoApellido.value != especials) {
        campoApellido.classList.add('is-invalid')
        campoApellido.nextElementSibling.innerHTML = "No se admiten caracteres especiales"
        createError(campoApellido)
    } else {
        deleteError(campoApellido)
    }
});

//Validacion para Email
campoEmail.addEventListener('blur', function () {
    if (campoEmail.value == "") {
        campoEmail.classList.add('is-invalid')
        campoEmail.nextElementSibling.innerHTML = "El campo email no puede estar vacio"
        createError(campoEmail)
    } else {
        deleteError(campoEmail)
    }
})
campoEmail.addEventListener('input', function () {
    const valido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!campoEmail.value.match(valido)) {
        campoEmail.classList.add('is-invalid')
        campoEmail.nextElementSibling.innerHTML = "Debes ingresar un email válido"
        createError(campoEmail)
    } else {
        deleteError(campoEmail)
    }

})

//Validacion para fecha de nacimiento
campoDate.addEventListener('blur', function () {
    if (campoDate.value == "") {
        campoDate.classList.add('is-invalid')
        campoDate.nextElementSibling.innerHTML = "Debes seleccionar una fecha"
        createError(campoDate)
    } else {
        deleteError(campoDate)
    }
    campoDate.addEventListener('change', function () {
        let fechaNacimiento = "2002/01/01"
        if (campoDate.value > fechaNacimiento) {
            campoDate.classList.add('is-invalid')
            campoDate.nextElementSibling.innerHTML = "Debes ser mayor de 18 años"
            createError(campoDate)
        } else {
            deleteError(campoDate)
        }
    })
});

//Validacion para contraseña
campoPassword.addEventListener('blur', function () {
    if (campoPassword.value == "") {
        campoPassword.classList.add('is-invalid')
        campoPassword.nextElementSibling.innerHTML = "Debes ingresar una contraseña"
        createError(campoPassword)
    } else {
        deleteError(campoPassword)
    }
})
campoPassword.addEventListener('input', function () {
    let caracteres = /^(?=.*[0-9])(?=.*[!@#$_.^&*])[a-zA-Z0-9!@#$_.^&*]{8,16}$/;
    if (campoPassword.value.length < 8) {
        campoPassword.classList.add('is-invalid')
        campoPassword.nextElementSibling.innerHTML = "La contraseña debe tener como mínimo 8 caracteres"
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
    } else {
        deleteError(campoRepassword)
    }
    campoRepassword.addEventListener('input', function () {
        if (campoRepassword.value != campoPassword.value) {
            campoRepassword.classList.add('is-invalid')
            campoRepassword.nextElementSibling.innerHTML = "La contraseña no coincide con la ingresada"
            createError(campoRepassword)
        } else {
            deleteError(campoRepassword)
        }
    })
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


formRegister.addEventListener("submit", (e) => {

    // el event.default va si o si al inicio porque usamos un fetch para acceder a la ruta backend que se ejecuta en la linea 218
    e.preventDefault();

    let isEmpty;

    arrayCampos.forEach((mar) => {
        if (mar.value == "") {
            mar.classList.add("is-invalid");
            mar.nextElementSibling.innerHTML = 'Éste campo no puede estar vacío'
        } else {
            mar.classList.remove("is-invalid");
            return isEmpty = true;
        }
    });
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
        registerProcess(bodyInputs);

    }
});







