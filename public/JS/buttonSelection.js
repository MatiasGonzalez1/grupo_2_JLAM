window.addEventListener('load', function () {

    const buttonLeft = document.querySelector(".selection__nextbuttonLeft");
    const buttonRight = document.querySelector(".selection__nextbuttonRight");
    const contenedor = document.querySelector(".container__block")

    buttonLeft.addEventListener("click", function () {
        contenedor.scrollLeft -= 205
    });

    buttonRight.addEventListener("click", function () {
        contenedor.scrollLeft += 205
    })
});


