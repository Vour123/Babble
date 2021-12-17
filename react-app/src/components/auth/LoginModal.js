import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from '../context/Modal'
import LoginForm from './LoginForm';
import {login} from '../../store/session';

function LoginModal(){
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)
    // const demoLogin = async() => {
    //     await dispatch(login('demo@aa.io', 'password'));

    // }

    return (
        <>
        <div className="nav-btn" onClick={() => setShowModal(true)}>Login</div>
        {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <LoginForm />
            </Modal>
        )}
        <div className="nav-btn" id='demo'>Demo Login</div>
        </>
    )
}

export default LoginModal