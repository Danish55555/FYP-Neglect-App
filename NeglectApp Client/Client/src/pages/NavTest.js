import React from "react";
import './navt.css'
import { Link} from "react-router-dom"
import {useSelector} from 'react-redux';
import axios from 'axios';
import LogoutIcon from '@mui/icons-material/Logout';

function NavTest(){
    

    const auth=useSelector(state=>state.auth);
    const {user,isLogged}=auth;
    //setppic()
  //console.log(user.role)  
    const handleLogout=async()=>{
    try{
      await axios.get('/guardian/logout');    
      localStorage.removeItem('firstLogin')
window.location.href='/'
    
    }
    catch(err){
      console.log(err)
      
       }
    }
  

    
   
    
    function navToggle() {
        const btn = document.getElementById('menu-btn')
        const nav = document.getElementById('menumobilecheck')
      btn.classList.toggle('openclasscheck')
      nav.classList.toggle('hiddenclasscheck')
      document.body.classList.toggle('no-scroll')
    }
    
    
    





    return(
    <div className="cleass">
<div>
  <nav className="navbarhome">
    <div className="navbarwrapperhome"
    
    
    
    
    
    >
      <div className="navbarlogohome">
        <Link to="/">
          <img src="https://image.shutterstock.com/image-vector/check-back-soon-hand-lettering-600w-1379832464.jpg" alt="Starbucks" />
        </Link>
      </div>
      <ul className="navbarlefthome"
      
      style={{listStyleType:'none'}}
      >
        <li>
          <Link to="/"
          style={{color:'#000'}}
          
          >Home</Link>
        </li>
        {isLogged && user.role===1
        
        ?<li>
        <Link to="/dashboard"
         style={{color:'#000'}}
        >Dashboard</Link>
      </li>:''
    
    }
             {isLogged && user.role===2
        
        ?<li>
        <Link to="/docdashboard"
         style={{color:'#000'}}
        >Dashboard</Link>
      </li>:''
    
    }   
        
      </ul>
      <ul className="navbarrighthome"
      
           
      style={{listStyleType:'none'}}
      >
        <li>
          <a href="https://www.cricbuzz.com/"
          style={{color:'#000'}} >
            <img src="https://image.shutterstock.com/image-vector/check-back-soon-hand-lettering-600w-1379832464.jpg" alt='hh' />
            <span>Find a store</span>
          </a>
        </li>
        {!isLogged ? 
        <li><Link className="btn btn-dark text-white" to='/login'
        style={{cursor: 'pointer',
          display: 'inline-block',
          background: 'none',
          border: '1px #000 solid',
          borderRadius: '50px',
          padding: '7px 16px',
          lineHeight: '1.2',
          textAlign: 'center',
          textDecoration: 'none',
        color:"#000"}}
        
        
        >Sign in</Link></li>:''
}
{!isLogged?
        <li
       
        ><Link className="btn btn-dark text-white" to='/register'
        
        style={{cursor: 'pointer',
        display: 'inline-block',
        background: '#000',
        border: '1px #000 solid',
        borderRadius: '50px',
        padding: '7px 16px',
        lineHeight: '1.2',
        textAlign: 'center',
        textDecoration: 'none',
      color:'#fff'}}

        
        >Sign up</Link></li>:''}

{isLogged? <button onClick={handleLogout}


style={{cursor: 'pointer',
background: '#000',
border: '1px #000 solid',
borderRadius: '50px',
padding: '9px 16px',
lineHeight: '1.2',
textAlign: 'center',
textDecoration: 'none',
color:'#fff',
display:'flex',
justifyContent:"space-between",
alignItems:'center'
}}
>Logout {<LogoutIcon fontSize="small"/>}

</button>:'' }

      </ul>
      {/* Hamburger Menu */}
      <button type="button" className="hamburgerhome" id="menu-btn"
      
      onClick={()=>{navToggle()}}
      >
        <span className="hamburgertophome" />
        <span className="hamburgermiddlehome" />
        <span className="hamburgerbottomhome" />
      </button>
    </div>
  </nav>
  {/* Mobile Menu */}
  <div className="mobilemenuhome hiddenclasscheck" id="menumobilecheck">
    <ul
    
         
    style={{listStyleType:'none'}}
    >

<li>
          <Link to="/" className="mobilelink"
          style={{color:'#000'}}
          
          >Home</Link>
        </li>



        {isLogged && user.role===1
        
        ?<li>
        <Link to="/dashboard" className="mobilelink"
         style={{color:'#000'}}
        >Dashboard</Link>
      </li>:''
    
    }
             {isLogged && user.role===2
        
        ?<li>
        <Link to="/docdashboard" className="mobilelink"
         style={{color:'#000'}}
        >Dashboard</Link>
      </li>:''
    
    }   
    









    </ul>
    <div className="mobilemenubottomhome">


    {!isLogged ? 
        <Link className="btn btn-dark text-white" to='/login'
        style={{cursor: 'pointer',
          display: 'inline-block',
          background: 'none',
          border: '1px #000 solid',
          borderRadius: '50px',
          padding: '7px 16px',
          lineHeight: '1.2',
          textAlign: 'center',
          textDecoration: 'none',
        color:'#000'}}
        
        
        >Sign in</Link>:''
}




{!isLogged?
        <Link className="btn btn-dark text-white" to='/register'
        
        style={{cursor: 'pointer',
        display: 'inline-block',
        background: '#000',
        border: '1px #000 solid',
        borderRadius: '50px',
        padding: '7px 16px',
        lineHeight: '1.2',
        textAlign: 'center',
        textDecoration: 'none',
      color:'#fff'}}

        
        >Sign up</Link>:''}


{isLogged? <button onClick={handleLogout}


style={{cursor: 'pointer',
background: '#000',
border: '1px #000 solid',
borderRadius: '50px',
padding: '7px 16px',
lineHeight: '1.2',
textAlign: 'center',
textDecoration: 'none',
color:'#fff',
display:'flex',
justifyContent:'space-between',
alignItems:"center"}}
>Logout{<LogoutIcon fontSize="small"/>}</button>:'' }










      
      <div>
        <a href="https://www.cricbuzz.com/"
         style={{color:'#000'}}
        >
          <img src="https://image.shutterstock.com/image-vector/check-back-soon-hand-lettering-600w-1379832464.jpg" alt="sss" />
          <span>Find a store</span>
        </a>
      </div>
    </div>
  </div>
</div>

    </div>

        )
    ;
  }
  export default NavTest;