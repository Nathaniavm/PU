import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav>
      <div className='navbarContainer'>
        <ul className='nav-menu'>
          <li className='nav-item'>
            <Link to="/pages/hjem/Hjem.js" className='nav-link'>
              Hjem
            </Link>
          </li>
          <li className='nav-item'>
            <Link to="/opprettleker" className='nav-link'>
              Opprett Leker
            </Link>
          </li>
          <li className='nav-item'>
            <Link to="/minside" className='nav-link'>
              Min Side
            </Link>
          </li>
          <li className='nav-item'>
            <Link to="/logginn" className='nav-link'>
              Logg inn
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar;