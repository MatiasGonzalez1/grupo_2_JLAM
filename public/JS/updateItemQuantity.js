const buttonValue = document.querySelectorAll('div.value-button');
const inputValue = document.querySelectorAll('input#inputValue');
const pSubtotal = document.querySelector('p#subtotal');
const pTotal = document.querySelector('p#total');

let currentValue;

const formatter = new Intl.NumberFormat("es-AR", { 
    style: "decimal",
    minimumFractionDigits: 2,
}); 

buttonValue.forEach(div => {
    div.addEventListener('click', (e)=>{
        let divProducto = e.target.getAttribute("data-divProducto");
        if (div.innerText == "-") {
            inputValue.forEach(input => {
                currentValue = Number(input.value);
                if(input.getAttribute("data-inputProducto") == divProducto && currentValue>1){
                    input.value=currentValue-1;
                    var event = new Event('change');
                    input.dispatchEvent(event);
                }
            });
        }
        if (div.innerText == "+") {
            inputValue.forEach(input => {
                currentValue = Number(input.value);
                if(input.getAttribute("data-inputProducto") == divProducto){
                    input.value=currentValue+1;
                    var event = new Event('change');
                    input.dispatchEvent(event);
                }
            });
        }
    });
});


inputValue.forEach(input => {
    input.addEventListener('change', async()=>{
        let idProduct = input.getAttribute("data-inputProducto");

        const newBody = {
            quantity: input.value
        };

        let response =  await fetch("http://localhost:3001/product/update-cart/"+idProduct, {
            method: "POST",
            body: JSON.stringify(newBody),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        const subtotalJson = await response.json();
        pSubtotal.innerHTML = formatter.format(subtotalJson.subtotal);
        pTotal.innerHTML = formatter.format(subtotalJson.subtotal);
    })
});
