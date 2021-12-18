import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUp.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [bool, setBool] = useState(false);
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

    useEffect(() => {
      setBool(true)
  }, [])

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
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

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={onSignUp} className={`signup-form-container signup-form-container-${bool}`}>
      <div className='error-results-modal'>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
        <input
          name='username'
          type='text'
          placeholder='Username'
          onChange={updateUsername}
          className='signup-modal-input user-name-input'
          value={username}
        ></input>
        <input
          name='email'
          type='text'
          placeholder='Email'
          onChange={updateEmail}
          className='signup-modal-input email-input'
          value={email}
        ></input>
        <input
          name='password'
          type='password'
          placeholder='Password'
          onChange={updatePassword}
          className='signup-modal-input password-input'
          value={password}
        ></input>
        <input
          name='repeat_password'
          type='password'
          placeholder='Confirm Password'
          onChange={updateRepeatPassword}
          className='signup-modal-input password-input'
          value={repeatPassword}
          required={true}
        ></input>
      <button type='submit' className='modal-button'>Sign Up</button>
    </form>
  );
};

export default SignUpForm;
