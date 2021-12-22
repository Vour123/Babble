import React, { useState } from 'react'
import { Modal } from '../context/Modal'
import ServerEditForm from './ServerEditForm'

export default function ServerEditModal() {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <div onClick={() => setShowModal(!showModal)}>Edit Server</div>
            {showModal && (
                <Modal onClose={() => setShowModal(!showModal)}>
                    <ServerEditForm setShowModal={setShowModal}/>
                </Modal>
            )}
        </>
    )
}
