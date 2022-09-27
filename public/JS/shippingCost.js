let cityCheck = document.querySelector("select.checkoutCity");

// 
cityCheck.addEventListener('change', async(e) => {
    let currentIdCity = Number(e.target.value);
    let shippingCostP = document.querySelector('span.shippingCost');
    let subtotal = document.querySelector('p.checkout-total').innerText;
    let total = document.querySelector('p.checkout-total');

    let regex = (/[$.\s]/g);
    var finalSubtotal = Number(subtotal.replace(regex, '').split(',')[0]);


    const formatter = new Intl.NumberFormat("es-AR", { 
        style: "decimal",
        minimumFractionDigits: 2,
    }); 

    let response =  await fetch("http://localhost:3001/users/shipping-cost/"+ currentIdCity, {
        method:"GET"
    });
    let resJson = await response.json();

    let finalTotal = Number(resJson.shippingCost) + finalSubtotal;

    shippingCostP.innerHTML=`$ `+ resJson.shippingCost.replace('.', ',');
    total.innerHTML=`$ `+ formatter.format(finalTotal);
});