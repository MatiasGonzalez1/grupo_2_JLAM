import React from "react";
import "./LastUserDetail.css";
import Img from "../../../Assets/images/admin@admin.com_1657413736084.png";


function LastUserDetail(props) {

  const dateFormat =(date)=>{
    var sqlDate = new Date(date); 
    return sqlDate.toLocaleString(); 
  };
  
  return <div className="last-user">
      <div className="last-user-line"></div>
        <h2>último usuario creado</h2>
        <div className="last-user-card">
        <img src={Img} alt="" />
        <div className="last-user-data">
          <p>nombre: <span>{props.lastUser.firstName ? props.lastUser.firstName : ''}</span></p>
          <p>apellido: <span>{props.lastUser.lastName ? props.lastUser.lastName : ''}</span></p>
          <p>email: <span>{props.lastUser.userEmail ? props.lastUser.userEmail : ''}</span></p>
          <p>categoría: <span>{props.lastUser.userCategory ? props.lastUser.userCategory.userCategoryName : ''}</span></p>
          <p>fecha de registro: <span>{props.lastUser.createAt? dateFormat(props.lastUser.createAt) : ''}</span></p>
        </div>
        </div>
    </div>
}

export default LastUserDetail ;
