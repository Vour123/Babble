import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory} from 'react-router-dom';
import { signUp } from '../../store/session';
import { getAllServers } from '../../store/server';
import './SignUp.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [bool, setBool] = useState(false);
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [imageUrl, setImageUrl] = useState('')
  const history = useHistory();
  const user = useSelector(state => state.session.user);
  const userServerY = useSelector(state => state.server)
  const dispatch = useDispatch();

  let userServer;
  if(userServerY) {
    userServer = Object.values(userServerY);
  }

    useEffect(() => {
      setBool(true)
  }, [])

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      await dispatch({type: 'logout'})
      const data = await dispatch(signUp(username, email, password));
      await dispatch(getAllServers())
      if (data) {
        setErrors(data)
      } else {
        if(userServer) {
          console.log('this is user server', userServer)
          history.push(`/servers/${userServer[0].id}`)
        }
      }
    } else {
      setErrors([' . : Passwords do not match'])
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const updateImageUrl = (e) => {
    setImageUrl(e.target.value)
  };

  if (user) {
    return <Redirect to='/' />;
  }
  
  return (
    <form onSubmit={onSignUp} className={`signup-form-container signup-form-container-${bool}`}>
      <div className='errors'>
        {errors.map((error, ind) => (
          <div key={ind}>{error.split(':')[1]}</div>
        ))}
      </div>
        <input
          type='text'
          placeholder='Username'
          onChange={updateUsername}
          className='signup-modal-input user-name-input'
          value={username}
        ></input>
        <input
          type='text'
          placeholder='Email'
          onChange={updateEmail}
          className='signup-modal-input email-input'
          value={email}
        ></input>
        <input
          type='url'
          placeholder='Image URL'
          onChange={updateImageUrl}
          className='signup-modal-input imageurl-input'
          value={imageUrl}
        ></input>
        <input
          type='password'
          placeholder='Password'
          onChange={updatePassword}
          className='signup-modal-input password-input'
          value={password}
        ></input>
        <input
          type='password'
          placeholder='Confirm Password'
          onChange={updateRepeatPassword}
          className='signup-modal-input password-input'
          value={repeatPassword}
        ></input>
      <button type='submit' className='modal-button'>Sign Up</button>
    </form>
  );
};

export default SignUpForm;
