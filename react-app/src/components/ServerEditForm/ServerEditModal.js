import React, { useState } from 'react'
import { Modal } from '../context/Modal'
import ServerEditForm from './ServerEditForm'
import './ServerEditForm.css'

export default function ServerEditModal({setOpen}) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <div className='edit-btn' onClick={() => setShowModal(!showModal)}>Edit Server</div>
            {showModal && (
                <Modal onClose={() => setShowModal(!showModal)}>
                    <ServerEditForm setOpen={setOpen} setShowModal={setShowModal}/>
                </Modal>
            )}
        </>
    )
}
