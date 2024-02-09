import React from 'react';
import './Navbar.css' ;
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav>
      <div className='navbarContainer'>
      <div className='leftDiv'>
        <ul className='nav-menu'> 
            <li className='nav-item-left'>
                <Link to="/pages/hjem/Hjem.js" className='nav-link'>
                  Hjem
                </Link>
              </li>
              <li className='nav-item-left'>
                <Link to="/opprettleker" className='nav-link'>
                  Opprett Leker
                </Link>
              </li>
              <li className='nav-item-left'>
                <Link to="/minside" className='nav-link'>
                  Min Side
                </Link>
              </li>
              </ul>
            </div>
            <div className='rightDiv'>
              <ul>
              <li className='nav-item-right'>
                <Link to="/logginn" className='nav-link'>
                  Logg inn
                </Link>
              </li>
        </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;