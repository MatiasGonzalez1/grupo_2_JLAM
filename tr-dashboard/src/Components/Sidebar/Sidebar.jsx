import React, { useState, useEffect } from "react";
import Logo from "../../Assets/images/logo-w.png";
import "./sidebar.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser, faWineBottle, faWineGlass } from "@fortawesome/free-solid-svg-icons";
import Img from "../../Assets/images/admin@admin.com_1657413736084.png";
import Get from "../../utils/Request.js";

function Sidebar() {
    const [usuarios, setUsuarios] = useState([]);
    
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

    const handleShow=() => {
        let but = document.querySelector(".icon__hamburguer")
        let sid = document.querySelector(".container__sidebar").classList.toggle('active')
        
    }
    return (

        <>
            <ul className="container__sidebar">

                <div className="content__nav">
                    <Link className="logo__content" to="/">
                        <img src={Logo} className="logo_terra" alt="terraRossa logo" />
                    </Link>
                    <button className="icon__content" onClick={()=>handleShow()} icon={faBars}>
                        <FontAwesomeIcon className="icon__hamburguer" icon={faBars} />
                    </button>
                </div>

                <div className="data_content">
                    {usuarios.map((usuario,i)=> {
                        return (
                            <ul key={i}>
                                <ul key={i}>
                            <div className="user__sidebar">{usuario.data.firstName}</div>
                            <div className="user__sidebar_correo">{usuario.data.email}</div>
                            <div className="user__sidebar_img">
                                <img src={Img} className="img_user" alt="imagen de usuario" /></div></ul>
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