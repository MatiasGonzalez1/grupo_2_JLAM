import React from "react";
import Img from "../../../Assets/images/admin@admin.com_1657413736084.png";

function SubSidedbar({props}) {
    return (
        <div className="data_content">
            <div className="user__sidebar">admin</div>
            <div className="user__sidebar_correo">admin_admin@gmail.com</div>
            <div className="user__sidebar_img">
                <img src={Img} className="img_user" alt="imagen de usuario" /></div>
        </div>
    )
}

export default SubSidedbar
