// Import from React to create the context
import React, {useState, useEffect, useContext} from "react"
// Import of the auth object from base.js
import {auth} from '../base'
// Import from Firebase for logging in and out functions
import { GithubAuthProvider, signInWithPopup, signOut } from "firebase/auth"

// The below creates the context
const AuthContext = React.createContext()

// The below function allows the context to be used in other components
export function useAuth() {
    return useContext(AuthContext)
}

// The below component contains the necessary functions for returning the current user, logging in and loggin out in child components

export default function AuthProvider({children}) {

    // This hook stores the current user info. By defualt this will be null, and is updated during the login function
    const [currentUser, setCurrentUser] = useState()

    // This hook is used to determine if this context has any info to share with child components prior to loading the children to the screen.
    const [loading, setloading] = useState(true);

    // Login functionallity
    // Instantiates a GithubAuthProvier object
    const githubAuthProvider = new GithubAuthProvider()

    // The below login function is async, to allow for login completion before executing further code

    async function login() {
        return (signInWithPopup(auth, githubAuthProvider).then(authData => {
            console.log(authData)
            setCurrentUser(authData.user)
        }))

    
    }

    // Logout functionality, also async, sets current user to null
    async function logout() {
        signOut(auth).then(setCurrentUser(null))
    }
    //This object is passed as props in the below return, allowing for these functions to be used elsewhere
    const value = { currentUser, login, logout}

    useEffect(() => {
        const authChange = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setloading(false)
        })
        return authChange
    }, []);

    return (<AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>)
}