import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'
import SocialDashboard from './SocialDashboard';
import { Redirect, Route } from 'react-router-dom';
import { useState } from 'react';
import ShowUser from './ShowUser';


function App() {

  const [status, setStatus] = useState(false)

  const handleLogin = (value) => {
    setStatus(value)
  }
  return (
    <div className='container'>
      <Route path="/" exact={true} render={(props) => {
        return (
          <SocialDashboard
            {...props}
            handleLogin={handleLogin}
            status={status}
          />
        )
      }} />
      <Route path="/show" exact={true} render={(props) => {
        return (
          status ? <ShowUser
            {...props}
            handleLogin={handleLogin}
            status={status}
          /> : <Redirect to='/' />
        )
      }} />
    </div>
  );
}

export default App;
