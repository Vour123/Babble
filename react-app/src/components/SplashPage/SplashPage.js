import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import './SplashPage.css'
import nomad from './assets/nomad1.svg'

export default function SplashPage() {
    // const sessionUser = useSelector(state => state.session)
    // const history = useHistory();

    // if(sessionUser) {
    //     history.push('/servers/1');
    // }

    return (
        <div className='splash-page-container'>
            <div className='welcome-message'>Welcome to Babble!</div>
            <div className='description'>
                Babble is a real-time chat application. 
            </div>
            <img className='splash-png' src={nomad}></img>
        </div>
    )
}
