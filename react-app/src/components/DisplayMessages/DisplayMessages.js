import React from 'react'
import { getAllMessagesOfServer } from '../../store/server'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

export default function DisplayMessages() {
    const dispatch = useDispatch();
    const { specificServerId, specificChannelId} = useParams()

    const allMessages = useSelector(state => state.user)

    const handleSubmit = () => {
        dispatch(getAllMessagesOfServer(+specificServerId, +specificChannelId));
    }

    return (
        <button onClick={handleSubmit}>
            hello
        </button>
    )
}
