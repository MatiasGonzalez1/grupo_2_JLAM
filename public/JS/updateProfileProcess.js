const editProfileProcess = async (dataBody)=>{
    const request = await fetch("http://localhost:3001/users/edit-user", {
        method: "PUT",
        //envio los datos que recibo desde editProfileValidator.js
        body:dataBody, 
    });

    const responseJson = await request.json();
    if(responseJson.errors != undefined){
        Swal.fire({
            title: '¡Oh no! Ocurrió algo inesperado',
            text: 'Por favor revisa todos tus datos',
            imageUrl: '/img/error-icon.png',
            imageHeight: 100,
            imageAlt: 'Custom image',
            confirmButtonText: "Entendido!",
            confirmButtonColor: "#FF452C", 
            buttonsStyling:true,
          })
        return responseJson;
    }else{
         //disparo mi alerta con la configuracion
        Swal.fire({
            title: '¡Todo al día!',
            text: 'Tus datos fueron correctamente actualizados',
            imageUrl: '/img/sucess-icon.png',
            imageWidth: 100,
            imageHeight: 100,
            imageAlt: 'Custom image',
            confirmButtonText: "Ok",
            confirmButtonColor: "#FF452C", 
            buttonsStyling:true,
            type: "success"}).then(okay => {
                if (okay) {
                    //redireccion 
                 window.location.href = "/";
               }
        })
    }
}
