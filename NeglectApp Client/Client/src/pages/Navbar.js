
import React from "react"
import { Link} from "react-router-dom"
import {useSelector} from 'react-redux';
import axios from 'axios';
export default function Navbar(){

   


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
  

    

  const userLink=()=>{

    const link1= <li className="nav-item" key="item7">
    <Link  to='/'  key={"heh1"} className="nav-link js-scroll-trigger">
{user.name}</Link></li>
    
    const link2=<li className="nav-item" key="item8">
    <Link to='/' onClick={handleLogout}
    className="nav-link js-scroll-trigger" key={"heh2"}>Logout</Link></li>
    
        return( [
          
        link1,link2
        
        ]
        )
        
        }
    
    
    







return(
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 fixed-top">
      <div className="container">
        <Link to="/" className="navbar-brand">Neglect App</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navmenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navmenu">
        <ul className="navbar-nav text-uppercase ml-auto align-items-center" >
          
          
          {isLogged && user.role===1? 
                    <li className="nav-item" key="item4">
                      <Link className="nav-link js-scroll-trigger" to='/detector'>Detector</Link>
                    </li> :''
                    
          }
                    
          {isLogged  ? userLink() : <li className="nav-item" key="item5"><Link to='/login' className="nav-link js-scroll-trigger" >Login</Link></li>
          }
          
          <li className="nav-item" key="item6">
          {isLogged? "":<Link to='/register'  className="nav-link js-scroll-trigger">signup</Link>  }
          </li>
          
          <li className="nav-item" key="item77">
          {isLogged && user.role===1? <Link to='/profile'  className="nav-link js-scroll-trigger">Profile</Link>:'' }
          </li>
          
          
          <li className="nav-item" key="item66">
          {isLogged && user.role===2? <Link to='/doctorprofile'  className="nav-link js-scroll-trigger">Profile</Link>:'' }
          </li>
          
          <li className="nav-item" key="item69">
          {isLogged && user.role===1 ? <Link to='/dashboard' className="nav-link js-scroll-trigger" >Dashboard</Link>:''}
          
          </li>
          
          
          <li className="nav-item" key="item70">
          {isLogged && user.role===2 ? <Link to='/docdashboard' className="nav-link js-scroll-trigger" >Dashboard</Link>:''}
          
          </li>
          
          
                   
                  </ul>
        </div>
      </div>
    </nav>
)

}