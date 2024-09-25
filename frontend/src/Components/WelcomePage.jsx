import { useContext, useEffect, useState } from "react";
import { AppContext } from "./Context/AppContext";
import axios from "axios";

const WelcomePage = () => {
  const { url, contacts, setContacts, token } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      fetchContacts(); 
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  async function fetchContacts() {
    setLoading(true)
    try {
      const response = await axios.get(`${url}/contacts/list`, {
        headers: { token },
      });
      if (response.data.success) {
        setContacts(response.data.data);
        console.log(response.data.data);
        setLoading(false)
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  return (
    <div className="max-w-4xl mx-auto p-2">
      <h2 className="uppercase text-center font-medium text-xl font-serif">
        Welcome <span className="text-blue-600">user</span>
      </h2>

      <div className="mt-20">
        <h2 className="text-center font-medium text-lg">My Contacts</h2>
        {loading ? (
          // Show this while loading
          <div className="text-center h-screen">Loading...</div>
        ) : contacts && contacts.length ? (
          // Show the contacts list when loaded
          <ul className="bg-blue-500 rounded-lg text-white p-4">
            {contacts.map((item) => (
              <li key={item._id}>{item.name}</li>
            ))}
          </ul>
        ) : (
          // Show this when there are no contacts
          <div className="bg-blue-500 rounded-lg text-white p-4">
            Contact list empty...
          </div>
        )}
      </div>
    </div>
  );
};

export default WelcomePage;
