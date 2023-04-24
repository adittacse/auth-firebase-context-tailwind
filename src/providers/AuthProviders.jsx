import React, {createContext, useEffect, useState} from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import app from "../firebase/firebase.config.js";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProviders = ({ children }) => {
    const [user, setUser] = useState(null);
    
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }
    
    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }
    
    // observe auth state change
    useEffect( () => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            console.log("auth state change", currentUser);
            setUser(currentUser);
        });
        
        return () => {
            unsubscribe();
        }
    }, []);
    
    const logOut = () => {
        return signOut(auth);
    }
    
    const authInfo = {
        user,
        createUser,
        signIn,
        logOut
    }
    
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProviders;