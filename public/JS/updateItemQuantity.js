const buttonValue = document.querySelectorAll('div.value-button');
const inputValue = document.querySelector('input#inputValue');
const inputId = document.querySelector('input#cart-id-product').value;

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

inputValue.addEventListener('change', async()=>{
    const newBody = {
        quantity: inputValue.value
    };

    let response =  await fetch("http://localhost:3001/product/update-cart/"+inputId, {
        method: "POST",
        body: JSON.stringify(newBody),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });
    

})