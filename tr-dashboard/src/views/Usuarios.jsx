import React, { useEffect, useState } from "react";
import LastUserDetail from "../Components/Usuarios/LastUserDetail/LastUserDetail";
import UserInfoCard from "../Components/Usuarios/UserInfoCard/UserInfoCard";
import { faUserClock, faUsers, faPersonCane } from "@fortawesome/free-solid-svg-icons";
import "./Usuarios.css";


function Usuarios() {
  const [lastCreated, setLastCreated] = useState({});
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const result = await fetch(`http://localhost:3001/api/users`);
      const usersJson = await result.json();
      console.log(usersJson);
      setUsers(usersJson);
      setLastCreated(usersJson.lastUser);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);


  return (
    <div className="users-main-container">
      <div className="card-content">
          <UserInfoCard title={'Total registros'} quantity = {users.count} icon = {faUsers}/>
        
          <UserInfoCard title = {'Esta semana'} quantity = {'20'} icon = {faUserClock}/>
        
          <UserInfoCard title = {'Edad promedio'} quantity = {users.edadPromedio} icon = {faPersonCane}/>
      </div>
      <div className="last-users-container">
        <div className="recent-users"></div>
        <LastUserDetail lastUser={lastCreated} />
      </div>
    </div>
  );
}

export default Usuarios;
