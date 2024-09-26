import { useState } from "react";

const Edit = () => {
  const [data, setData] = useState({
    name: "",
    number: "",
    email: "",
    address: ""
  });

  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData(prevData => ({...prevData, [name]: value}));
  }
  
  return (
    <div className="h-screen flex items-center max-w-4xl mx-auto w-[90%]">
      <form>
        <h2 className="text-2xl mb-5 bg-slate-200 w-fit p-2">Edit Contact</h2>
        <div>
          <label htmlFor="image" className="mb-3">
            Choose Image
          </label>
          <input type="file" name="image" id="image" className="w-full mb-3 " hidden/>
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
          type="number"
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
