import React, { useState } from 'react'
import ChannelEditModal from '../ChannelEditForm/ChannelEditModal';
import { CSSTransition } from 'react-transition-group';
import { deleteChannelToServer } from '../../store/server';
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

export default function DropDownChannel() {
    const [open, setOpen] = useState(false)
    return (
        <div>
            <li className='nav-item'>
                <span onClick={() => setOpen(!open)} className="material-icons-outlined">arrow_drop_down</span>
            </li>
            <div className='actual-box'>
                {open && <DropDownMenu setOpen={setOpen}/>}
            </div>
        </div>

    )
}

function DropDownMenu({setOpen}) {
    const [activeMenu, setActiveMenu] = useState('main')
    const dispatch = useDispatch()
    const history = useHistory();
    const { specificServerId, specificChannelId } = useParams()
    
    const handleDelete = (e) => {
        dispatch(deleteChannelToServer(+specificServerId, +specificChannelId))
        history.push(`/servers/${specificServerId}`)
        setOpen(false)
    }


    function DropDownItem(props) {
        return(
            <div className='menu-item' onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
                <span className='icon-button'>{props.leftIcon}</span>
                {props.children}
                <span className='icon-right'>{props.rightIcon}</span>
            </div>
        )    
    }

    return (
        <div className='drop-down'>
            <CSSTransition in={activeMenu === 'main'} unmountOnExit timeout={500} classNames='menu-primary'>
                <div className='menu'>
                    <DropDownItem leftIcon={<span className="material-icons-outlined">edit</span>}> <ChannelEditModal setOpen={setOpen}/> </DropDownItem>
                    <DropDownItem goToMenu='edit' leftIcon={<span className="material-icons-outlined trash">delete</span>}>Delete Channel</DropDownItem>
                </div>
            </CSSTransition>

            <CSSTransition in={activeMenu === 'edit'} unmountOnExit timeout={500} classNames='menu-secondary'>
                <div className='menu'>
                    <DropDownItem goToMenu='main' leftIcon={<span className="material-icons-outlined">arrow_back</span>}></DropDownItem>
                    <DropDownItem><div onClick={handleDelete}>Confirm Deletion</div></DropDownItem>
                    <DropDownItem goToMenu='main'>Cancel</DropDownItem>
                </div>
            </CSSTransition>
        </div>
    )
}
