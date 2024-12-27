import React, { Profiler, useContext, useEffect, useState } from 'react'
import './Header.css'
import {assets} from '../../assets/assets'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link, useNavigate } from 'react-router-dom';
import { Storecontext } from '../../context/Storecontext';

const Header = ({setShowlogin}) => {
  const [menu, setMenu] = useState(localStorage.getItem('menu') || 'Home');
  const {token,setToken}=useContext(Storecontext)
  const {getTotalcartamount}=useContext(Storecontext)
  const {setShowSearch}=useContext(Storecontext)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate=useNavigate()
  
  useEffect(() => {
    localStorage.setItem('menu', menu);
  }, [menu]);

  const logout=()=>{
    localStorage.removeItem("token")
    setToken("")
    navigate("/")
  }
  return (
    <Navbar expand="lg" className="bg-body-tertiary navbar">
      
      <Container>
      <Navbar.Brand href="#home">
            <Link to='/'><img
              src={assets.logo}
              width="80"
              height="40"
              className="d-inline-block align-top navbar-logo"
              alt=""
              onClick={()=>setMenu("Home")}
            /></Link>
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className='toggle-icon'   />
        <Navbar.Collapse id="basic-navbar-nav">
                  <Offcanvas show={show} onHide={handleClose}>
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title><img
              src={assets.logo}
              width="80"
              height="40"
              className="d-inline-block align-top navbar-logo"
              alt=""
              onClick={()=>setMenu("Home")}
            /></Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    <Nav className="mx-auto">
                  <Nav.Link  as ={Link} to="/" onClick={()=>{setMenu("Home");{handleClose()}}} className={menu==="Home"?"active":""}>HOME</Nav.Link>
                  <Nav.Link as ={Link} to="/allmenu" onClick={()=>{setMenu("Menu");{handleClose()}}} className={menu==="Menu"?"active":""}>MENU</Nav.Link>
                  <Nav.Link as ={Link} to="/"  onClick={()=>{setMenu("Mobile-App");{handleClose()}}} className={menu==="Mobile-App"?"active":""}>MOBILE APP</Nav.Link>
                  <Nav.Link as ={Link} to="/"  onClick={()=>{setMenu("Contact-us");{handleClose()}}} className={menu==="Contact-us"?"active":""}>CONTACT US</Nav.Link>
                  </Nav>
                  </Offcanvas.Body>
                </Offcanvas>
                <div className="offcanvas">
                <Nav className="mx-auto " >
                  <Nav.Link  as ={Link} to="/" onClick={()=>setMenu("Home")} className={menu==="Home"?"active":""}>HOME</Nav.Link>
                  <Nav.Link as ={Link} to="/allmenu" onClick={()=>setMenu("Menu")} className={menu==="Menu"?"active":""}>MENU</Nav.Link>
                  <Nav.Link as ={Link} to="/"  onClick={()=>setMenu("Mobile-App")} className={menu==="Mobile-App"?"active":""}>MOBILE APP</Nav.Link>
                  <Nav.Link as ={Link} to="/"  onClick={()=>setMenu("Contact-us")} className={menu==="Contact-us"?"active":""}>CONTACT US</Nav.Link>
                  </Nav>
                  </div>
        </Navbar.Collapse>
        <div className='one'>
        <div href="#home">
            <img
              src={assets.search_icon}
              width="30"
              height="30"
              className="searchicon"
              alt=""
              onClick={()=>setShowSearch(true)} 
            />
          </div> 
          <div href="#home">
            <div className='navbar-basket-icon'>
            <Link to='/cart'><img
              src={assets.basket_icon}
              width="30"
              height="30"
              className="basketicon"
              alt=""
              onClick={()=>setMenu("Cart")}
            /></Link>
            <div className={getTotalcartamount()===0?"":"dot"}></div>
            </div>
          </div>
          {!token?<Button type="signin" className="signin " onClick={()=>setShowlogin(true)}>Sign in</Button>:
          <div className="navbar-profile">
            <img src={assets.profile_icon}  alt="" className='basketicon' />
            <ul className="nav-profile-dropdown">
              <li onClick={() => { setMenu("Orders"); navigate('/myorders'); }} ><img src={assets.bag_icon}  alt="" /><p>ORDERS</p></li>
              <hr className='hr1'/>
              <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>LOGOUT</p></li>
            </ul>
          </div>
          }
          <Navbar.Toggle aria-controls="basic-navbar-nav" className='toggle-icon1' onClick={handleShow} />
          </div>
          
      </Container>
    </Navbar>
  )
}

export default Header
