import React, { useState, useEffect } from "react";
import './allProducts.css';
import Formatter from '../../../utils/Formatter'

  export const AllProducts = () => {
    const [products, setProducts] = useState(null);
  
    useEffect(() => {
      fetch(`http://localhost:3001/api/product`)
        .then((response) => response.json())
        .then((products) => {
          console.log(products.products);
  
          setProducts(products.products);
        });
    }, []);
  
    return (
      <>
        {products ? (
          <div className="productSquare">
            <h2>Productos</h2>
            <div className="subTitle">
              <p>Nombre</p>
            <p>Precio</p>
            <p>Stock</p>
            </div>
            {products.map((product, i)=> {
              return (
                <ul key={i}>
                  <li key={i}>
                  <h3>{product.name}</h3>
                  <p>${Formatter.format(product.price)}</p>
                  <p>{product.stock}u.</p></li>
                </ul>
              );
            })}
          </div>
        ) : (
          "Cargando"
        )}
      </>
    );
  };

export default AllProducts;