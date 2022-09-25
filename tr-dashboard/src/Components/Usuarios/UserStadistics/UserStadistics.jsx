import React from 'react'

function UserStadistics(datos) {

    console.log(datos);
  return (
    
    <div className="categories-cards">
                    {datos.datos.map((datos, i) => (
                    
                    <div className="card">
                        <div className='line'></div>
                        <div className='categoy-content'>
                            <p className='category-name' key={i}>{datos.detalle}</p>
                            <p className='category-amount'><span>{datos.dato}</span></p>
                        </div>
                    </div>  
                ))
                } 
    </div>
  )
}

export default UserStadistics