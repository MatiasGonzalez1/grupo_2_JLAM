import React from "react";
import ProductDetailData from "./ProductDetailData/ProductDetailData";
import "./ProductDetail.css";

function ProductDetail() {
    return <div className="content-wrapper">
        {/* banner con los datos del admin */}
        <div className="color">
        </div>

        {/* componente con los detalles */}
        <ProductDetailData/>
        
    </div>
  }

export default ProductDetail;
