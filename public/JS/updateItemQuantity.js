const increase = document.querySelectorAll('div.value-button');
const inputValue = document.querySelector('input#inputValue');



increase.forEach(div => {
    div.addEventListener('click', async()=>{
        const currentValue = Number(inputValue.value);

        let response =  await fetch("http://localhost:3001/users/shipping-cost/"+ currentIdCity, {
        method:"GET"
    });
    });
});