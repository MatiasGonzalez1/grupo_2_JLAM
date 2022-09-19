import React from "react";
import Logo from "../../Assets/images/logo-w.png";
import Img from "../../Assets/images/admin@admin.com_1657413736084.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBars,faUser,faWineBottle,faWineGlass} from "@fortawesome/free-solid-svg-icons";
import Get from "../../utils/Request.js";


function Sidebar() {

    /*fetch(`http://localhost:3001/api/users/`)
    .then(response => response.json())
    .then(usuarios => console.log(usuarios.data)) */

    return (

        <ul className="container__sidebar">

            <div className="content__nav">
                <button className="icon__content">
                    <FontAwesomeIcon className="icon__hamburguer" icon={faBars} />
                </button>
                <div className="logo__content">
                    <img src={Logo} className="logo_terra" alt="terraRossa logo" />
                </div>
            </div>
           <div className="data_content">
            <div className="user__sidebar">Administrador</div>
            <div className="user__sidebar_correo">admin_admin@gmail.com</div>
            <div className="user__sidebar_img">
                <img src={Img} className="img_user" alt="imagen de usuario" /></div>
            </div>
            <div className="container__paneles">
            <li className="container__panel">
                <Link className="panel" to="/usuarios">
                <FontAwesomeIcon className="icon__user" icon={faUser} />
                    <span className="name__panel">Usuarios</span></Link>
            </li>

            <li className="container__panel">
                <Link className="panel" to="/productos">
                <FontAwesomeIcon className="icon__user" icon={faWineBottle} />
                <span className="name__panel">Productos</span></Link>
            </li>

            <li className="container__panel">
                <Link className="panel" to="/categorias">
                <FontAwesomeIcon className="icon__user" icon={faWineGlass} />
                <span className="name__panel">Categorias</span></Link>
            </li>
            </div>
        </ul>
        
    )
}

export default Sidebar;