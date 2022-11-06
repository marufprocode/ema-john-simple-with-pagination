import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from '../firebase/firebase.init';


const auth = getAuth(app);


export const AuthContext = createContext();

const UserContext = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    };
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }
    const signOutUser = () => {
        setLoading(true);
        return (
            signOut(auth)
            .then(() => {
                console.log(' Sign-out successful.');
              }).catch((error) => {
                console.error('error', error);
              })              
        )
    }  

    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user); 
            setLoading(false);
            console.log(user)
        });
        return () => unSubscribe();
    },[])

    const authInfo = {createUser, signIn, signOutUser, user, loading}
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default UserContext;