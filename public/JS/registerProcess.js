const registerProcess = async (dataBody)=>{

    const request = await fetch("http://localhost:3000/users/register", {
        method: "POST",
        //envio los datos que recibo desde registerValidator.js
        body:dataBody, 
    });
    if (request.status == 200) {
        //disparo mi alerta con la configuracion y redirecciono a /login
        Swal.fire({
            title: '¡Registro exitoso!',
            text: 'Ya podés iniciar sesión con tu cuenta',
            imageUrl: '/img/sucess-icon.png',
            imageWidth: 100,
            imageHeight: 100,
            imageAlt: 'Custom image',
            confirmButtonText: "Iniciar Sesión",
            confirmButtonColor: "#FF452C", 
            buttonsStyling:true,
            type: "success"}).then(okay => {
                if (okay) {
                 window.location.href = "/users/login";
               }
          })
    }else{
    }
    }
