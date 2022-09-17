import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { AiOutlinePhone, AiOutlineUser } from 'react-icons/ai';
import { FaEdit, FaEye, FaRegEnvelope, FaShareAlt, FaTrash } from 'react-icons/fa';
import { MdContentCopy, MdOutlineCancel } from 'react-icons/md';
import { RWebShare } from "react-web-share";
import Swal from 'sweetalert2';
import useManageContact from '../../hooks/useManageContact';

const SingleContact = ({ contact, data, showModal, setShowModal, handleViewModal }) => {
     const { id, name, phone, email } = contact;
     const { deleteContact } = useManageContact();

     const handleCopyNumber = number => {
          navigator.clipboard.writeText(number);
          toast.success('Phone number copied successfully!', {
               duration: 1500,
          });
     };

     const handleDeleteContact = (data) => {
          Swal.fire({
               title: 'Are you Sure?',
               text: 'Do you want to delete the contact?',
               showDenyButton: true,
               confirmButtonText: 'Delete',
          }).then((result) => {
               if (result.isConfirmed) {
                    deleteContact(data);
                    setShowModal(false);
                    Swal.fire('Contact is Deleted!', '', 'success')
               } else if (result.isDenied) {
                    setShowModal(false);
                    Swal.fire('Your contact is safe!', '', 'info')
               }
          })
     }



     return (
          <div className="grid grid-cols-1 md:grid-cols-4 py-2 px-3 bg-[#c8d8e4] rounded-lg shadow-sm mb-2">
               <div className="flex items-center justify-between md:justify-start">
                    <div className="flex items-center">
                         <div className="avatar placeholder mr-3">
                              <div className="bg-[#2b6777] text-white rounded-full w-10">
                                   <b className="uppercase">{name.split(" ").map((n) => n[0]).join("").slice(0, 2)}</b>
                              </div>
                         </div>
                         <h3 className="text-black text-lg font-bold">{name}</h3>
                    </div>

                    <div className="flex justify-end items-center text-slate-500 md:hidden">
                         <button className="mx-1.5 text-xl hover:text-blue-600" onClick={() => handleViewModal(contact)}>
                              <FaEye />
                         </button>
                    </div>
               </div>
               <div className="hidden md:flex items-center">
                    {phone ? <h3 className="text-slate-800 text-lg font-bold"><a href={`tel:${phone}`} className="hover:underline">{phone}</a></h3> : <b className="text-black">-</b>}
               </div>
               <div className="hidden md:flex items-center">
                    {email ? <h3 className="text-slate-800 text-lg font-bold"><a href={`mailto:${email}`} className="hover:underline">{email}</a></h3> : <b className="text-black">-</b>}
               </div>
               <div className="hidden md:flex justify-end items-center text-slate-500">
                    <button className="btn btn-sm btn-circle mx-1.5 text-xl border-0 bg-transparent hover:bg-transparent text-[#2b6777] hover:text-[#2b6777] hover:shadow" onClick={() => handleViewModal(contact)}>
                         <FaEye />
                    </button>
                    <button className="btn btn-sm btn-circle mx-1.5 text-xl border-0 bg-transparent hover:bg-transparent text-[#2b6777] hover:text-[#2b6777] hover:shadow" onClick={() => handleCopyNumber(phone)}>
                         <MdContentCopy />
                    </button>
               </div>


               {/* View Contact Modal */}
               {
                    showModal ? (
                         <>
                              <div className="justify-center items-end md:items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                   <div className="relative sm:my-6 mx-auto w-full md:w-2/5">
                                        <div className="border-0 rounded-lg shadow-sm relative flex flex-col w-full bg-white outline-none focus:outline-none pb-6">
                                             <div className="flex items-center justify-end px-4 pt-4">
                                                  <button className="ml-auto bg-transparent flex items-center text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none" onClick={() => setShowModal(false)}>
                                                       <MdOutlineCancel />
                                                  </button>
                                             </div>
                                             <div className="py-2 sm:py-4">
                                                  <form className="w-5/6 md:w-2/3 mx-auto text-black">
                                                       {
                                                            data.photoURL ? <div className="avatar flex justify-center mb-4">
                                                                 <div className="w-24 rounded-full">
                                                                      <img src={data.photoURL} alt={data.name} draggable={false} />
                                                                 </div>
                                                            </div> : <div className="avatar placeholder flex justify-center mb-4">
                                                                 <div className="bg-[#2b6777] text-white rounded-full w-24">
                                                                      <b className="text-4xl uppercase">{data.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}</b>
                                                                 </div>
                                                            </div>
                                                       }
                                                       <div className="form-control flex-row items-center">
                                                            <label className="label bg-[#2b6777] text-[#f2f2f2] px-3 h-10 rounded-l-lg text-lg">
                                                                 <AiOutlineUser />
                                                            </label>
                                                            <label className="input-group">
                                                                 <input
                                                                      type="text"
                                                                      placeholder="Name"
                                                                      className="input w-full bg-[#f2f2f2] focus:outline-none text-base font-bold shadow-sm h-10 my-2 select-text"
                                                                      readOnly
                                                                      defaultValue={data.name}
                                                                 />
                                                            </label>
                                                       </div>
                                                       <div className="form-control flex-row items-center">
                                                            <label className="label bg-[#2b6777] text-[#f2f2f2] px-3 h-10 rounded-l-lg text-lg">
                                                                 <AiOutlinePhone />
                                                            </label>
                                                            <label className="input-group">
                                                                 <input
                                                                      type="tel"
                                                                      placeholder="Phone"
                                                                      className="input w-full bg-[#f2f2f2] focus:outline-none text-base font-bold shadow-sm h-10 my-2 select-text"
                                                                      readOnly
                                                                      defaultValue={data.phone}
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
                                                                      className="input w-full bg-[#f2f2f2] focus:outline-none text-base font-bold shadow-sm h-10 my-2 select-text"
                                                                      readOnly
                                                                      defaultValue={data.email}
                                                                 />
                                                            </label>
                                                       </div>
                                                  </form>
                                             </div>
                                             <div className="flex items-center justify-center py-4">
                                                  <button className="btn btn-sm btn-circle bg-[#52ab98] hover:bg-[#2b6777] border-0 text-white w-10 h-10 mx-2 flex justify-center tooltip tooltip-bottom" data-tip="Coming Soon!">
                                                       <FaEdit className="text-xl" />
                                                  </button>
                                                  <button
                                                       className="btn btn-sm btn-circle bg-[#52ab98] hover:bg-[#2b6777] border-0 text-white w-10 h-10 mx-2 flex justify-center tooltip tooltip-bottom"
                                                       data-tip="Coming Soon!"
                                                       //onClick={() => handleDeleteContact(data)}
                                                  >
                                                       <FaTrash className="text-lg" />
                                                  </button>
                                                  <RWebShare
                                                       data={{
                                                            text: `Name: ${name}, Phone Number: ${phone}, Email: ${email}`,
                                                            url: "https://nexa-contact.web.app",
                                                            title: "Nexa Contact App",
                                                            sites: ["facebook", "twitter", "whatsapp", "reddit", "telegram", "linkedin", "mail", "copy", "vk", "okru"]
                                                       }}
                                                       onClick={() => console.log('opened')}
                                                  >
                                                       <button className="btn btn-sm btn-circle bg-[#52ab98] hover:bg-[#2b6777] border-0 text-white w-10 h-10 mx-2 flex justify-center">
                                                            <FaShareAlt />
                                                       </button>
                                                  </RWebShare>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                              <div className="opacity-10 fixed inset-0 z-40 bg-[#00000075]"></div>
                         </>
                    ) : null
               }

               <Toaster
                    position="bottom-center"
                    reverseOrder={false}
               />
          </div>
     );
};

export default SingleContact;