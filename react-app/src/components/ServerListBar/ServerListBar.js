import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllServers } from '../../store/server'


export default function ServerListBar() {
    const allServers = useSelector(state => state.server)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllServers())
    },[dispatch])

    console.log('this is allServer', allServers)

    return (
        <div>
            
        </div>
    )
}
