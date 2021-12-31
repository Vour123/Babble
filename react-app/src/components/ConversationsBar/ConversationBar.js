import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ServerName from '../ServerNameDisplay/ServerName'
import ChannelsList from '../ChannelsList/ChannelsList'
import DirectMessageList from '../DirectMessageList/DirectMessageList'
import './ConversationBar.css'
import { io } from 'socket.io-client';
import * as AC from '../../store/server'
let socket;

export default function ConversationBar() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session)

    useEffect(() => {
        socket = io();

        socket.on('add_a_server', (newServer) => {
            if(newServer.members.includes(sessionUser.user.id)){
                dispatch(AC.addServerAC(newServer))
            }})
            
        socket.on('delete_a_server', (server) => {
            if(server.members.includes(sessionUser.user.id)) {
                dispatch(AC.deleteAServerAC(server.id))
            }})
        
        socket.on('edit_a_server', (server) => {
            if(server.members.includes(sessionUser.user.id)) {
                dispatch(AC.editAServerAC(server, server.id))
            }})

        socket.on('add_a_channel', (newChannel) => {
            dispatch(AC.addChannelToServerAC(newChannel))
        })

        socket.on('edit_a_channel', (channel) => {
            dispatch(AC.updateChannelToServerAC(channel, channel.server_id, channel.id))
        })

        socket.on('delete_a_channel', (channel) => {
            dispatch(AC.deleteChannelToServerAC(channel.id, channel.server_id))
        })

    },[])

    return (
        <div className='everything-container'>
            <div className='servers-bar-container'>
                <ServerName />
            </div>
            <div className='channels-bar-container'>
                <ChannelsList />
            </div>
            <div className='direct-messages-container'>
                <DirectMessageList />
            </div>
        </div>
    )
}
