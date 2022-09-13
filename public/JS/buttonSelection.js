window.addEventListener('load', function () {

    const buttonLeft = document.querySelector(".selection__nextbuttonLeft");
    console.log("estoy en el boton")
    const buttonRight = document.querySelector(".selection__nextbuttonRight");
    console.log("estoy en el boton2")
    const contenedor = document.querySelector(".container__block")

    buttonLeft.addEventListener("click", function () {
        contenedor.scrollLeft -= 205
    });

    buttonRight.addEventListener("click", function () {
        contenedor.scrollLeft += 205
    })
});


