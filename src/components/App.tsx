import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ToDoList from './ToDoList';
import SignUp from './AuthPage/signup';
import SignIn from './AuthPage/signin';
import firebase from '../firebase';
import Authentication from './Authentication';

const App:React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/sign_in' component={SignIn}/>
                <Route path='/sign_up' component={SignUp}/>
                <Route path='/' component={Authentication}/>
            </Switch>
        </BrowserRouter>
    )
}

export default App;