import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getAllServers } from '../../store/server'
import  AddServerModal  from '../AddServer/AddServerModal'
import './ServerList.css'


export default function ServerListBar() {
    const allServers = useSelector(state => Object.values(state.server))
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllServers())
    },[dispatch])

    return (
        <div className='all-servers-container'>
            {allServers?.map((singleServer) => {
                if(!singleServer.private){
                    return (
                            <NavLink key={singleServer.id} to={`/servers/${singleServer.id}`} className={'single-server-box'}>
                                <img className='single-server-image' src={singleServer.image_url}></img>
                            </NavLink>)   
                }})}
                <AddServerModal />
        </div>
    )
}
