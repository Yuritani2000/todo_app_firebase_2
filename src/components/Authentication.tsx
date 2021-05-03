import React, { useState, useEffect, useRef } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import ToDoList from './ToDoList';
import SignUp from './AuthPage/signup';
import SignIn from './AuthPage/signin';
import firebase from '../firebase';
import { sign } from 'crypto';

const Authentication: React.FC =  () => {

    type SignInStatusType = { isSignInChecked: boolean, isSignedIn: boolean}

    const [ signInStatus, setSignInStatus ] = useState({ isSignInChecked: false, isSignedIn: false} as SignInStatusType);

    let _isMounted = false;

    const ref = useRef<HTMLDivElement>();

    useEffect(() => {

        _isMounted = true;

        firebase.auth().onAuthStateChanged(user => {
            if(user){
                if(_isMounted){
                    console.log('login confirmed');
                    setSignInStatus({ isSignInChecked: true, isSignedIn: true});
                }
            }else{
                if(_isMounted){
                    console.log('login denied');
                    setSignInStatus({ isSignInChecked: true, isSignedIn: false});
                }
            }
        })

        return (()=> {
            _isMounted = false;
        })
    }, []);

    const render = () => {

        if(!signInStatus.isSignInChecked){
            return <div>Now Authenticating...</div>
        }

        if(signInStatus.isSignedIn){
            console.log('login check done?: ' + signInStatus.isSignInChecked);
            console.log('login confirmed?: ' + signInStatus.isSignedIn);
            console.log('redirect to todo');
            return <ToDoList/>
            // if(ref.current !== null && ref !== null && ref !== undefined && ref.current !== undefined) {
            //     return ref.current.children[0];
            // }else{
            //     return 
            //         <div>
            //             <span>Sorry, it seems that something went wrong... please log out and try again.</span>
            //             <button onClick={()=> {firebase.auth().signOut()}}>Log out</button>
            //         </div>
            // }
        }else{
            console.log('認証が必要');
            console.log('login check done?: ' + signInStatus.isSignInChecked);
            console.log('login confirmed?: ' + signInStatus.isSignedIn);
            console.log('redirect to signin page');
            return <Redirect to='/sign_in'/>
        }
    }

    return(
        <>
            {render()}
        </>
    );

}

export default Authentication;