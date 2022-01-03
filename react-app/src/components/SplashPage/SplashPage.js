import React from 'react'
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import './SplashPage.css'
import nomad from './assets/nomad1.svg'

export default function SplashPage() {
    return (
        <div className='splash-page-container'>
            <div className='welcome-message'>Welcome to Babble</div>
            <div className='description'>
                Babble is a real-time chat application. 
            </div>
            <img className='splash-png' src={nomad}></img>
            <div className='repo-text'>Checkout Babble's GitHub repo
                <a target='_blank' href='https://github.com/Vour123/Babble' className='github-repo-img-container'>
                    <GitHubIcon className='github-repo-img'/>
                </a>
            </div>
            <div className='repo-text'>
                Connect with me 
                <a target='_blank' href='https://github.com/Vour123' className='github-repo-img-container'>
                    <GitHubIcon className='github-repo-img'/>
                </a>
                <a target='_blank' href='https://github.com/Vour123' className='github-repo-img-container'>
                    <LinkedInIcon className='github-repo-img'/>
                </a>
            </div>
        </div>
    )
}
