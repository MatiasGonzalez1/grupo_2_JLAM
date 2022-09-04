window.addEventListener('load', ()=>{
    let itemUs = document.getElementById('nav-ad');
    let subItemUs = document.getElementById('subUs');
    let itemProd = document.getElementById('nav-ad_pr');
    let subItemProd = document.getElementById('subProd_new');
    let subItemProd2 = document.getElementById('subProd_all');
    
    itemUs.addEventListener('click', ()=>{
        subItemUs.classList.toggle('admin-nav-on')
    })

    itemProd.addEventListener('click', ()=>{
        subItemProd.classList.toggle('admin-nav-on');
        subItemProd2.classList.toggle('admin-nav-on');
    })

})