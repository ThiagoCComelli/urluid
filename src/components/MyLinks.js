import React,{useState,useEffect} from 'react';
import {api} from '../database/firebase'
import {useSelector,useDispatch} from 'react-redux'
import CheckIcon from '@material-ui/icons/Check';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import LoopIcon from '@material-ui/icons/Loop';
import {putModal} from '../actions/index'

import "../styles/MyLinks.css"

const TableItem = ({props}) => {
    const dispatch = useDispatch()

    return (
        <>
        <tr className="tableContent">
            <td>{props.name}</td>
            <td>urluid.tk/<strong>{props.id}</strong></td>
            <td>{props.url}</td>
            <td>{props.clicks}</td>
            <td><button onClick={() => {
                dispatch(putModal(props))
            }}>Edit</button></td>
        </tr>
        </>
    )
}

const NewItem = ({stateIcon,setStateIcon}) => {
    const [state,setState] = useState(true)
    const [link,setLink] = useState("")
    const user = useSelector(state => state.user)
    const [data,setData] = useState({name:"",url:"",customURL:""})

    const reset = () => {
        setStateIcon()
        setLink()
        setData({name:"",url:"",customURL:""})
    }

    const copyToClipboard = () => {
        const element_ = document.createElement('textarea');
        element_.value = `${window.location.href}${link}`;
        document.body.appendChild(element_);
        element_.select();
        document.execCommand('copy');
        document.body.removeChild(element_);

        alert("Copied to clipboard!")
    }

    return (
        <>
        <div className="newItem">
            <div className="newItemState">
                <span onClick={() => {
                    reset()
                    setState(true)}} className={`${state ? 'active' : ''}`}><p>Random link</p></span>
                <span onClick={() => {
                    reset()
                    setState(false)}} className={`${!state ? 'active' : ''}`}><p>Custom link</p></span>
            </div>
            <div className="newItemInput">
                <input value={data.url} onChange={(e) => {setData({...data,url:e.target.value})}} placeholder="Shorten your link..." type="text"></input>
                <span>{state ? stateIcon : null}</span>
            </div>
            {!state ? (
                <>
                <div id="inputIdAll" className="newItemInput">
                    <input value={data.name} onChange={(e) => {setData({...data,name:e.target.value})}} placeholder="Name" type="text"></input>
                    <input value={data.customURL} onChange={(e) => {setData({...data,customURL:e.target.value})}} placeholder="Custom URL" type="text"></input>
                    <span>{stateIcon}</span>
                </div>
                </>
            ) : null}
            
            <div className="newItemURLText">
                {state ? <p>Link generated:</p> : <p>Will be generated:</p>}
                <span onClick={() => {copyToClipboard()}}>urluid.tk/<strong>{link}</strong></span>
                <button onClick={() => {
                    setStateIcon(<LoopIcon style={{fontSize: 30}} className="rotate" />)

                    var err = false

                    if(!state){
                        if(data.url === "" || data.name === "" || data.customURL === ""){
                            err = true
                        }
                    }else{
                        if(data.url === ""){
                            err = true
                        }
                    }

                    if(err){
                        setStateIcon(<ErrorOutlineIcon style={{fontSize: 30, color: "red"}}/>)
                    }else{
                        api.generateUrl(data.url,user.uid,data.name,data.customURL).then((callback) => {
                            if(callback.status === "success"){
                                setStateIcon(<CheckIcon style={{fontSize: 30, color:"green"}}/>)
                            } else {
                                setStateIcon(<ErrorOutlineIcon style={{fontSize: 30, color: "red"}}/>)
                            }
                            setLink(callback.message)
                        })
                    }
                    
                }}>Generate</button>
            </div>
        </div>
        </>
    )
}

const MyLinks = () => {
    const [links,setLinks] = useState([])
    const [stateIcon,setStateIcon] = useState()
    const user = useSelector(state => state.user)

    useEffect(() => {        
        api.getAllLinks(user.uid,setLinks)
            
    // eslint-disable-next-line
    },[])

    return (
        <>
        <div className="mainMyLinks">
            <NewItem stateIcon={stateIcon} setStateIcon={setStateIcon}/>
            <table className="mainTable">
                <tbody>
                    <tr className="tableTitle">
                        <th style={{width: "15%"}}>Name</th>
                        <th style={{width: "30%"}}>Short URL</th>
                        <th style={{width: "40%"}}>URL</th>
                        <th style={{width: "5%"}}>Clicks</th>
                        <th style={{width: "10%"}}>Config</th>
                    </tr>
                    {links.map((link) => {
                        return <TableItem key={link.id} props={link}/>
                    })}
                </tbody>
            </table>
        </div>
        </>
    )
}

export default MyLinks;
