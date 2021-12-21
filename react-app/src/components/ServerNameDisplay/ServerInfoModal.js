import React, { useState } from 'react'
import { Modal } from '../context/Modal'
import ServerBox from './ServerBox'

export default function ServerInfoModal() {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <span onClick={() => setShowModal(true)} className="material-icons-outlined drop-down-server">arrow_drop_down</span>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <ServerBox setShowModal={setShowModal}/>
                </Modal>
            )}
        </>
    )
}
