import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import './DirectMessage.css'

export default function DirectMessageList() {
    const allServers = useSelector(state => Object.values(state.server))

    return (
        <>
        <div className='title-direct-message'>
            Direct Messages
        </div>
        <div className='private-servers'>
            {allServers?.map((singleServer) => {
                if(singleServer?.private) {
                    return(
                        <>
                        <NavLink key={singleServer?.id} to={`/direct-messages/${singleServer?.id}`} className={'single-direct-message-box'}>
                            <div></div>
                            <div></div>
                            <img className='direct-message-image' src={singleServer?.image_url}></img>
                            <div className='direct-message-name'>{singleServer?.name}</div>
                        </NavLink>
                        </>
                    )
                }
            })}
           
        </div>
        </>
    )
}
