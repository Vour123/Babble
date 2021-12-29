import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory} from 'react-router-dom';
import { login } from '../../store/session';
import { getAllServers } from '../../store/server';
import './LoginForm.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [bool, setBool] = useState(false);
  const [password, setPassword] = useState('');
  const history = useHistory();

  const user = useSelector(state => state.session.user);
  const userServers = useSelector(state => Object.values(state.server))

  const dispatch = useDispatch();

    useEffect(() => {
      setBool(true)
  }, [])

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    const data1 = await dispatch(getAllServers())
    if (data) {
      setErrors(data);
    } else {
      if(userServers[0]) {
        history.push(`/servers/${userServers[0].id}`)
      }
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
      <form className={`login-form-container login-form-container-${bool}`} onSubmit={onLogin}>
          <div className='error-results-modal'>
            {errors.map((error, ind) => (
              <div key={ind} className='actual-error'>{error.split(':')[1]}</div>
            ))}
          </div>
            <input
              name='email'
              type='text'
              placeholder='Email'
              value={email}
              className='login-modal-input email-input'
              onChange={updateEmail}
            />
            <input
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              className='login-modal-input password-input'
              onChange={updatePassword}
            />
          <button type='submit' className='modal-button'>Login</button>
      </form>
  );
};

export default LoginForm;
