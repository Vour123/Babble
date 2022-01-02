import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { updateAMessage } from '../../store/server';
import { deleteAMessage } from '../../store/server';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './DisplayMessages.css'

export default function ActionMessages({messageId, channelId, serverId, setEditMode, editMode}) {
    const dispatch = useDispatch();
    
    const handleDelete = (e) => {
        e.preventDefault();
        const messageInformation = {
            channel_id: +channelId,
            message_id: +messageId,
            server_id: +serverId
        }
        dispatch(deleteAMessage(messageInformation))
    }



    return (
        <>
            <EditIcon onClick={() => setEditMode(!editMode)} className='message-btn'/>
            <DeleteIcon onClick={handleDelete} className='message-btn'/>
        </>
    )
}
