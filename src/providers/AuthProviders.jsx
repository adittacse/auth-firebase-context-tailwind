import React, {createContext, useEffect, useState} from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import app from "../firebase/firebase.config.js";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProviders = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
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
            setLoading(false);
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
        logOut,
        loading
    }
    
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProviders;