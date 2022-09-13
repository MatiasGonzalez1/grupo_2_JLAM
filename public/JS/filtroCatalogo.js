window.addEventListener('load',() =>{
//mostrar ocultar filtro
const mostrarFiltro = document.getElementById('filter');
mostrarFiltro.addEventListener('click', () => {
let show = document.getElementById('show');
show.style.display === 'none' ? show.style.display = 'block' : show.style.display ='none';
});


const formatter = new Intl.NumberFormat("es-AR", { 
    style: "decimal",
    minimumFractionDigits: 2,
});


//tomo todos los inputs que contienen los tipos de vinos
let filterType = document.querySelectorAll("#filterType")
let divSearch = document.getElementById("divSearch")


//declaramos una para asignarle lo que queremos filtrar
let params = {
    type: [],
    price: null,
    reset: 0,
}

//recorro el array y le asigno el evento change
for (var i = 0, len = filterType.length; i < len; i++) {
    filterType[i].addEventListener('change', function(e){
        //selecciono el elemnto especifico al que
        let valueTarget = e.currentTarget

        // chequeamos que el valor de input no exista en nuestro array 
        if (!params.type.includes(valueTarget.value) && valueTarget.checked == true){
            params.type.push(valueTarget.value);

        }else if(params.type.includes(valueTarget.value)&& valueTarget.checked == false ){
           params.type = params.type.filter(function (e){
             return e != valueTarget.value;
           })
        }
        filter();
    });
}



//cambiando el rango de precio
const range = document.querySelector('#precio');
range.addEventListener('change', (e)=>{
        let outvol = document.getElementById('outvol');
            outvol.innerHTML = 'Hasta ' + range.value
            //tomo el valor actual y lo asigno a mi variable precio
            params.price = range.value; 
            filter();
})



const filter = ()=>{
    const url = new URL("http://localhost:3001/product/catalogue/filter");
    // pregunto si mis atributos (tipo, precio, variedad)contienen algo
    if (params.price) {
        url.searchParams.append("price", params.price);
    }
    if (params.type.length) {
        url.searchParams.append("type", params.type);
    }
    if (params.reset) {
        url.searchParams.append("filter", params.reset);
    }


    fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function(productos) { 
       
        let productFilter = productos.data;

        //limpio el div que contiene todos los bloques de productos
        divSearch.innerHTML = "";

        let setArticle = '';

        //recorro mi array de productos y genero cada bloque 
        productFilter.forEach(producto => {  
            setArticle+=   

            `  <article class="cata__products">
                    <img class="cataimg__product" src="/img/productImg/${producto.productImg}" alt="aqui va la foto">
                    <p class="cataname__product"> ${producto.productName}</p>
                    <p class="cataprecio__product">$ ${ formatter.format(producto.productPrice)}</p>
                    
                    <form action="/product/product-cart/${ producto.idProduct}" method="post">
                        <div class="container__buttons">
                            <button type="submit" class="add-to-cart"><i class="fa-solid fa-cart-shopping"></i></button>
                            <a class="cata__eye" href="/product/product-detail/${ producto.idProduct}" target=""><i class="fa-regular fa-eye"></i></a>
                        </div>
                    </form>
                </article>` 
        });

        //lo seteo en mi div contenedor
        divSearch.innerHTML = setArticle;
       
    })
    }




}
)