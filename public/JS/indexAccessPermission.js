const entryUser = localStorage.getItem("usuario")
if(entryUser == undefined) {
Swal.fire({
    title: 'Bienvenido a Terra Rossa',
    text: '¿Tienes la edad legal para beber?',
    confirmButtonText: 'SI',
    showCancelButton: true,
    confirmButtonColor: '#A52A2A',
    cancelButtonText: 'NO',
    cancelButtonColor: '#A52A2A',
    buttonsStyling: true,
    imageUrl: '/img/logo-r.png',
    imageWidth: 300,
    footer: '<span class="alertFooter">Al ingresar al sitio web de la bodega Terra Rossa, usted afirma que tiene la edad legal para beber en el país donde se acceda al sitio y que acepta nuestra política de privacidad. <p style="margin-top: 10px"> Beber con moderación | Prohibida su venta a menores de 18 años. </p></span>',
    background: '#fbf2e0',
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
    stopKeyDownPropagation: false,
    customClass: {
        popup: 'AlertYes',
    }
    
}).then(usuario => {
    if (usuario.isConfirmed) {
        localStorage.setItem("usuario", "true")
    } else {
        swal.fire({
            imageUrl: '/img/logo-b.png',
            imageWidth: 300,
            background: '#fbf2e0',
            text: "Gracias por su interés en nuestro sitio, desafortunadamente has indicado que no tienes la edad legal para beber. Debes tener al menos 18 años para ingresar a este sitio. Espere con paciencia su legalidad, como nosotros esperamos la crianza perfecta de nuestras cosechas.",
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            stopKeyDownPropagation: false,
            showConfirmButton: false,
            customClass: {
                popup: 'AlertNo'
            },
            footer: '<span class="alertFooter"><p style="font-weigth: 600"><em>Lo saluda cordialmente todo el equipo Terra Rossa</em></span>'
        })
        
    }
})
}

