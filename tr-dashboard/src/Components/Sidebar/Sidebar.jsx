import React, { useState, useEffect } from "react";
import Logo from "../../Assets/images/logo-w.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser, faWineBottle, faWineGlass } from "@fortawesome/free-solid-svg-icons";
import Img from "../../Assets/images/admin@admin.com_1657413736084.png";
import Get from "../../utils/Request.js";

function Sidebar() {
    const [usuarios, setUsuarios] = useState([]);
    /*handleShow=() => {
        let side = document.querySelector(".container__sidebar")
        console.log("soy el boton")
        this.setState({ showSidebar: true });
        console.log(this.state.showSidebar)
    }*/
    useEffect(() => {
        fetch(`http://localhost:3001/api/users/2`)
		.then(function(response) {
			return response.json();
		})
		.then(function(usuarios) {
			setUsuarios([usuarios])
		})
		.catch(error => console.error(error));
		//le cambiamos el estado a movies
	},[])
    console.log(usuarios)
    return (

        <>
            <ul className="container__sidebar">

                <div className="content__nav">
                    <button className="icon__content">
                        <FontAwesomeIcon className="icon__hamburguer" icon={faBars} />
                    </button>
                    <Link className="logo__content" to="/">
                        <img src={Logo} className="logo_terra" alt="terraRossa logo" />
                    </Link>
                </div>

                <div className="data_content">
                    {usuarios.map((usuario,i)=> {
                        return (
                            <ul key={i}>
                                <li key={i}>
                            <div className="user__sidebar">{usuario.firstName}</div>
                            <div className="user__sidebar_correo">{usuario.email}</div>
                            <div className="user__sidebar_img">
                                <img src={Img} className="img_user" alt="imagen de usuario" /></div></li>
                            </ul>
                        );
                        })}
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
        </>
    )
}


export default Sidebar;