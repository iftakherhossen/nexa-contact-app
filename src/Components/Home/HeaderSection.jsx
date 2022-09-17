import React, { useState } from 'react';
import { AiOutlinePhone, AiOutlineUser } from 'react-icons/ai';
import { FaRegEnvelope } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import useAuth from '../../hooks/useAuth';
import useFetchData from '../../hooks/useFetchData';
import useManageContact from '../../hooks/useManageContact';

const HeaderSection = ({ userInfo }) => {
     let navigate = useNavigate();
     const { user, logOut } = useAuth();
     const [phone, setPhone] = useState("");
     const [imageError, setImageError] = useState(false);
     const { contacts } = useFetchData(userInfo.userId);
     const { updateMyPhone } = useManageContact();

     const handleUpdatePhone = (e) => {
          e.preventDefault();

          Swal.fire({
               title: 'Are you sure?',
               text: 'Do you want to add the number to your profile?',
               showDenyButton: true,
               confirmButtonText: 'Update',
          }).then((result) => {
               if (result.isConfirmed) {
                    updateMyPhone(phone);
                    document.getElementById("profile-modal").checked = false;
                    document.getElementById("phoneInput").value = '';
                    Swal.fire('Phone Number Added', '', 'success')
               }
               else if (result.isDenied) {
                    document.getElementById("profile-modal").value = '';
                    document.getElementById("phoneInput").value = '';
                    Swal.fire('Canceled', '', 'info')
               }
          })
     }

     return (
          <header>
               <div className="flex justify-between items-center md:px-10 flex-col md:flex-row">
                    <div className="flex items-center">
                         {
                              user.photoURL && imageError === false ? <div className="avatar flex justify-center items-center">
                                   <div className="w-16 md:w-20 rounded-full border-[0.1px] border-[#f2f2f2]">
                                        <img src={user.photoURL} alt={user.displayName} draggable={false} onError={() => setImageError(true)} />
                                   </div>
                              </div> : <div className="avatar placeholder flex justify-center items-center">
                                   <div className="bg-[#2b6777] text-white rounded-full w-16 md:w-20 text-3xl border-[0.1px] border-[#f2f2f2]">
                                        <b className="uppercase">{user.displayName.split(" ").map((n) => n[0]).join("").slice(0, 2)}</b>
                                   </div>
                              </div>
                         }
                         <div className="ml-2 md:ml-5">
                              <h1 className="text-white text-2xl font-bold">{user.displayName}</h1>
                              <h3 className="text-slate-300 font-bold">Contact: {contacts ? contacts.length : '0'}/100</h3>
                         </div>
                    </div>
                    <div className="flex md:flex-col mt-5 md:mt-0">
                         <button className="btn btn-sm bg-[#52ab98] text-white hover:bg-red-500 border-0 mx-2 md:mx-0 md:mb-3 w-24" onClick={() => logOut(navigate)}>Log Out</button>
                         <label htmlFor="profile-modal" className="btn btn-sm modal-btn bg-[#52ab98] hover:bg-[#52ab98] border-0 text-white mx-2 md:mx-0 w-24">Profile</label>
                    </div>
               </div>

               {/* Profile Modal */}
               <>
                    <input type="checkbox" id="profile-modal" className="modal-toggle" />
                    <div className="modal modal-bottom sm:modal-middle">
                         <div className="modal-box relative bg-white text-black">
                              <label htmlFor="profile-modal" className="btn btn-sm btn-circle absolute right-2 top-2 bg-[#2b6777] hover:bg-[#2b6777] border-0 text-white">✕</label>
                              <h3 className="text-2xl font-bold text-center">Profile</h3>
                              <div className="border my-1"></div>
                              <div className="py-4">
                                   <form className="w-3/4 mx-auto" onSubmit={!userInfo?.phone ? handleUpdatePhone : undefined}>
                                        {
                                             user.photoURL && imageError === false ? <div className="avatar flex justify-center items-center">
                                                  <div className="w-20 md:w-24 rounded-full border-[0.1px] border-[#f2f2f2]">
                                                       <img src={user.photoURL} alt={user.displayName} draggable={false} onError={() => setImageError(true)} />
                                                  </div>
                                             </div> : <div className="avatar placeholder flex justify-center items-center">
                                                  <div className="bg-[#2b6777] text-white rounded-full w-20 md:w-24 text-3xl border-[0.1px] border-[#f2f2f2]">
                                                       <b className="uppercase">{user.displayName.split(" ").map((n) => n[0]).join("").slice(0, 2)}</b>
                                                  </div>
                                             </div>
                                        }
                                        <div className="form-control flex-row items-center mt-4">
                                             <label className="label bg-[#2b6777] text-[#f2f2f2] px-3 h-10 rounded-l-lg text-lg">
                                                  <AiOutlineUser />
                                             </label>
                                             <label className="input-group">
                                                  <input
                                                       type="text"
                                                       placeholder="Name"
                                                       className="input w-full bg-[#f2f2f2] focus:outline-none text-base font-bold shadow-sm h-10 my-2 select-text"
                                                       defaultValue={user.displayName}
                                                       readOnly
                                                  />
                                             </label>
                                        </div>
                                        <div className="form-control flex-row items-center">
                                             <label className="label bg-[#2b6777] text-[#f2f2f2] px-3 h-10 rounded-l-lg text-lg">
                                                  <AiOutlinePhone />
                                             </label>
                                             <label className="input-group">
                                                  {
                                                       userInfo?.phone ? <input
                                                            type="tel"
                                                            placeholder="Phone"
                                                            defaultValue={userInfo?.phone}
                                                            className="input w-full bg-[#f2f2f2] focus:outline-none text-base font-bold shadow-sm h-10 my-2 select-text"
                                                            readOnly
                                                       /> : <input
                                                            type="number"
                                                            placeholder="Phone"
                                                            id="phoneInput"
                                                            defaultValue={phone}
                                                            className="input w-full bg-[#f2f2f2] focus:outline-none text-base font-bold shadow-sm h-10 my-2 select-text"
                                                            required
                                                            onChange={(e) => setPhone(e.target.value)}
                                                       />
                                                  }
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
                                                       defaultValue={user?.email}
                                                       readOnly
                                                  />
                                             </label>
                                        </div>
                                        {
                                             !userInfo?.phone && <div className="flex justify-center mt-3">
                                                  <button type="submit" className="btn btn-sm bg-[#52ab98] hover:bg-[#2b6777] text-white border-0">Update</button>
                                             </div>
                                        }
                                   </form>
                              </div>
                         </div>
                    </div>
               </>
          </header>
     );
};

export default HeaderSection;