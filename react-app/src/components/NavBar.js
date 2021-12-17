import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import SignUpModal from './auth/SignUpModal';
import LoginModal from './auth/LoginModal';

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user);

  let userButtons
  if(sessionUser) {
    userButtons = <LogoutButton/>
  } else {
    userButtons = <div className='user-btns-container'>
      <LoginModal/>
      <SignUpModal/>
    </div>
  }

  return (
    <div className='nav-bar'>
      <div className='title-container'>
        <NavLink to='/' exact={true}>
          <img className='babble-logo' src='https://cdn.discordapp.com/attachments/876884937125527583/921329740768485426/babbleLogov1.png'></img>
        </NavLink>
        <div className='babble-title'>Babble</div>
      </div>
        {userButtons}
    </div>
  );
}

export default NavBar;
