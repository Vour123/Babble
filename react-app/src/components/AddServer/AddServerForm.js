import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import {useHistory} from 'react-router-dom'
import { addServer } from '../../store/server';

export default function AddServerForm() {
    const [name, setName] = useState('')
    const [image_url, setImage_url] = useState('')
    const [priv, setPriv] = useState(false)
    const [errors, setErrors] = useState([])

    const owner_id = useSelector(state => state.session.user.id);
    const history = useHistory()
    const dispatch = useDispatch();

    const handleClick = async (e) => {
        e.preventDefault();
        const serverInformation = {
            name,
            image_url,
            priv,
            owner_id
        }
        const data = await dispatch(addServer(serverInformation))
        if(data) {
            setErrors(data)
        } else {
            history.push('/servers')
        }
    }

    return (
        <form>

        </form>
    )
}
