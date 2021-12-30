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

        socket.on('add_a_new_server', (newServer) => {
            console.log(newServer, 'this is newServer')
            if(newServer.members.includes(sessionUser.user.id)){
                dispatch(thunk.addServer(newServer))
            }})
            
        socket.on('delete_a_server', (server) => {
            if(server.members.includes(sessionUser.user.id)) {
                dispatch(thunk.deleteAServer(server.id))
            }})
        
        socket.on('edit_a_server', (server) => {
            if(server.members.includes(sessionUser.user.id)) {
                dispatch(thunk.editAServer(server, server.id))
            }})

        socket.on('add_a_new_channel', (newChannel) => {
            dispatch(thunk.addChannelToServer(newChannel))
        })

        socket.on('edit_a_channel', (channel) => {
            dispatch(thunk.updateChannelToServer(channel, channel.server_id, channel.id))
        })

        socket.on('delete_a_channel', (channel) => {
            dispatch(thunk.deleteChannelToServer(channel.id, channel.server_id))
        })

    },[])

    return (
        <div>
            splash page
        </div>
    )
}
