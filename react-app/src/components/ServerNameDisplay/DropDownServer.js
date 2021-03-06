import React, { useState } from 'react'
import ServerEditModal from '../ServerEditForm/ServerEditModal';
import { CSSTransition } from 'react-transition-group';
import { deleteAServer } from '../../store/server';
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import ShareIcon from '@mui/icons-material/Share';

export default function DropDownServer() {
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
    const dispatch = useDispatch();
    const history = useHistory();
    const { specificServerId } = useParams();
    // const inviteLink = ``
    
    const handleDelete = (e) => {
        dispatch(deleteAServer(specificServerId))
        history.push('/servers/1')
        setOpen(false)
    }

    const copyInviteLink = () => {

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
                    {/* <DropDownItem leftIcon={<ShareIcon/>}><div className='inv-link' onClick={copyInviteLink}>Click to copy invite link</div></DropDownItem> */}
                    <DropDownItem leftIcon={<span className="material-icons-outlined">edit</span>}> <ServerEditModal setOpen={setOpen}/> </DropDownItem>
                    <DropDownItem className='delete' goToMenu='edit' leftIcon={<span className="material-icons-outlined trash">delete</span>}>Delete Server</DropDownItem>
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
