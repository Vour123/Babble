import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '../context/Modal'
import LoginForm from './LoginForm';
import {login} from '../../store/session';
import { getAllServers, getChannelsToServer } from '../../store/server';
import { useHistory } from 'react-router-dom';

function LoginModal(){
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)
    const history = useHistory();

    const demoLogin = async() => {
        await dispatch({type: 'logout'})
        await dispatch(login('demo@aa.io', 'password'));
        await dispatch(getAllServers()).then(history.push(`/servers/1`))
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