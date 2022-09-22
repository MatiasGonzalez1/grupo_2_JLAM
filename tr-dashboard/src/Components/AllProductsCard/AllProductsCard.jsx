import React, { useState, useEffect } from "react";
import { faWineBottle } from "@fortawesome/free-solid-svg-icons";
import OneCard from "../../utils/OneCard/OneCard";
export const AllProductsCard = () => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/api/product")
      .then((response) => response.json())
      .then((products) => {
        setProducts(products.products);
      });
  }, []);

  return (
    <>
      {products ? (
        <OneCard title={'Productos'} quantity={products.length} icon={faWineBottle}/>
        // <div className="productCard">
        //   <FontAwesomeIcon className="wineBotleIco" icon={faWineBottle} />
        //   <h2>Productos</h2>
        //   <p>{products.length}</p>
        //   <div></div>
        // </div>
      ) : (
        "Cargando"
      )}
    </>
  );
};
