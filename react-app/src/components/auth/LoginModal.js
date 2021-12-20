import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from '../context/Modal'
import LoginForm from './LoginForm';
import {login} from '../../store/session';
import { useHistory } from 'react-router-dom';

function LoginModal(){
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)
    const history = useHistory();
    const demoLogin = async() => {
        await dispatch(login('demo@aa.io', 'password'));
        history.push('/servers')
    }

    return (
        <>
            <div className="nav-btn" onClick={() => setShowModal(true)}>Login</div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <LoginForm />
                </Modal>
            )}
            <div className="nav-btn" id='demo' onClick={demoLogin}>Demo Login</div>
        </>
    )
} 

export default LoginModal