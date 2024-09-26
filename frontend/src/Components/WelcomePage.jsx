import { useContext, useEffect, useState } from "react";
import { AppContext } from "./Context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";

const WelcomePage = () => {
  const { url, contacts, setContacts, token } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  // const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      fetchContacts();
      fetchUsername();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  async function fetchUsername() {
    try {
      const response = await axios.get(`${url}/auth/user`, {headers: {token}});
      if(response.data.success) {
        setUsername(response.data.data.username);
        //console.log(response.data.data.username);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchContacts() {
    setLoading(true);
    try {
      const response = await axios.get(`${url}/contacts/list`, {
        headers: { token },
      });
      if (response.data.success) {
        setContacts(response.data.data);
        // console.log(response.data.data);
        setLoading(false);
      } else {
        console.log(response.data.message);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleCheck(id) {
    const updatedContacts = contacts.map((contact) => {
      if (contact._id === id) {
        return {
          ...contact,
          checked: !contact.checked,
        };
      } else {
        return {
          ...contact,
          checked: contact.checked || false,
        };
      }
    });
    setContacts(updatedContacts);
    // console.log(updatedContacts);
  }

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this contact")) {
      return;
    }
    try {
      const response = await axios.post(
        `${url}/contacts/delete/${id}`,
        {},
        { headers: { token } }
      );
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        fetchContacts();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Delete failed!");
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-2">
      <h2 className="uppercase text-center font-medium text-xl font-serif">
        Welcome <span className="text-blue-600">{username || 'user'}</span>
      </h2>

      <div className="mt-20">
        <h2 className="text-center font-medium text-lg">My Contacts</h2>
        <div className="flex justify-end my-5">
          <button className="bg-green-500 text-white px-2 py-2 uppercase rounded-md w-[100px]" onClick={() => navigate(`/add`)}>
            Add+
          </button>
        </div>

        {loading ? (
          // Show this while loading
          <div className="text-center h-screen">Loading...</div>
        ) : contacts && contacts.length ? (
          // Show the contacts list when loaded
          <ul className="bg-blue-500 rounded-lg text-white p-4">
            {contacts.map((item) => (
              <li
                key={item._id}
                className="flex justify-between mb-5 border-b p-2 border-dashed border-slate-300"
              >
                <input
                  type="checkbox"
                  name="check"
                  id={`check-${item._id}`}
                  onChange={() => handleCheck(item._id)}
                  checked={item.checked || false}
                />
                <Link
                  to={`/contact/${item._id}`}
                  className="flex items-center gap-[5%] flex-1 ml-5 cursor-pointer hover:text-slate-300"
                >
                  <img
                    src={
                      item.image
                        ? item.image
                        : 'https://api.dicebear.com/9.x/adventurer/svg?seed=Destiny} alt=""'
                    }
                    className="size-8 rounded-full"
                  />
                  <p className="text-sm">{item.name}</p>
                </Link>
                <div
                  className={`flex flex-row-reverse bg-slate-800 items-center px-2 rounded-md gap-2 ml-4 ${item.checked ? "" : "hidden"}`}
                >
                  {/* delete button */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-5 text-red-400 hover:opacity-75 cursor-pointer"
                    onClick={() => handleDelete(item._id)}
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                      clipRule="evenodd"
                    />
                  </svg>

                  {/* edit button */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-5 cursor-pointer hover:text-slate-300 text-green-400"
                    onClick={() => navigate(`/edit/${item._id}`)}
                  >
                    <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                  </svg>
                </div>
                <p className={`${item.checked ? 'hidden' : 'text-slate-400 text-sm'}`}>UpdatedAt: {moment(item.updatedAt).format('DD/MM/YYYY')}</p>
              </li>
            ))}
          </ul>
        ) : (
          // Show this when there are no contacts
          <div className="bg-blue-500 rounded-lg text-white p-4">
            Contact list empty. <br />
            Add new contacts or check your internet connection
          </div>
        )}
      </div>
    </div>
  );
};

export default WelcomePage;
