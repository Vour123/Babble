import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user);

  let userButtons
  if(sessionUser) {
    userButtons = <LogoutButton/>
  } else {
    userButtons = <div className='user-btns-container'>
      <NavLink to='/login' exact={true} activeClassName='active'>
          <div className='nav-btn'>Login</div>
      </NavLink>
      <NavLink to='/sign-up' exact={true} activeClassName='active'>
        <div className='nav-btn'>Sign Up</div>
      </NavLink>
    </div>
  }
  
  return (
    <div className='nav-bar'>
      <div className='title-container'>
        <img  className='babble-logo' src='https://cdn.discordapp.com/attachments/876884937125527583/921329740768485426/babbleLogov1.png'></img>
        <div className='babble-title'>Babble</div>
      </div>
        {userButtons}
    </div>
  );
}

export default NavBar;
