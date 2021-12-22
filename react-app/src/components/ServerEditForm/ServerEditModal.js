import React, { useState } from 'react'
import { Modal } from '../context/Modal'
import ServerEditForm from './ServerEditForm'

export default function ServerEditModal({setOpen}) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <div onClick={() => setShowModal(!showModal)}>Edit Server</div>
            {showModal && (
                <Modal onClose={() => setShowModal(!showModal)}>
                    <ServerEditForm setOpen={setOpen} setShowModal={setShowModal}/>
                </Modal>
            )}
        </>
    )
}
