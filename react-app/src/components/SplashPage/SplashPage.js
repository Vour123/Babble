import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import * as thunk from '../../store/server'
let socket;

export default function SplashPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.user);

    useEffect(() => {
        socket = io();

        socket.on('add_a_new_server', (server) => {
            if(server.members.includes(sessionUser.user.id)){
                dispatch(thunk.addServer(server))
            }})
            
        socket.on('delete_a_server', (server) => {
            if(server.members.includes(sessionUser.user.id)) {
                dispatch(thunk.deleteAServer(server.id))
            }})
        
        socket.on('edit_a_server', (server) => {
            if(server.members.includes(sessionUser.user.id)) {
                dispatch(thunk.editAServer(server, server.id))
            }})

    },[])

    return (
        <div>
            splash page
        </div>
    )
}
