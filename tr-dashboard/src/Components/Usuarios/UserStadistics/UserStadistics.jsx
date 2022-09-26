import React from 'react'

function UserStadistics(datos) {

  return (
    
    <div className="categories-cards">
                    {datos.datos.map((datos, i) => (
                    
                    <div className="card" key={i}>
                        <div className='line'></div>
                        <div className='categoy-content'>
                            <p className='category-name'>{datos.detalle}</p>
                            <p className='category-amount'><span>{datos.dato}</span></p>
                        </div>
                    </div>  
                ))
                } 
    </div>
  )
}

export default UserStadistics