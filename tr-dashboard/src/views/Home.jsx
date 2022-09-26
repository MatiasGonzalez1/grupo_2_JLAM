import React from "react";
import "./Home.css";
import LastAddedProducts from "../Components/Productos/LastAddedProducts/LastAddedProducts";
import { AllProductsCard } from "../Components/AllProductsCard/AllProductsCard";
import AllCategoriesCard from "../Components/Categorias/AllCategoriesCard/AllCategoriesCard";
import AllUsersCard from "../Components/Usuarios/AllUsersCard/AllUsersCard"
import CategoriesCards from "../Components/Categorias/CategoriesCards/CategoriesCards";
import Bienvenida from "../Components/Bienvenida/Bienvenida";

function Home() {

    return <div className="content-wrapper">
        <Bienvenida welcomeTitle={"Home"}/>
        <div className="card-content">
          <AllProductsCard/>
          <AllCategoriesCard/>
          <AllUsersCard/>
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
