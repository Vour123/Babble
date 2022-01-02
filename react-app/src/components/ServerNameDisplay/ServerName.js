import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import DropDownServer from './DropDownServer'
import './ServerName.css'

export default function ServerName() {
    const specificServer = useSelector(state => state.server);
    const user = useSelector(state => state.session.user)
    const { specificServerId } = useParams();

    if(!specificServer) {
        return null;
    }

    let serverOwnerId;
    if(specificServer) {
        serverOwnerId = specificServer[specificServerId].owner_id
    }

    return (
        <>
            <div className='specific-server-name'>{specificServer[specificServerId]?.name} {specificServerId == 1 ?  null : [serverOwnerId === user.id ? <DropDownServer/> : null]}</div>
        </>
    )
}

