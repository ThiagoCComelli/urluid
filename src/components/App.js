import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from './Home'
import Redirect from './Redirect'
import Navbar from './Navbar'
import '../styles/App.css';

function App() {
  return (
    <div className="App">
      <div className="AppContents">
        <Router>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/:id" exact component={Redirect}/>
          </Switch>
        </Router>
      </div>
    </div>
  )
}

export default App;
