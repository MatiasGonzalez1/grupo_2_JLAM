import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faWineBottle} from "@fortawesome/free-solid-svg-icons";

export const AllProductsCard = () => {
    const [products, setProducts] = useState(null);
  
    useEffect(() => {
      fetch('http://localhost:3001/api/product')
        .then((response) => response.json())
        .then((products) => {
          console.log(products.products);
          setProducts(products.products);
        });
    }, []);

    return (
        <>
         {products ? (
          <div className="productCard">
            <FontAwesomeIcon className="" icon={faWineBottle}/>
            <h2>Productos</h2>
            <p>{products.length}</p>
          </div>
        ) : (
          "Cargando"
        )}
        </>
    )

}


  