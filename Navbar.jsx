import React from 'react'
import {Link} from "react-router-dom"


function Navbar() {
  return (
    <div className='d-flex justify-content-around'>
      <div>
       <h3 className='text-danger fw-bold'> REACT REDUX SHOPPING CART</h3>
      </div>
      <div> 
        <Link to={"/"} className='me-3 text-decoration-none text-dark'>Home</Link>
        <Link to={"/cart/:id"} className='text-decoration-none text-dark'>Cart</Link>
      </div>
    </div>
  )
}

export default Navbar