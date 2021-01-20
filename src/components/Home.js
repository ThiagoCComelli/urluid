import React,{useState} from 'react';
import {api} from '../database/firebase'
import CheckIcon from '@material-ui/icons/Check';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import LoopIcon from '@material-ui/icons/Loop';
import {useHistory} from 'react-router-dom'
// import {useSelector} from 'react-redux'

import '../styles/Home.css'

const Home = (props) => {
    const [state, setState] = useState();
    const [link,setLink] = useState("")
    const history = useHistory()
    // const user = useSelector(state => state.user)

    const copyToClipboard = () => {
        const element_ = document.createElement('textarea');
        element_.value = `${window.location.href}${link}`;
        document.body.appendChild(element_);
        element_.select();
        document.execCommand('copy');
        document.body.removeChild(element_);

        alert("Copied to clipboard!")
    }

    if(props.match.params.id !== undefined){
        console.log(props.match.params.id)
        history.push(`/p/${props.match.params.id}`)
    }

    return (
        <>
        
        <div className="mainHome">
            <div className="mainHomeBox">
                <div className="mainHomeTitle">
                    <div className="mainHomeTitleContents">
                        <h1>Short links, big results</h1>
                        <p>A URL shortener built with powerful tools to help you grow and protect your brand.</p>
                        <span>Create an account to edit your links and have total control.</span>
                        <button>Get Started</button>
                    </div>
                    <div className="mainHomeImage">
                        <img alt="" src={`${process.env.PUBLIC_URL}/images/main1.svg`} />
                    </div>
                </div>
                <div className="mainHomeBoxURL">
                    <div className="mainHomeBoxURLInput">
                        <input id="inputLink" placeholder="Shorten your link..." type="text"></input>
                        <span>{state}</span>
                    </div>
                    <div className="mainHomeBoxURLText">
                        <p>Link generated:</p>
                        <span onClick={() => {copyToClipboard()}}>urluid.tk/<strong>{link}</strong></span>
                        <button onClick={() => {
                            setState(<LoopIcon style={{fontSize: 30}} className="rotate" />)
                            api.generateUrl(document.getElementById("inputLink").value).then((callback) => {
                                if(callback.status === "success"){
                                    setState(<CheckIcon style={{fontSize: 30, color:"green"}}/>)
                                } else {
                                    setState(<ErrorOutlineIcon style={{fontSize: 30, color: "red"}}/>)
                                }
                                setLink(callback.message)
                            })
                        }}>Generate</button>
                    </div>
                </div>
                <div className="mainHomeDesc">
                    <h2>Create an account so that you can create your own url. <strong>Get started.</strong></h2>
                </div>
            </div>
        </div>
        </>
    )
}

export default Home;
