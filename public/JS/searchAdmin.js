window.onload = () => {
    let btnId = document.getElementsByClassName("admin_filter")
    let divFilter = document.getElementById("product-container")

 
    for (var i = 0, len = btnId.length; i < len; i++) {
       btnId[i].addEventListener('click', function(e){
        //tomo el elemento especifico que recibe el evento click
           const idTarget = e.currentTarget
           for (var i = 0, len = btnId.length; i < len; i++) {
            btnId[i].classList.remove("admin-filter-selected");
           }
           
           idTarget.classList.add("admin-filter-selected");

           fetch("http://localhost:3001/product/all-products/"+idTarget.id)
           .then(function(response) {
               return response.json();
           })
           .then(function(productos) { 
            //tomo el array con mis productos
            let productFilter = productos.data;

            //limpio el div que contiene todos los bloques de productos
            divFilter.innerHTML = "";

            let setArticle = '';

            //recorro mi array de productos y genero cada bloque 
            productFilter.forEach(producto => {  
                setArticle+= `<article class="productsdash__container">
                    <div class="productdash_block">
                        <img src="/img/productImg/${producto.productImg}" alt="imagen del producto">
                        <p>${producto.productName}</p>
                        <p>$ <span>${ producto.productPrice}</span></p>
                        <p>${producto.productStock}</p>
                    </div>
                    <div class="productdash_button">
                        <form class="form__container" method="POST" action="/product/all-products/${producto.idProduct}?_method=DELETE"> 
                        <button type="submit" class="delete">eliminar</button>
                        </form>
                        <a class="update" href="/product/update-product/${producto.idProduct}">actualizar</a>
                    </div>
                </article>`  
            });

            //lo seteo en mi div contenedor
            divFilter.innerHTML = setArticle;
           })
       });
   }
}