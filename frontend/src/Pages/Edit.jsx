
const Edit = () => {
  return (
    <div>
      <form>
        <label htmlFor="image">Choose Image</label>
        <input type="file" name="image" id="image" className="w-full" />

        <label htmlFor="name">Contact name: </label>
        <input type="text" name="name" id="name" placeholder="edit name" className="w-full border border-slate-500 rounded-md p-2" />

        <label htmlFor="number">Contact Phone Number: </label>
        <input type="number" name="number" id="number" placeholder="7-00-000-000" className="w-full border border-slate-500 rounded-md p-2" />

        <label htmlFor="email">Contact Email: </label>
        <input type="email" name="email" id="email" placeholder="edit email" className="w-full border border-slate-500 rounded-md p-2" />

        <label htmlFor="address">Contact Address: </label>
        <input type="text" name="address" id="address" placeholder="edit address" className="w-full border border-slate-500 rounded-md p-2" />

        <button type="submit" className="bg-blue-500 text-white p-2">Update Contact</button>
      </form>
    </div>
  )
}

export default Edit