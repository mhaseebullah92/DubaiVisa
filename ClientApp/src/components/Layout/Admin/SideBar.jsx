import React from "react";
import { Link, useLocation } from "react-router-dom";
import Logout from "./logout";

const Sidebar =()=>{
    const location = useLocation();

  // Define your navigation links and corresponding paths
  const navLinks = [
    { name: 'Home', path: '/dashboard' },
    { name: 'Country', path: '/country' },
    { name: 'Visa Plans', path: '/packages' },
    { name: 'Add ONs', path: '/addons' },
    { name: 'Users Applications', path: '/users-applications' },
  ];
    return(<>
    <nav id="sidebar">
                <div className="sidebar-header">
                    <h3>Admin Panel</h3>
                </div>

                <ul className="list-unstyled components">
                    {/* <p>Menu</p> */}
                    {navLinks.map((link) => (
                        <li key={link.path} className={location.pathname === link.path ? 'active' : ''}>
                            <Link to={link.path}>{link.name}</Link>
                        </li>
                        ))}
                    {/* <li  className={location.pathname === link.path ? 'active' : ''}>
                        <a href="/dashboard" >Home</a>
                    </li> */}
                    {/* <li>
                        <a href="#">About</a>
                        <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false">Pages</a>
                        <ul className="collapse list-unstyled" id="pageSubmenu">
                            <li><a href="#">Page 1</a></li>
                            <li><a href="#">Page 2</a></li>
                            <li><a href="#">Page 3</a></li>
                        </ul>
                    </li> */}
                    {/* <li>
                        <a href="/country">Country</a>
                    </li>
                    <li>
                        <a href="/dashboard">Visa Plans</a>
                    </li>
                    <li>
                        <a href="/dashboard">Add On</a>
                    </li> */}
                    {/* <li>
                        <a href="#">Contact</a>
                    </li> */}
                </ul>

                <ul className="list-unstyled CTAs">
                    <li><Logout /></li>
                    {/* <li><a href="https://bootstrapious.com/tutorial/files/sidebar.zip" className="download">Download source</a></li> */}
                    {/* <li><a href="https://bootstrapious.com/p/bootstrap-sidebar" className="article">Back to article</a></li> */}
                </ul>
            </nav>
    
    </>);
}

export default Sidebar;