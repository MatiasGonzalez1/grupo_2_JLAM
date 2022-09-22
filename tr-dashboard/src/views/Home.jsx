import React from "react";
import "./Home.css";
import LastAddedProducts from "../Components/Productos/LastAddedProducts/LastAddedProducts";
import { AllProductsCard } from "../Components/AllProductsCard/AllProductsCard";

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
          <div className="categories-cards">
            {/* tarjetas categorias con total productos */}
            <div className="example3">
            
            </div>
            <div className="example3">
            
            </div>
            <div className="example3">
            
            </div>
            <div className="example3">
            
            </div>
            <div className="example3">
            
            </div>
          </div>
        </div>
    
        {/* <!-- Main Content --> */}
    
    </div>
  }

export default Home ;
