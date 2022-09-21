import React from "react";
import Bienvenida from "../Components/Bienvenida/Bienvenida";
import "./Home.css";
import LastAddedProducts from "../Components/LastAddedProducts/LastAddedProducts";

function home() {

    return <div className="content-wrapper">
        {/* <div className="color">
          <p>sda</p>
        </div> */}
        <Bienvenida/>
        <div className="card-content">
          {/* tarjetas total usuarios, productos, etc  */}
          <div className="example2">
          </div>
          <div className="example2">
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

export default home ;
