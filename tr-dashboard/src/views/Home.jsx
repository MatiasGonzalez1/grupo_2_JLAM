import React from "react";
import "./Home.css";
import LastAddedProducts from "../Components/Productos/LastAddedProducts/LastAddedProducts";
import { AllProductsCard } from "../Components/AllProductsCard/AllProductsCard";
import CategoriesCards from "../Components/Categorias/CategoriesCards/CategoriesCards";

function Home() {

    return <div className="content-wrapper">
        
        <div className="card-content">
          {/* tarjetas total usuarios, productos, etc  */}
          <div className="example2">
          </div>
          <div className="example2">
          <AllProductsCard/>
          </div>
          <div className="example2">
          </div>
        </div>
        <div className="other-content">
          {/* ultimos productos */}
          <LastAddedProducts/>
          <CategoriesCards/>
        </div>
    
        {/* <!-- Main Content --> */}
    
    </div>
  }

export default Home ;
