window.addEventListener('load',()=>{

    //Capturo el formulario para controlar por preventDevault()
    let form = document.querySelector('form.form__scroll');

    //Inputs del form a validar
    let nombreProducto = document.querySelector('#fnombre');
    let categoria = document.querySelector('#fcategoria');
    let cosechaAnio = document.querySelector('#fcoseAnio');
    let variedad = document.querySelector('#fvariedad');
    let crianza = document.querySelector('#fcrianza');
    let guarda = document.querySelector('#fguarda');
    let notaCata = document.querySelector('#fnotacata');
    let fotoProd = document.querySelector('#fprodfoto');
    let precio = document.querySelector('#fprecio');
    let fstock = document.querySelector('#fstock');

    
    errores = {};
    
    form.addEventListener('submit', (e)=>{
        if(Object.keys(errores).length >= 1){
            e.preventDefault()
        }
    })


    // callbacks de implementacion

    //creacion de elemento HTML para error
    let elemento = (error,input)=>{
        let p = document.createElement('p');
        p.classList.add('product-warning');
        p.setAttribute('id', `${input.name}Err`)
        p.textContent = error
        return p
    }

    //Insercion del elemento creado con el error fijado
    let errorLog = (input, error)=>{

        let errEncontrado = document.getElementById(`${input.name}Err`);

        if(!errEncontrado){
            input.insertAdjacentElement('afterend', elemento(error, input));
        }else{
            input.classList.remove('is-invalid')
            input.nextElementSibling.remove()
            input.insertAdjacentElement('afterend', elemento(error, input));
        }
    }

    //Eliminación del elemento creado con el error fijado
    let delErrorLog = (input)=>{
        input.classList.remove('is-invalid')
        input.nextElementSibling.remove()
    }

    //Nombre
    nombreProducto.addEventListener('input', ()=>{
        if(nombreProducto.value == ''){
            errores.nombreProducto = 'El nombre no debe estar vacio';
            errorLog(nombreProducto, errores.nombreProducto);
            nombreProducto.classList.add('is-invalid');
        }else if (nombreProducto.value.length < 6){
            errores.nombreProducto = 'El nombre debe de tener al menos seis carácteres';
            errorLog(nombreProducto, errores.nombreProducto);
            nombreProducto.classList.add('is-invalid');
        }else{
            delErrorLog(nombreProducto)
            delete errores.nombreProducto
        }
    })

    //Categoria
    categoria.addEventListener('input',()=>{
        
        if(categoria.value == 'Seleccione una categoría'){
            errores.categoria = 'Debes seleccionar una categoría';
            categoria.classList.add('is-invalid');
            errorLog(categoria, errores.categoria)
        }else{
            delErrorLog(categoria)
            delete errores.categoria
        }
    })

    //Año de cosecha
    cosechaAnio.addEventListener('input',()=>{
        if(cosechaAnio.value == ''){
            errores.cosechaAnio = 'El campo año de cosecha no puede estar vacío';
            errorLog(cosechaAnio, errores.cosechaAnio);
            cosechaAnio.classList.add('is-invalid');
        }else{
            delErrorLog(cosechaAnio)
            delete errores.cosechaAnio
        }
    })

    //Variedad 
    variedad.addEventListener('input',()=>{
        if(variedad.value == ''){
            errores.variedad = 'El campo variedad no puede estar vacío';
            errorLog(variedad, errores.variedad)
            variedad.classList.add('is-invalid');
        }else if (variedad.value.length < 6){
            errores.variedad = 'El nombre debe de tener al menos seis carácteres';
            errorLog(variedad, errores.variedad);
            variedad.classList.add('is-invalid');
        }else{
            delErrorLog(variedad)
            delete errores.variedad
        }
    })

    //Crianza
    crianza.addEventListener('input',()=>{
        if(crianza.value == ''){
            errores.crianza = 'El campo crianza no puede estar vacío';
            errorLog(crianza, errores.crianza)
            crianza.classList.add('is-invalid');
        }else if (crianza.value.length < 6){
            errores.crianza = 'Crianza debe de tener al menos seis carácteres';
            errorLog(crianza, errores.crianza);
            crianza.classList.add('is-invalid');
        }else{
            delErrorLog(crianza)
            delete errores.crianza
        }
    })

    //Guarda 
    guarda.addEventListener('input',()=>{
        if(guarda.value == ''){
            errores.guarda = 'El campo guarda no puede estar vacío';
            errorLog(guarda, errores.guarda)
            guarda.classList.add('is-invalid');
        }else if (guarda.value.length < 5){
            errores.guarda = 'Guarda debe de tener al menos cinco carácteres';
            errorLog(guarda, errores.guarda);
            guarda.classList.add('is-invalid');
        }else{
            delErrorLog(guarda)
            delete errores.guarda
        }
    })

    //notaCata 
    notaCata.addEventListener('input',()=>{
        if(notaCata.value == ''){
            errores.notaCata = 'El campo nota cata no puede estar vacío';
            errorLog(notaCata, errores.notaCata)
            notaCata.classList.add('is-invalid');
        }else if (notaCata.value.length < 40){
            errores.notaCata = 'La descripcion del producto debe tener al menos cuarenta carácteres';
            errorLog(notaCata, errores.notaCata);
            notaCata.classList.add('is-invalid');
        }else{
            delErrorLog(notaCata)
            delete errores.notaCata
        }
    })

    //Imagen
    fotoProd.addEventListener('input', ()=>{
        let fileExt = img.value.split('.').pop();
        let extensiones = ["png", "jpg", "jpeg", "webp"];

        if (extensiones.includes(fileExt) == false) {
            errores.fotoProd = "Solo de admiten archivos .jpeg, .jpg, .png y .webp";
            errorLog(fotoProd, errores.fotoProd)    
            fotoProd.classList.add('is-invalid');
        }else{
            delErrorLog(fotoProd)
            delete errores.fotoProd
        }
    })

    //Precio
    precio.addEventListener('input',()=>{
        if(precio.value == ''){
            errores.precio = 'El campo precio no puede estar vacío';
            errorLog(precio, errores.precio)
            precio.classList.add('is-invalid');
        }else{
            delErrorLog(precio)
            delete errores.precio
        }
    })

    //fstock
    fstock.addEventListener('input',()=>{
        if(fstock.value == ''){
            errores.fstock = 'El campo stock no puede estar vacío';
            errorLog(fstock, errores.fstock)
            fstock.classList.add('is-invalid');
        }else{
            delErrorLog(fstock)
            delete errores.fstock
        }
    })

    
    


})