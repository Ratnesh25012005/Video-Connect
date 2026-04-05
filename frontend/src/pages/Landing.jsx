import React from 'react'
import "../App.css"
import {Link, useNavigate} from 'react-router-dom'
export default function Landing() {
  
  const router = useNavigate();

  return (
    
    <div className='landingPageContainer'>
      <nav>
        <div className='navHeader'>
          <h2>Apna Video Call</h2>
        </div>
        <div className='navList'>
          <p onClick={()=>{
            router("/deo89")
          }}>Join as Guest</p>
          <p onClick={()=>{
            router("/auth")
          }}>Register</p>
          <p onClick={() => router("/auth")}>Login</p>
        </div>
      </nav>

      <div className="landingMainContainer">
        <div>
          <h1> <span style={{color:"orange"}} >Connect</span> with your loved ones</h1>
          <p>Cover a distance with Apna Video Call</p>
          <div role="button">
            <Link to={"/auth"}>Get Started</Link>
          </div>
        </div>
        <div>
          <img src="/mobile.png" alt="" />
        </div>
      </div>
    </div>
  )
}
