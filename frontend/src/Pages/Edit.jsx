import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../Components/Context/AppContext";
import { useParams } from "react-router-dom";

const Edit = () => {
  const { url, token } = useContext(AppContext);
  const { id } = useParams();
  const [data, setData] = useState({
    name: "",
    number: "",
    email: "",
    address: "",
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    async function fetchContact() {
      const response = await axios.get(`${url}/contacts/${id}`, {
        headers: { token },
      });
      if (response.data.success) {
        const contactData = response.data.data;
        setData({
          name: contactData.name,
          number: contactData.number,
          email: contactData.email,
          address: contactData.address,
        });

        // If an image exists, set it in the image state
        if (contactData.image) {
          setImage(contactData.image); // Set the URL as the image state
        }
      }
    }
    fetchContact();
  }, [id, token, url]);

  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="h-screen flex items-center max-w-4xl mx-auto w-[90%]">
      <form>
        <h2 className="text-2xl mb-5 bg-slate-200 w-fit p-2">Edit Contact</h2>
        <div className="mb-4">
          <label htmlFor="image" className="mb-3">
            {image ? (
              typeof image === 'string' ? (
                <img src={image} className="w-[100px] h-[60px] object-cover" />
              ) : (
                  <img
                src={URL.createObjectURL(image)}
                className="w-[100px] h-[60px] object-cover"
              />
              )
            
            ) : (
              <div className="bg-slate-200 w-[100px] h-[60px] flex flex-col items-center border border-black">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9.75v6.75m0 0-3-3m3 3 3-3m-8.25 6a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
                  />
                </svg>
                <span className="text-gray-400">upload</span>
              </div>
            )}
          </label>
          <input
            type="file"
            name="image"
            id="image"
            className="w-full mb-3"
            onChange={(e) => setImage(e.target.files[0])}
            hidden
          />
        </div>

        <label htmlFor="name">Contact name: </label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="edit name"
          className="w-full border border-slate-500 rounded-sm p-2 mb-3 focus:outline-blue-300"
          onChange={handleOnChange}
          value={data.name}
        />

        <label htmlFor="number">Contact Phone Number: </label>
        <input
          type="string"
          name="number"
          id="number"
          placeholder="7-00-000-000"
          className="w-full border border-slate-500 rounded-sm p-2 mb-3 focus:outline-blue-300"
          onChange={handleOnChange}
          value={data.number}
        />

        <label htmlFor="email">Contact Email: </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="edit email"
          className="w-full border border-slate-500 rounded-sm p-2 mb-3 focus:outline-blue-300"
          onChange={handleOnChange}
          value={data.email}
        />

        <label htmlFor="address">Contact Address: </label>
        <input
          type="text"
          name="address"
          id="address"
          placeholder="edit address"
          className="w-full border border-slate-500 rounded-sm p-2 mb-3 focus:outline-blue-300"
          onChange={handleOnChange}
          value={data.address}
        />

        <button type="submit" className="bg-blue-500 text-white p-2">
          Update Contact
        </button>
      </form>
    </div>
  );
};

export default Edit;
