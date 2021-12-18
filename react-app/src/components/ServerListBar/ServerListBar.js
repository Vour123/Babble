import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getAllServers } from '../../store/server'
import './ServerList.css'


export default function ServerListBar() {
    const allServers = useSelector(state => Object.values(state.server))
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllServers())
    },[dispatch])

    return (
        <div className='server-box'>
            {allServers?.map((singleServer) => {
                return (
                        <NavLink to={`/servers/${singleServer.id}`} className={'all-servers-container'}>
                            <img className='single-server-image' src={singleServer.image_url}></img>
                        </NavLink>
                        )})}
        </div>
    )
}
