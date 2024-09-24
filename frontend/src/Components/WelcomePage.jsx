import { useContext, useEffect, } from "react";
import { AppContext } from "./Context/AppContext";
import axios from 'axios';

const WelcomePage = () => {
    const {url, token, contacts, setContacts} = useContext(AppContext);
    useEffect(() => {
        fetchContacts()
    }, []);

    async function fetchContacts() {
        try {
            const response = await axios.get(`${url}/contacts/list`, {headers: {token}});
            if(response.data.success) {
                setContacts(response.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div className="max-w-4xl mx-auto p-2">
        <h2 className="uppercase text-center font-medium text-xl font-serif">Welcome <span className="text-blue-600">user</span></h2>

        <div className="mt-20">
            <h2 className="text-center font-medium text-lg">My Contacts</h2>
            <div className="bg-blue-500 rounded-lg text-white">
                contacts here...
            </div>
        </div>
    </div>
  )
}

export default WelcomePage;