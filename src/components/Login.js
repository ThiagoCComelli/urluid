import React,{useState} from 'react';
import {api} from '../database/firebase'
import {signIn} from '../actions/index'
import {useSelector,useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'

import '../styles/Login.css'

const LoginDiv = ({setInfos,infos}) => {
    return(
        <>
            <div className="loginDiv">
                <input value={infos.email} onChange={(e) => {setInfos({...infos,email:e.target.value})}} placeholder="Email" type="text"></input>
                <input value={infos.password} onChange={(e) => {setInfos({...infos,password:e.target.value})}} placeholder="Password" type="password"></input>
                <button type="submit">Login</button>
            </div>
        </>
    )
}

const RegisterDiv = ({setInfos,infos}) => {
    return(
        <>
            <div className="loginDiv">
                <input value={infos.email} onChange={(e) => {setInfos({...infos,email:e.target.value})}} placeholder="Email" type="text"></input>
                <input value={infos.password} onChange={(e) => {setInfos({...infos,password:e.target.value})}} placeholder="Password" type="password"></input>
                <input value={infos.passwordConfirm} onChange={(e) => {setInfos({...infos,passwordConfirm:e.target.value})}} placeholder="Password confirm" type="password"></input>
                <input value={infos.name} onChange={(e) => {setInfos({...infos,name:e.target.value})}} placeholder="Full Name" type="text"></input>
                <button type="submit">Register</button>
            </div>
        </>
    )
}

const Login = () => {
    const [infos, setInfos] = useState({email:"",password:"",passwordConfirm:"",name:""});
    const [state,setState] = useState(true)
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const history = useHistory()

    const handleSubmit = async(e) => {
        e.preventDefault()

        var result

        state ? result = await api.enterAccount(infos) : result = await api.createAccount(infos)

        if(result.code === undefined){
            dispatch(signIn(result))
        }else{
            console.log(result)
        }
    }

    if(user !== null){
        history.push("/")
    }

    return (
        <>
        <div className="mainLogin">
            <form onSubmit={handleSubmit} className="mainLoginForm">
                <div className="mainLoginFormState">
                    <span onClick={() => {setState(true)}} className={`loginFormState ${state ? 'active' : ''}`}><p>Sign In</p></span>
                    <span onClick={() => {setState(false)}} className={`loginFormState ${!state ? 'active' : ''}`}><p>Sign Up</p></span>
                </div>
                { state ? <LoginDiv setInfos={setInfos} infos={infos} /> : <RegisterDiv setInfos={setInfos} infos={infos} />}
            </form>
        </div>
        </>
    );
}

export default Login;
