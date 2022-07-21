const $acordeon = document.querySelectorAll('.sub-titles');

for (let i = 0; i < $acordeon.length; i++) {
    $acordeon[i].addEventListener('click', function () {
        this.classList.toggle('active')
    })
}