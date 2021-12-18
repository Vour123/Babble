import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllServers } from '../../store/server'


export default function ServerListBar() {
    const allServers = useSelector(state => Object.values(state.server))
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllServers())
    },[dispatch])

    console.log('this is all servers', allServers)
    return (
        <div className='all-servers-container'>
            {allServers?.map((singleServer) => {
                return (
                    <>
                    <div className='single-server-name '>{singleServer.name}</div>
                    <img className='single-server-image' src={singleServer.image_url}></img>
                    </>
                )
            })}
        </div>
    )
}
