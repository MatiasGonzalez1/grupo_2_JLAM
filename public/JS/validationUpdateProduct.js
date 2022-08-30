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

    // callbacks de implementacion

    errores = {};

    //creacion de elemento HTML para error
    let elemento = (error,input)=>{
        let p = document.createElement('p');
        p.classList.add('product-warning');
        p.setAttribute('id', `${input}Err`)
        p.textContent = error
        console.log(p);
        return p
    }

    //Insercion del elemento creado con el error fijado
    let errorLog = (input, error)=>{

        let errEncontrado = document.getElementById(`${input}Err`);

        if(!errEncontrado){
            input.insertAdjacentElement('afterend', elemento(error, input))
        }else{
            delErrorLog(input)
            input.insertAdjacentElement('afterend', elemento(error, input))
        }
    }

    //Eliminación del elemento creado con el error fijado
    let delErrorLog = (input)=>{
        input.classList.remove('is-invalid')
        input.nextElementSibling.remove()
        delete errores.input
    }

    //Nombre
    nombreProducto.addEventListener('input', ()=>{
        if(nombreProducto.value == ''){
            errores.nombreProducto = 'El nombre no debe estar vacio';
            nombreProducto.classList.add('is-invalid');
            errorLog(nombreProducto, errores.nombreProducto);
        }else{
            delErrorLog(nombreProducto)
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
        }
    })

    //Año de cosecha
    cosechaAnio.addEventListener('input',()=>{
        if(cosechaAnio.value == ''){
            errores.cosechaAnio = 'El campo año de cosecha no puede estar vacío';
            cosechaAnio.classList.add('is-invalid');
            errorLog(cosechaAnio, errores.cosechaAnio)
        }else{
            delErrorLog(cosechaAnio)
        }
    })

    //Variedad 
    variedad.addEventListener('input',()=>{
        if(variedad.value == ''){
            errores.variedad = 'El campo variedad no puede estar vacío';
            variedad.classList.add('is-invalid');
            errorLog(variedad, errores.variedad)
        }else{
            delErrorLog(variedad)
        }
    })

    //Crianza
    crianza.addEventListener('input',()=>{
        if(crianza.value == ''){
            errores.crianza = 'El campo crianza no puede estar vacío';
            crianza.classList.add('is-invalid');
            errorLog(crianza, errores.crianza)
        }else{
            delErrorLog(crianza)
        }
    })

    //Guarda 
    guarda.addEventListener('input',()=>{
        if(guarda.value == ''){
            errores.guarda = 'El campo guarda no puede estar vacío';
            guarda.classList.add('is-invalid');
            errorLog(guarda, errores.guarda)
        }else{
            delErrorLog(guarda)
        }
    })

    //Guarda 
    guarda.addEventListener('input',()=>{
        if(guarda.value == ''){
            errores.guarda = 'El campo guarda no puede estar vacío';
            guarda.classList.add('is-invalid');
            errorLog(guarda, errores.guarda)
        }else{
            delErrorLog(guarda)
        }
    })

    //notaCata 
    notaCata.addEventListener('input',()=>{
        if(notaCata.value == ''){
            errores.notaCata = 'El campo nota cata no puede estar vacío';
            notaCata.classList.add('is-invalid');
            errorLog(notaCata, errores.notaCata)
        }else{
            delErrorLog(notaCata)
        }
    })

    //Imagen
    fotoProd.addEventListener('input', ()=>{
        let fileExt = img.value.split('.').pop();
        let extensiones = ["png", "jpg", "jpeg", "webp"];

        if (extensiones.includes(fileExt) == false) {
            fotoProd.classList.add('is-invalid');
            errores.fotoProd = "Solo de admiten archivos .jpeg, .jpg, .png y .webp";
            errorLog(fotoProd, errores.fotoProd)    
        }else{
            delErrorLog(fotoProd)
        }
    })

    //Precio
    precio.addEventListener('input',()=>{
        if(precio.value == ''){
            errores.precio = 'El campo precio no puede estar vacío';
            precio.classList.add('is-invalid');
            errorLog(precio, errores.precio)
        }else{
            delErrorLog(precio)
        }
    })

    //fstock
    fstock.addEventListener('input',()=>{
        if(fstock.value == ''){
            errores.fstock = 'El campo stock no puede estar vacío';
            fstock.classList.add('is-invalid');
            errorLog(fstock, errores.fstock)
        }else{
            delErrorLog(fstock)
        }
    })

    form.addEventListener('submit', (e)=>{
        e.preventDefault();
       if (Object.keys(errores).length < 1) {
            form.submit();
       }    
    })
    


})