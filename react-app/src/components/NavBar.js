import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user);

  let userButtons
  if(sessionUser) {
    <LogoutButton/>
  } else {
    userButtons = <div className='user-btns-container'>
      
    </div>
  }
  return (
    <nav>
      <ul className='nav-bar-container'>
        <div className='nav-btn'>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </div>
        <div className='nav-btn'>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </div>
        <div className='nav-btn'>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </div>
        {}
          <div className='nav-btn'>
            <LogoutButton />
          </div>
      </ul>
    </nav>
  );
}

export default NavBar;
