import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import ServerListBar from '../ServerListBar/ServerListBar';

const ProtectedRoute = props => {
  const user = useSelector(state => state.session.user)
  return (
    <div className='protected-route-box'>
      <ServerListBar />
      <Route {...props}>
        {(user)? props.children  : <Redirect to='/' />}
      </Route>
    </div>
  )
};


export default ProtectedRoute;
