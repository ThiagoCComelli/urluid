import React from 'react';
import {Route,useHistory} from 'react-router-dom'
import {useSelector} from 'react-redux'

const ProtectedRoute = ({component,path}) => {
    const user = useSelector(state => state.user)
    const history = useHistory()
    
    return (
        <>
        {user ? <Route path={path} exact component={component}/> : history.push("/login")}
        </>
    )
}

export default ProtectedRoute
