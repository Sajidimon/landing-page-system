import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.init";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getRole } from "../api/auth";



const auth = getAuth(app);
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState([])
    const [userrole, setUserrole] = useState(null)
    const [loading, setLoading] = useState(true)


    //get role;

    useEffect(() => {
        if (user?.email) {
            getRole(user.email)
                .then(data => {
                    setUserrole(data.role)
                    console.log(data);
             })   
        }
    }, [user?.email])


    //signup control;
    const [disableSignup, setDisableSignup] = useState(() => {
        try {
            const savedState = localStorage.getItem("disableSignup");
            return savedState !== null ? JSON.parse(savedState) : false;
        } catch (error) {
            console.error("Error parsing JSON from localStorage", error);
            return false;
        }
    });

    // disable or enable create user option;

    useEffect(() => {
        try {
            localStorage.setItem("disableSignup", JSON.stringify(disableSignup));
        } catch (error) {
            console.error("Error saving JSON to localStorage", error);
        }
    }, [disableSignup]);


    //create user with email and password;
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }

    //get current user;

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            console.log('current user', currentUser)
            setLoading(false)

        })
        return () => {
            return unSubscribe();
        }
    }, [])

    //login user with email and password;

    const logIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }


    //logout user;

    const logout = () => {
        setLoading(true)
        return signOut(auth);
    }


    const authInfo = {
        user,
        loading,
        createUser,
        logIn,
        logout,
        disableSignup,
        setDisableSignup,
        userrole,
        setUserrole

    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;