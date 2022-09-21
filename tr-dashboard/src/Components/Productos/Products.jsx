import React from "react";
import ProductDetail from "./ProductDetail/ProductDetail";
import "./Products.css";

function Products() {
    return <div className="content-wrapper">
        {/* banner con los datos del admin */}
        <div className="color">
        </div>

        {/* componente con los detalles */}
        <ProductDetail/>
        
    </div>
  }

export default Products ;
