import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import GitHubIcon from '@mui/icons-material/GitHub';
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
            <div className='repo-text'>Checkout Babble's GitHub repo
                <a target='_blank' href='https://github.com/Vour123/Babble' className='github-repo-img-container'>
                    <GitHubIcon className='github-repo-img'/>
                </a>
            </div>
        </div>
    )
}
