import React from 'react';
import './Navbar.css' ;
import { NavLink } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav>
      <div className='navbarContainer'>
      <div className='leftDiv'>
        <ul className='nav-menu'> 
            <li className='nav-item-left'>
                <NavLink exact="true" to="/" className={({ isActive }) => "nav-link" + (isActive ? "current" : "")}>
                  Hjem
                </NavLink>
              </li>
              <li className='nav-item-left'>
              <NavLink exact="true" to="/opprettLeker" className={({ isActive }) => "nav-link" + (isActive ? "current" : "")}>
                  Opprett Leker
                </NavLink>
              </li>
              <li className='nav-item-left'>
                <NavLink exact="true" to="/minside" className={({ isActive }) => "nav-link" + (isActive ? "current" : "")}>
                  Min Side
                </NavLink>
              </li>
              <li className='nav-item-left'>
                <NavLink exact="true" to="/spinthewheel" className={({ isActive }) => "nav-link" + (isActive ? "current" : "")}>
                  Spin The Wheel
                </NavLink>
              </li>
              </ul>
            </div>
            <div className='rightDiv'>
              <ul>
              <li className='nav-item-right'>
                <NavLink exact="true" to="/LoggInn" className={({ isActive }) => "nav-link" + (isActive ? "current" : "")}>
                  Logg inn
                </NavLink>
              </li>
        </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;