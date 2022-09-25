const buttonValue = document.querySelectorAll('div.value-button');
const inputValue = document.querySelector('input#inputValue');
const inputId = document.querySelector('input#cart-id-product').value;
const form = document.querySelector('form.pd_buysection');


let currentValue = Number(inputValue.value);

buttonValue.forEach(div => {
    div.addEventListener('click', ()=>{

        if (div.innerText == "-") {
            currentValue = Number(inputValue.value)
            if (currentValue>1) {
                inputValue.value=currentValue-1;
                var event = new Event('change');
                inputValue.dispatchEvent(event);
            }
        }else if(div.innerText == "+"){
            currentValue = Number(inputValue.value)
            inputValue.value=currentValue+1;
            var event = new Event('change');
            inputValue.dispatchEvent(event);
        };

    });
});

form.addEventListener('submit', async(e)=>{
    e.preventDefault();

    const newBody = {
        cantidad: inputValue.value
    };

    let response =  await fetch("http://localhost:3001/product/product-cart/"+inputId, {
        method: "POST",
        body: JSON.stringify(newBody),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });
    if (response.status == 200) {
        const itemToCart = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          itemToCart.fire({
            imageUrl: '/img/item-cart-icon.png',
            imageHeight: 50,
            title: '¡Agregado al Carrito!',
            customClass: {
                popup: 'horizontal-alert'
              }
          })
    }else{
        const itemToCart = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          itemToCart.fire({
            imageUrl: '/img/error-icon.png',
            imageHeight: 50,
            title: '¡Oh no! Ocurrió algo inesperado',
            customClass: {
                popup: 'horizontal-alert'
              }
          })
    }  
})