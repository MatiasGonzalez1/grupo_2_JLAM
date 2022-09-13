const formAddToCart = document.querySelectorAll("form.cartForm");
const inputCart = document.querySelector("input.inputForm").value;


formAddToCart.forEach((f)=>{
    f.addEventListener("submit", async(e)=>{
            e.preventDefault();
            
            const response =  await fetch("http://localhost:3001/product/product-cart/"+ inputCart, {
                method:"POST"
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
})
