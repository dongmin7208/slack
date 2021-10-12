import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import SignUp from '@pages/SignUp'
import LogIn from '@pages/Login';

const App = () => {
    return (
        <Switch>
            <Redirect exact path="/" to="/login" />
            <Route path="/login" component={LogIn} />
            <Route path="/signup" component={SignUp} />
        </Switch>
    )
};

export default App;

//jotai,zustand,recoil