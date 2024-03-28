import React, { useState } from "react";
import './navbar.css';
import {MdOutlineTravelExplore} from 'react-icons/md';
import {AiFillCloseCircle} from 'react-icons/ai';
import {TbGridDots} from 'react-icons/tb';
import { Link } from 'react-router-dom';
import logoImage from "../../Assets/logodubaitravelt.png";

const Navbar= () => {
    const [active, setActive]= useState('navBar')
    const showNav = ()=>{
        setActive('navBar activeNavbar')
    }
    const removeNavbar = ()=>{
        setActive('navBar')
    }
    
    return (
        <section className="navBarSection">
            <header className="header flex">

                <div className="logoDiv">
                    <Link to="/" className="logo flex">
                        <img  src={logoImage} width="100px" alt="website logo" ></img>
                        {/* <h1><MdOutlineTravelExplore className="icon" />Travel.</h1> */}
                    </Link>
                </div>

                <div className={active}>
                    <ul className="navLists flex">
                        <li className="navItem">
                            
                             {/* <NavLink >Home</NavLink> */}
                            <Link to="/" className="navLink">Home</Link>
                        </li>
                        <li className="navItem">
                            <Link to="/track" className="navLink">Track</Link>
                        </li>
                        <li className="navItem">
                            <Link to="/faq" className="navLink">FAQ</Link>
                        </li>
                        <li className="navItem">
                            <Link to="/contact" className="navLink">Contact</Link>
                        </li>
                        {/* <li className="navItem">
                            <Link  className="navLink" to="/counter">Counter</Link>
                        </li>
                        <li className="navItem">
                            <Link className="navLink" to="/fetch-data">Fetch data</Link>
                        </li> */}<a href="https://wa.link/9y6f5t" target="_blank" rel="noopener noreferrer" >
                        <button className="btn-cus">
                           <a> Emergency<br/>Service</a>
                        </button></a>
                    </ul>

                    <div onClick={removeNavbar} className="closeNavbar">
                        <AiFillCloseCircle className="icon" />
                    </div>

                </div>
                <div onClick={showNav} className="toggleNavbar">
                    <TbGridDots className="icon" />
                </div>

            </header>
        </section>
    )
}

export default Navbar