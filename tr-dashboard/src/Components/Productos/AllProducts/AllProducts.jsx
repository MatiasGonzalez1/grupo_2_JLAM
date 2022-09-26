import React, { useState, useEffect } from "react";
import "./allProducts.css";
import Formatter from "../../../utils/Formatter";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Bienvenida from "../../Bienvenida/Bienvenida";

export const AllProducts = () => {
  const [products, setProducts] = useState(null);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(0);
  

  useEffect(() => {
    fetch(`http://localhost:3001/api/product?page=${page}`)
      .then((response) => response.json())
      .then((products) => {
        setProducts(products.products);
        setLimit(products.count);
      });
  }, [page]);

  let totalPages = Math.ceil(limit);

  function handleClickNext(){
    if (page < totalPages ) {
      setPage(page + 1)
    }
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
    <Bienvenida welcomeTitle={"Productos"}/>
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
                    <Link to={`/product-detail/${product.id}`} className='linkTo'><button>Detalle</button></Link>
                </li>
              </ul>
            );
          })}
          <div className="buttonPages">
            <FontAwesomeIcon className="button-Icons" icon={faArrowLeft} onClick={handleClickPrev}/>
            <p>{page+1}</p>
            <FontAwesomeIcon  className="button-Icons" icon={faArrowRight} onClick={handleClickNext}/>
          </div>
        </div>
      ) : (
        "Cargando"
      )}
    </>
  );
};

export default AllProducts;
