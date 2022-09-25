import React, { useState, useEffect } from "react";
import "./allProducts.css";
import Formatter from "../../../utils/Formatter";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

export const AllProducts = () => {
  const [products, setProducts] = useState(null);
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:3001/api/product?page=${page}`)
      .then((response) => response.json())
      .then((products) => {
        setProducts(products.products);
      });
  }, [page]);

  function handleClickNext(){
    setPage(page + 1)
  }

  function handleClickPrev(){
    if(page > 0){
      setPage(page - 1)
    } else{
      setPage(page - 0)
    }
  }

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
          {products.map((product, i) => {
            return (
              <ul key={i}>
                <li>
                  
                    <h3>{product.name}</h3>
                    <p>${Formatter.format(product.price)}</p>
                    <p>{product.stock}u.</p>
                    <Link to={`/product-detail/${product.id}`} className='linkTo'>Detalle</Link>
                </li>
              </ul>
            );
          })}
          <div className="buttonPages">
          <FontAwesomeIcon icon={faArrowLeft} onClick={handleClickPrev}/>
          <p>{page}</p>
          <FontAwesomeIcon icon={faArrowRight} onClick={handleClickNext}/></div>
        </div>
      ) : (
        "Cargando"
      )}
    </>
  );
};

export default AllProducts;
