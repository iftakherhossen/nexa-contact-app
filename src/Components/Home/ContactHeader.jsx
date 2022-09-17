import SearchBar from "material-ui-search-bar";
import React, { useState } from 'react';
import toast, { Toaster } from "react-hot-toast";
import { AiOutlinePhone, AiOutlineUser } from 'react-icons/ai';
import { FaPlus, FaRegEnvelope } from 'react-icons/fa';
import Swal from "sweetalert2";
import useManageContact from "../../hooks/useManageContact";

const ContactHeader = ({ userInfo, searchText, requestSearch, cancelSearch }) => {
     const [contactData, setContactData] = useState({});
     const { error, addNewContact } = useManageContact();

     const handleOnBlur = e => {
          const field = e.target.name;
          const value = e.target.value;
          const newContactData = { ...contactData };
          newContactData[field] = value;
          setContactData(newContactData);
     }

     const handleAddNewContact = (e) => {
          e.preventDefault();

          Swal.fire({
               title: 'Are you Sure?',
               text: 'Do you want to save the changes?',
               showDenyButton: true,
               confirmButtonText: 'Save',
          }).then((result) => {
               if (result.isConfirmed) {
                    addNewContact(contactData);
                    document.getElementById("new-contact-modal").checked = false;
                    e.target.reset();
                    if (error) Swal.fire('Oops', 'There was an unexpected error!', 'error')
                    else Swal.fire('Contact Saved!', '', 'success')
               }
               else if (result.isDenied) {
                    document.getElementById("new-contact-modal").checked = false;
                    e.target.reset();
                    Swal.fire('No contact added!', '', 'info')
               }
          })
     }

     error && toast.error("There is an error!")

     return (
          <header className="flex flex-col md:flex-row justify-between mb-5">
               <div>
                    <form>
                         <SearchBar
                              value={searchText}
                              onChange={(searchedValue) => requestSearch(searchedValue)}
                              onCancelSearch={() => cancelSearch()}
                              placeholder="Search Contact"
                              className="w-full md:w-[22rem]"
                              style={{ borderRadius: 8, boxShadow: 'none', backgroundColor: '#c8d8e4' }}
                              disabled={!userInfo?.contacts}
                         />
                    </form>
               </div>
               <label htmlFor="new-contact-modal" className="btn btn-sm modal-btn h-11 md:h-10 bg-[#52ab98] hover:bg-[#52ab98] text-white border-0 flex items-center mt-5 md:mt-0" disabled={userInfo?.contacts?.length === 100}>
                    <FaPlus className="mr-2" /> Add New Contact
               </label>

               {/* New Contact Modal */}
               <>
                    <input type="checkbox" id="new-contact-modal" className="modal-toggle" />
                    <div className="modal modal-bottom sm:modal-middle">
                         <div className="modal-box relative bg-white text-black">
                              <label htmlFor="new-contact-modal" className="btn btn-sm btn-circle absolute right-2 top-2 bg-[#2b6777] hover:bg-[#2b6777] border-0 text-white">✕</label>
                              <h3 className="text-2xl font-bold text-center">Add New Contact</h3>
                              <div className="border my-1"></div>
                              <div className="py-4">
                                   <form className="w-3/4 mx-auto" onSubmit={handleAddNewContact}>
                                        <div className="avatar placeholder flex justify-center mb-4">
                                             <div className="bg-[#2b6777] text-white rounded-full w-24">
                                                  {
                                                       contactData?.name ? <b className="text-4xl uppercase">
                                                            {contactData.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                                                       </b> : <AiOutlineUser className="text-4xl" />
                                                  }
                                             </div>
                                        </div>
                                        <div className="form-control flex-row items-center">
                                             <label className="label bg-[#2b6777] text-[#f2f2f2] px-3 h-10 rounded-l-lg text-lg">
                                                  <AiOutlineUser />
                                             </label>
                                             <label className="input-group">
                                                  <input
                                                       type="text"
                                                       placeholder="Name"
                                                       name="name"
                                                       className="input w-full bg-[#f2f2f2] focus:outline-none text-base font-bold shadow-sm h-10 my-2 select-text"
                                                       onBlur={handleOnBlur}
                                                       autoComplete="off"
                                                       required
                                                  />
                                             </label>
                                        </div>
                                        <div className="form-control flex-row items-center">
                                             <label className="label bg-[#2b6777] text-[#f2f2f2] px-3 h-10 rounded-l-lg text-lg">
                                                  <AiOutlinePhone />
                                             </label>
                                             <label className="input-group">
                                                  <input
                                                       type="number"
                                                       placeholder="Phone"
                                                       name="phone"
                                                       className="input w-full bg-[#f2f2f2] focus:outline-none text-base font-bold shadow-sm h-10 my-2 select-text"
                                                       onBlur={handleOnBlur}
                                                       autoComplete="off"
                                                       required
                                                  />
                                             </label>
                                        </div>
                                        <div className="form-control flex-row items-center">
                                             <label className="label bg-[#2b6777] text-[#f2f2f2] px-3 h-10 rounded-l-lg text-lg">
                                                  <FaRegEnvelope />
                                             </label>
                                             <label className="input-group">
                                                  <input
                                                       type="email"
                                                       placeholder="Email"
                                                       name="email"
                                                       className="input w-full bg-[#f2f2f2] focus:outline-none text-base font-bold shadow-sm h-10 my-2 select-text"
                                                       onBlur={handleOnBlur}
                                                       autoComplete="off"
                                                       required
                                                  />
                                             </label>
                                        </div>
                                        <div className="flex justify-center mt-5">
                                             <button type="submit" className="btn btn-sm bg-[#2b6777] hover:bg-[#2b6777] text-white border-0 flex items-center h-9 px-5" disabled={!contactData}>
                                                  <FaPlus className="mr-2" /> Add Contact
                                             </button>
                                        </div>
                                   </form>
                              </div>
                         </div>
                    </div>
               </>

               <Toaster
                    position="bottom-center"
                    reverseOrder={false}
               />
          </header>
     );
};

export default ContactHeader;