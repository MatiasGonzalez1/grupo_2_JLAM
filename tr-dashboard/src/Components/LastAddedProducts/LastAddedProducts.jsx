import React from 'react'; 
import "./LastAddedProducts.css";

const LastAddedProducts = ()=>{
    return <div className='last-added-container'>
        <div className='last-main-groups last-added-title'>
            <h3>Últimos productos agregados</h3>
            <select className='last-added-select' name="" id="">
                <option selected value="">Categorias</option>
            </select>
        </div>
        <div className='last-main-groups last-added-columns'>
            <p className='column-detail'>Nombre</p>
            <p className='column-detail'>Precio</p>
            <p className='column-detail'>Stock</p>
        </div>
        <div className='last-main-groups'>
            <div className='last-added-columns border-none'>
                <>
                    <p className='product-detail'>Colección Terra Rossa Malbec</p>
                    <p className='product-detail'>$5.460,00</p>
                    <p className='product-detail'>100</p>
                </>
            </div>
        </div>
    </div>
}

export default LastAddedProducts; 
