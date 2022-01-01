import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import  AddServerModal  from '../AddServer/AddServerModal'
import './ServerList.css'


export default function ServerListBar() {
    const allServersY = useSelector(state => state.server)
    let allServers;

    if(allServersY) {
        allServers = Object.values(allServersY);
    } 
    if(!allServers) {
        return null;
    }

    return (
        <div className='all-servers-container'>
            {allServers?.map((singleServer) => {
                if(!singleServer?.private){
                    return (
                            <NavLink key={singleServer?.id} to={`/servers/${singleServer?.id}`} className={'single-server-box'}>
                                <img className='single-server-image' src={singleServer?.image_url}></img>
                            </NavLink>)   
                }})}
                <AddServerModal />
        </div>
    )
}
