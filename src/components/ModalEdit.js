import React,{useState} from 'react';
import CloseIcon from '@material-ui/icons/Close';
import {useDispatch} from 'react-redux'
import {removeModal} from '../actions/index'
import {api} from '../database/firebase'

import '../styles/ModalEdit.css'

const ModalEdit = ({props}) => {
    const [data,setData] = useState({url:props.url,name:props.name,id:props.id})
    const dispatch = useDispatch()

    return (
        <>
        <div className="mainModalEdit">
            <div className="mainModalEditBox">
                <CloseIcon onClick={() => {dispatch(removeModal())}} style={{fontSize: 30}} className="closeIcon" />
                <div className="mainModalEditInput">
                    <h5>urluid.tk/<strong>{props.id}</strong></h5>
                </div>
                <div className="mainModalEditInput">
                    <p>Link:</p>
                    <input value={data.url || ""} onChange={(e) => {setData({...data,url:e.target.value})}} type="text"></input>
                </div>
                <div className="mainModalEditInput">
                    <p>Name:</p>
                    <input value={data.name || ""} onChange={(e) => {setData({...data,name:e.target.value})}} type="text"></input>
                </div>
                <div className="mainModalEditButtons">
                    <button onClick={() => {
                        api.updateLink(data)
                        dispatch(removeModal())
                    }}>Update</button>
                    <button onClick={() => {
                        api.deleteLink(props.id)
                        dispatch(removeModal())
                    }}>Delete</button>
                </div>
            </div>
        </div>
        </>
    )
}

export default ModalEdit;
