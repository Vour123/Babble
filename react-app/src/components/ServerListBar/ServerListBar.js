import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import  AddServerModal  from '../AddServer/AddServerModal'
import { addMemberToServer } from '../../store/server'
import './ServerList.css'


export default function ServerListBar() {
    const allServersY = useSelector(state => state.server);
    const { specificServerId, specificChannelId } = useParams();
    const dispatch = useDispatch();

    let serverChecker = allServersY?.[specificServerId]
    
    useEffect(() => {
        if(!serverChecker){
            if(isNaN(+specificServerId)){
                dispatch(addMemberToServer(specificChannelId))
            } else {
                dispatch(addMemberToServer(specificServerId))
            }
        }
    },[])
    
    let allServers;
    if(allServersY) {
        allServers = Object.values(allServersY);
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
