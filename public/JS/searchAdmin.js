window.onload = () => {
    let btnId = document.getElementsByClassName("admin_filter")
   
    for (var i = 0, len = btnId.length; i < len; i++) {
       btnId[i].addEventListener('click', function(e){
           const idTarget = e.currentTarget.id
           console.log(idTarget)
           fetch("http://localhost:3000/product/all-products/?id="+idTarget)
           .then(function(response) {
               return response;
           })
           .then(function(informacion) {           
               console.log(informacion)
           })
       });
   }
}