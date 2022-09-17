import { get, getDatabase, orderByKey, query, ref } from 'firebase/database';
import { useEffect, useState } from 'react';

const useFetchData = (userId) => {
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(false);
     const [usersInfo, setUsersInfo] = useState([]);
     const [contacts, setContacts] = useState([]);

     useEffect(() => {
          async function fetchUsersInfo() {
               const db = getDatabase();
               const usersRef = ref(db, "users");
               const userQuery = query(
                    usersRef,
                    orderByKey(),
               );

               try {
                    setError(false);
                    setLoading(true);

                    const snapshot = await get(userQuery);
                    setLoading(false);
                    if (snapshot.exists()) {
                         setUsersInfo(() => {
                              return [Object.values(snapshot.val())]
                         })
                    }
                    else { }
               }
               catch (err) {
                    console.log(err);
                    setLoading(false);
                    setError(true);
               }
          }

          async function fetchContacts() {
               const db = getDatabase();
               const contactsRef = ref(db, "users/" + userId + "/contacts");
               const contactQuery = query(
                    contactsRef,
                    orderByKey(),
               );

               try {
                    setError(false);
                    setLoading(true);

                    const snapshot = await get(contactQuery);
                    setLoading(false);
                    if (snapshot.exists()) {
                         setContacts(() => {
                              return [Object.values(snapshot.val())][0]
                         });
                    }
                    else {
                    };
               }
               catch (err) {
                    console.log(err);
                    setLoading(false);
                    setError(true);
               }
          }

          fetchUsersInfo();
          fetchContacts();
     }, [userId])

     return {
          loading,
          error,
          usersInfo,
          contacts,
     };
};

export default useFetchData;