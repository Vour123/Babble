import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import ServerInfoModal from './ServerInfoModal'
import './ServerName.css'

export default function ServerName() {
    const specificServer = useSelector(state => state.server);
    const { specificServerId } = useParams();

    return (
        <>
        <div className='specific-server-name'>{specificServer[specificServerId]?.name}
            <ServerInfoModal/>
        </div>
        </>
    )
}

