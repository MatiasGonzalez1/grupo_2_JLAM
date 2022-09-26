import {React} from 'react'
import './UserCard.css'

function UserCard({id, firsName, lastName, email, fechaRegistro, imgPath, detailLink}) {  
    const pathPrefix = 'http://localhost:3001/img/profileImages/'

  return (
    <>
        <div className="user-card" key={id}>
            <section className='img-user-container'>
                <img className='img-user' alt='UserImage' src= {`${pathPrefix}${imgPath}`}/>
            </section>
            <section className='id-user-container'>
                <span className='id-user'>{id}</span>
            </section>
            <section className='info-user-container'>
                <p className='info-user-name'>{`${firsName}  ${lastName}`}</p>
                <p className='info-user-email'>{email}</p>
                <p className='info-user-registro'>{fechaRegistro}</p>
            </section>
            <div className='info-user-line-container'>
                <div className='info-user-line'></div>
            </div>
            {/* <section className='options-user-container'>{detailLink}</section> */}
        </div>
    </>
  )
}

export default UserCard