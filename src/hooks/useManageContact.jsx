import { get, getDatabase, onValue, push, query, ref } from 'firebase/database';
import { useState } from 'react';
import useAuth from './useAuth';
import useFetchData from './useFetchData';
const generateUniqueId = require('generate-unique-id');

const useManageContact = () => {
     const { user } = useAuth();
     const { usersInfo } = useFetchData();

     const userInfo = usersInfo[0]?.find(data => data?.email === user.email);
     const userId = userInfo?.userId;

     const [isLoading, setIsLoading] = useState(true);
     const [error, setError] = useState(false);

     const db = getDatabase();
     const id = generateUniqueId({
          length: 15,
          useLetters: true,
          excludeSymbols: ["0"]
     });

     const addNewContact = (contactData) => {
          try {
               setIsLoading(true);
               setError(false);

               const contact = {
                    id: id,
                    name: contactData.name,
                    phone: contactData.phone,
                    email: contactData.email,
               }

               push(ref(db, 'users/' + userId + '/contacts'), contact);

               setIsLoading(false)
          }
          catch (err) {
               console.log(err);
               setIsLoading(false);
               setError(true);
          }
     }

     const updateMyPhone = (phone) => {
          try {
               setIsLoading(true);
               setError(false);

               onValue(ref(db, 'users/' + userId), { phone: phone });

               setIsLoading(false);
          }
          catch (err) {
               console.log(err);
               setIsLoading(false);
               setError(true);
          }
     }

     const deleteContact = (data) => {
          try {
               setIsLoading(true);
               setError(false);

               //remove(ref(db, 'users/' + userId + '/contacts/' + data.id))

               setIsLoading(false);
               console.log('deleted');
          }
          catch (err) {
               console.log(err);
               setIsLoading(false);
               setError(true);
          }
     }

     return {
          isLoading,
          error,
          addNewContact,
          updateMyPhone,
          deleteContact
     };
};

export default useManageContact;