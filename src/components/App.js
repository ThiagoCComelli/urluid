import React,{useEffect} from 'react'
import {BrowserRouter as Router, Switch, Route,useHistory} from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import Home from './Home'
import Redirect from './Redirect'
import Navbar from './Navbar'
import Login from './Login'
import MyLinks from './MyLinks'
import ModalEdit from './ModalEdit'
import {api} from '../database/firebase'
import {useDispatch,useSelector} from 'react-redux'
import '../styles/App.css';

function App() {
  const dispatch = useDispatch()
  const history = useHistory()
  const modal = useSelector(state => state.modal)

  useEffect(() => {
    api.checkAuth(dispatch,history)
    // eslint-disable-next-line
  }, [])

  return (
    <>
    {modal ? <ModalEdit props={modal}/> : null}
    <div className="App">
      <div className="divCircles">
          <span className="circle circle0"></span>
          <span className="circle circle1"></span>
      </div>
      <div className="AppContents">
        <Router>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/login" exact component={Login}/>
            <ProtectedRoute path="/mylinks" exact component={MyLinks}/>
            <Route path="/:id" exact component={Redirect}/>
          </Switch>
        </Router>
      </div>
    </div>
    </>
  )
}

export default App;
