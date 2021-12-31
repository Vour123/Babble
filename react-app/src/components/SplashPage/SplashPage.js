import React from 'react'
import './SplashPage.css'
import nomad from './assets/nomad1.svg'

export default function SplashPage() {

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
