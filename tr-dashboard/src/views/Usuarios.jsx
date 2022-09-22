import React, { useEffect , useState } from "react";
import LastUserDetail from "../Components/Usuarios/LastUserDetail/LastUserDetail";
import './Usuarios.css';

function Usuarios() {
  const [lastCreated, setLastCreated] = useState({});
  const [users, setUsers] = useState([]);
  
  const getUsers = async()=>{
    try {
        const result = await fetch(`http://localhost:3001/api/users`)
        const usersJson = await result.json();
        setUsers(usersJson);
        setLastCreated(usersJson.lastUser);
    } catch (error) {
        console.log(error);
    }
  }
  useEffect(() => {
    getUsers();
  }, []);
  
  return <div className="users-main-container">
        <div className="all-users">
          <h2>titulo + tarjetas de usuarios con paginado</h2>
          <div className="user-card-container">
            <div className="user-card"></div>
            <div className="user-card"></div>
            <div className="user-card"></div>
            <div className="user-card"></div>
            <div className="user-card"></div>
          </div>
        </div>
        <div className="last-users-container">
            <div className="recent-users"></div>
            <LastUserDetail lastUser={lastCreated} />
        </div>
    </div>
}

export default Usuarios;