import React, { useState } from 'react';
import { FaEye } from 'react-icons/fa';
import useFetchData from '../../hooks/useFetchData';
import Loading from '../Common/Loading';
import ContactHeader from "./ContactHeader";
import SingleContact from './SingleContact';

const MainSection = ({ userInfo }) => {
     const [searchText, setSearchText] = useState('');
     const [results, setResults] = useState([]);
     const [notMatch, setNotMatch] = useState(false);
     const [showModal, setShowModal] = useState(false);
     const [data, setData] = useState([]);
     const { loading, contacts } = useFetchData(userInfo.userId);
     const sortByAlphabetically = (a, b) => a.name.localeCompare(b.name);

     const requestSearch = (searchedValue) => {
          setSearchText(searchedValue);

          const filteredItems = contacts.filter((item) => {
               return item.name.toLowerCase().includes(searchedValue.toLowerCase()) || item.email.toLowerCase().includes(searchedValue.toLowerCase()) || item.phone.includes(searchedValue);
          });
          const unfilteredItems = !contacts.filter((item) => {
               return item.name.toLowerCase().includes(searchedValue.toLowerCase()) || item.email.toLowerCase().includes(searchedValue.toLowerCase()) || item.phone.includes(searchedValue);
          });

          setResults(filteredItems);
          setNotMatch(unfilteredItems);
     };

     const cancelSearch = () => {
          setSearchText('');
          requestSearch(searchText);
          window.location.reload();
     };

     const handleViewModal = (data) => {
          setData(data)
          setShowModal(true);
     }

     return (
          <div className="px-5 md:px-12 overflow-y-auto overflow-x-hidden">
               <ContactHeader userInfo={userInfo} searchText={searchText} requestSearch={requestSearch} cancelSearch={cancelSearch} />

               {
                    results.length > 0 && <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-8 px-2">
                         {
                              results.map(result => <div className="flex items-center bg-[#f2f2f2] p-2 rounded-lg shadow justify-between">
                                   <div className="flex items-center">
                                        {
                                             result.photoURL ? <div className="avatar mr-3">
                                                  <div className="w-9 rounded-full">
                                                       <img src={result.photoURL} alt={result.name} draggable={false} />
                                                  </div>
                                             </div> : <div className="avatar placeholder mr-3">
                                                  <div className="bg-[#2b6777] text-white rounded-full w-9">
                                                       <b className="uppercase">{result.name.split(" ").map((n) => n[0]).join("").slice(0, 1)}</b>
                                                  </div>
                                             </div>
                                        }
                                        <h3 className="text-black text-lg font-bold my-0">{result.name}</h3>
                                   </div>
                                   <div className="flex justify-end items-center text-slate-500 md:hidden">
                                        <button className="mx-1.5 modal-btn text-xl hover:text-blue-600" onClick={() => handleViewModal(result)}>
                                             <FaEye />
                                        </button>
                                   </div>
                              </div>)
                         }
                    </div>
               }

               {
                    notMatch === true && results.length === 0 && <div className="flex justify-center">
                         <figure className="w-full md:w-1/3 mb-8">
                              <img src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-2506.jpg?w=1380&t=st=1662921662~exp=1662922262~hmac=14a14ea35b71ba143ee13bce6291d7a68571f56891069bcebdb8899819e7cd8d" alt="Not Found" draggable={false} />
                         </figure>
                    </div>
               }

               <div>
                    {
                         loading ? <Loading /> : contacts.length > 0 ? contacts.sort(sortByAlphabetically).map(contact => <SingleContact
                                   contact={contact}
                                   key={contact.id || contact.phone || contact.name || contact.email}
                                   data={data}
                                   showModal={showModal}
                                   setShowModal={setShowModal}
                                   handleViewModal={handleViewModal}
                              />
                         ) : <figure className="flex justify-center my-auto">
                              <img src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-2506.jpg?w=1380&t=st=1662921662~exp=1662922262~hmac=14a14ea35b71ba143ee13bce6291d7a68571f56891069bcebdb8899819e7cd8d" alt="No Contacts" className="w-full md:w-2/5" draggable={false} />
                         </figure>
                    }
               </div>
          </div>
     );
};

export default MainSection;