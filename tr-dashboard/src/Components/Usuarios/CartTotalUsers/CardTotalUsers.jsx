import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUserGroup} from "@fortawesome/free-solid-svg-icons";


function CartTotalUsers() {
    const [usuarios, setUsuarios] = useState(undefined);

    useEffect(() => {
        fetch(`http://localhost:3001/api/users/`)
            .then(function (response) {
                return response.json();
            })
            .then(function (usuarios) {
                setUsuarios([usuarios])
            })
            .catch(error => console.error(error));

    }, [])
    console.log(usuarios)
    return (
        <>
        {usuarios.map((usuario,i)=>{
            return(
                <ul key={i}>
                  <li key={i}>
            <div className="content__card"></div>
            <div className="card__icon">
            <FontAwesomeIcon className="icon__user" icon={faUserGroup} /></div>
            <div className="card">
            <h2>Usuarios</h2>
            <p className="total">{usuario.count}</p></div>
            </li>
            </ul>
            );
        })}
        </>
    );

}
export default CartTotalUsers;
