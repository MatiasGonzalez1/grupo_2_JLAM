window.addEventListener('load', function () {

    let formRegister = document.querySelector("form.formulario");
    let campoNombre = document.querySelector("input.nombre")
    let campoApellido = document.querySelector("input.apellido")
    let campoEmail = document.querySelector("input.email")
    let campoDate = document.querySelector("input.fechaNacimiento")
    let campoPassword = document.querySelector("input.password")
    let campoRepassword = document.querySelector("input.repassword")
    let campoProfileImage = document.querySelector("input.profileImage")


    let arrayCampos = [campoNombre, campoApellido, campoEmail, campoDate, campoPassword, campoRepassword, campoProfileImage];

    //Validacion para el nombre
    campoNombre.addEventListener('blur', function () {
        let name = document.querySelector('#inName')
        if (campoNombre.value == " ") {
            campoNombre.classList.add('is-invalid')
            name.innerHTML = "El campo nombre no puede estar vacio"
        } else {
            campoNombre.classList.remove('is-invalid')
            name.innerHTML = " ";
        }
        campoNombre.addEventListener('input', function () {
            if (campoNombre.value.length < 2) {
                campoNombre.classList.add('is-invalid')
                name.innerHTML = "Debe ingresar mas de 2 caracteres"
            } else {
                campoNombre.classList.remove('is-invalid')
                name.innerHTML = " ";
            }
            campoNombre.addEventListener('keydown', function (e) {
                let especials = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/
                if (e.key != especials) {
                    campoNombre.classList.add('is-invalid')
                    name.innerHTML = "No se admiten caracteres especiales"
                    return;
                }
            })
        })
    });

    //Validacion para Apellido
    campoApellido.addEventListener('blur', function () {
        let lastName = document.querySelector('#lastName')
        if (campoApellido.value == " ") {
            campoApellido.classList.add('is-invalid')
            lastName.innerHTML = "El campo apellido no puede estar vacio"
        } else {
            campoApellido.classList.remove('is-invalid')
            lastName.innerHTML = " ";
        }
        campoApellido.addEventListener('input', function () {
            if (campoApellido.value.length < 2) {
                campoApellido.classList.add('is-invalid')
                lastName.innerHTML = "Debe ingresar mas de 2 caracteres"
            } else {
                campoApellido.classList.remove('is-invalid')
                lastName.innerHTML = " ";
            }
            campoApellido.addEventListener('input', function () {
                let especials = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/
                if (campoApellido.value != especials) {
                    campoApellido.classList.add('is-invalid')
                    lastName.innerHTML = "No se admiten caracteres especiales"
                    return;
                }
            })
        });
    })

    //Validacion para Email
    campoEmail.addEventListener('blur', function () {
        let usEmail = document.querySelector('#isEmail')
        if (campoEmail.value == "") {
            campoEmail.classList.add('is-invalid')
            usEmail.innerHTML = "El campo email no puede estar vacio"
        }
        campoEmail.addEventListener('input', function () {
            const valido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!campoEmail.value.match(valido)) {
                campoEmail.classList.add('is-invalid')
                usEmail.innerHTML = "Debes ingresar un email válido"
            } else {
                campoEmail.classList.remove('is-invalid')
                usEmail.innerHTML = "";
            }

        })
    });

    //Validacion para fecha de nacimiento
    campoDate.addEventListener('blur', function () {
        let usDate = document.querySelector('#dateBo')
        if (campoDate.value == "") {
            campoDate.classList.add('is-invalid')
            usDate.innerHTML = "Debes seleccionar una fecha"
        }
        campoDate.addEventListener('change', function () {
            let fechaNacimiento = "2002/01/01"
            if (campoDate.value > fechaNacimiento) {
                campoDate.classList.add('is-invalid')
                usDate.innerHTML = "Debes ser mayor de 18 años"
            } else {
                campoDate.classList.remove('is-invalid')
                usDate.innerHTML = "";
            }
        })
    });

    //Validacion para contraseña
    campoPassword.addEventListener('blur', function () {
        let caracteres = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
        let usPassword = document.querySelector('#pass')
        if (campoPassword.value == "") {
            campoPassword.classList.add('is-invalid')
            usPassword.innerHTML = "Debes ingresar una contraseña"
        }
        campoPassword.addEventListener('input', function () {
            if (campoPassword.value.length < 8) {
                campoPassword.classList.add('is-invalid')
                usPassword.innerHTML = "La contraseña debe tener como mínimo 8 caracteres"
            } else if (!campoPassword.value.match(caracteres)) {
                campoPassword.classList.add('is-invalid')
                usPassword.innerHTML = "La contraseña debe de tener un numero, una mayúscula y un caracter especial"
            } else {
                campoPassword.classList.remove('is-invalid')
                usPassword.innerHTML = " ";
            }
        })
    });
    //Validacion para reingresar contraseña
    campoRepassword.addEventListener('blur', function () {
        let usRepassword = document.querySelector('#repass')
        if (campoRepassword.value == "") {
            campoRepassword.classList.add('is-invalid')
            usRepassword.innerHTML = "Debes reingresar la contraseña"
        }
        campoRepassword.addEventListener('input', function () {
            if (campoRepassword.value != campoPassword.value) {
                campoRepassword.classList.add('is-invalid')
                usRepassword.innerHTML = "La contraseña no coincide con la ingresada"
            } else {
                campoRepassword.classList.remove('is-invalid')
                usRepassword.innerHTML = "";
            }
        })
    });

    //Validacion para imagen
    campoProfileImage.addEventListener('blur', function () {
        let usImg = document.querySelector('#img')
        if (campoProfileImage.value == "") {
            campoProfileImage.classList.add('is-invalid')
            usImg.innerHTML = "Debes ingresar una imagen"
        }
        campoProfileImage.addEventListener('input', function () {
            let fileExt = campoProfileImage.value.split('.').pop();
            let coincidence = ['jpg', 'png', 'gif', 'webp'];
            if (coincidence.includes(fileExt) == false) {
                campoProfileImage.classList.add('is-invalid')
                usImg.innerHTML = "Solo se admiten archivos .jpeg, .jpg, .png y .webp"
            } else {
                campoProfileImage.classList.remove('is-invalid')
                usImg.innerHTML = " ";
            }
        })
    });

    formRegister.addEventListener("submit", (e) => {
        arrayCampos.forEach((input) => {
            if (input.value.length < 1) {
                input.classList.add("is-invalid");
                e.preventDefault();
            }
            if (input.value != "") {
                input.classList.remove("is-invalid");
            }
        });
    });
});




