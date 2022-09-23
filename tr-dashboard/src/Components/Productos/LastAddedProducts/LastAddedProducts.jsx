import React, { useEffect, useState } from 'react'; 
import Formatter from '../../../utils/Formatter.js';
import "./LastAddedProducts.css";

const LastAddedProducts=()=>{
    const [products, setProducts] = useState([]);

    const getLastAdded = async()=>{
        try {
            const result = await fetch("http://localhost:3001/api/last-added")
            const productsJson = await result.json();
            setProducts(productsJson);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getLastAdded();
    }, []);

    return <div className='last-added-container'>
        <div className='last-main-groups last-added-title'>
            <h3>Últimos productos agregados</h3>
            <select className='last-added-select' name="" id="">
                <option defaultValue value="">Categorias</option>
            </select>
        </div>
        <div className='last-main-groups last-added-columns'>
            <p className='column-detail'>Nombre</p>
            <p className='column-detail'>Precio</p>
            <p className='column-detail'>Stock</p>
        </div>
        <div className='last-main-groups'>
            <div className='last-added-columns border-none'>
                {products.map(product => (
                    <>
                        <p className='product-detail'key={product.idProduct}>{product.productName}</p>
                        <p className='product-detail'>${Formatter.format(product.productPrice)}</p>
                        <p className='product-detail'>{product.productStock}</p>
                    </>
                ))
                }
            </div>
        </div>
    </div>
}

export default LastAddedProducts; 
