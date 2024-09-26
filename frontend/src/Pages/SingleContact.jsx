import { useContext, useEffect, useState } from "react"
import { AppContext } from "../Components/Context/AppContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import moment from 'moment';

const SingleContact = () => {
    const [singleContact, setSingleContact] = useState({});
    const {id} = useParams();
    const {token, url} = useContext(AppContext);

    useEffect(() => {
        async function fetchContact() {
            try {
                const response = await axios.get(`${url}/contacts/${id}`, {headers: {token}})
                if(response.data.success) {
                    setSingleContact(response.data.data);
                    console.log(response.data.data)
                }
                else {
                    toast.error(response.data.message)
                }
            } catch (error) {
                console.log(error);
            }
        }
        if(token) {
         fetchContact();   
        }
        
    }, [id, token, url])
  return (
    <div className="max-w-4xl w-[90%] mx-auto bg-gray-500 text-white flex flex-col items-center my-3 p-4 rounded-md shadow shadow-slate-900">
        <img src={singleContact.image} alt="profile-img" className="w-[160px] h-[140px] object-cover border border-blue-400 bg-blue-500 rounded-md mb-8" />
        <div className="w-full text-center">
        <p className="font-medium text-lg mb-4 text">Name: <span className="text-yellow-300">{singleContact.name}</span></p>
        <p className="font-medium text-lg mb-4 text">Phone Number: <span className="text-yellow-300">{singleContact.number}</span></p>
        <p className="font-medium text-lg mb-4 text">Email: <span className="text-yellow-300">{singleContact.email}</span></p>
        <p className="font-medium text-lg mb-4 text">Address: <span className="text-yellow-300">{singleContact.address}</span></p>
        <div className="flex items-center justify-between ">
            <p className=" text-sm mb-4 text-slate-200">CreatedAt: <span className="">{moment(singleContact.createdAt).format('DD/MM/YYYY')}</span></p>
            <p className=" text-sm mb-4 text-slate-200">UpdatedAt: <span className="">{moment(singleContact.updatedAt).format('DD/MM/YYYY')}</span></p>
        </div>
        </div>
    </div>
  )
}

export default SingleContact