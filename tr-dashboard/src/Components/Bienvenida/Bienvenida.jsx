import React from 'react'
import './Bienvenida.css'
import welcomeBg from '../../Assets/images/welcome-bg.png'

function Bienvenida({welcomeTitle}) {
  return (
    
    <div className='welcomeComp'>
        <div className='welcome'>
            <p className='userName'>Admin</p>
            <p className='welcome-msg'>Que bueno volver a verte!</p>
        </div>
        <div>
          <span className='title'>{welcomeTitle}</span>
        </div>
        <img src={welcomeBg} className="welcome-bg" alt="terraRossa logo" />
    </div>
  )
}

export default Bienvenida