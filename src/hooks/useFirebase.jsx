import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import initializeAuthentication from '../Components/Firebase/firebase.init';
import useFetchData from "./useFetchData";
const generateUniqueId = require('generate-unique-id');

// initialize firebase app
initializeAuthentication();

const useFirebase = () => {
     const [user, setUser] = useState({});
     const [isLoading, setIsLoading] = useState(true);
     const [authError, setAuthError] = useState('');
     const [success, setSuccess] = useState(false);
     const userId = generateUniqueId({
          length: 15,
          useLetters: true,
          excludeSymbols: ["0"]
     });
     const { usersInfo } = useFetchData();

     const auth = getAuth();
     const googleProvider = new GoogleAuthProvider();

     // google sign in
     const signInWithGoogle = (navigate) => {
          setIsLoading(true);
          signInWithPopup(auth, googleProvider)
               .then((result) => {
                    const user = result.user;
                    saveUser(user.email, user.displayName, user.photoURL)
                    setAuthError('');
               })
               .catch((error) => {
                    setAuthError(error.message);
                    console.log(error);
                    authError && Swal.fire(
                         'Something went wrong!',
                         `Please try again. The Error is: ${authError}`,
                         'error'
                    );
               })
               .finally(() => {
                    setIsLoading(false);
                    setSuccess(true);
                    success && Swal.fire(
                         'Login Successfully!',
                         `Welcome, <b>${user?.displayName ? user.displayName : 'User'}</b>`,
                         'success'
                    );
                    navigate('/home');
               });
     }

     //observe user state
     useEffect(() => {
          const unsubscribe = onAuthStateChanged(auth, (user) => {
               if (user) {
                    setUser(user);
               }
               else {
                    setUser({});
               }
               setIsLoading(false);
          });
          return () => unsubscribe
     }, [auth]);

     const logOut = (navigate) => {
          signOut(auth)
               .then(() => { })
               .catch((error) => {
                    error && Swal.fire(
                         'Error Occurred!',
                         `${error}`,
                         'error'
                    )
               })
               .finally(() => {
                    setIsLoading(false);
                    setSuccess(true);
                    success && Swal.fire(
                         'Logout Successfully!',
                         `See you again, <b>${user?.displayName}</b>`,
                         'success'
                    );
                    navigate('/')
               });
     }

     const saveUser = (email, displayName, photoURL) => {
          const db = getDatabase();

          const checkUser = usersInfo[0]?.find(user => user?.email === email)

          if (!checkUser) {
               set(ref(db, 'users/' + userId), {
                    userId: userId,
                    name: displayName,
                    phone: "",
                    email: email,
                    photoURL: photoURL,
                    contacts: {}
               })
          }
     }

     return {
          signInWithGoogle,
          logOut,
          user,
          isLoading,
          authError
     }
}

export default useFirebase;