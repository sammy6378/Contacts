import { useState } from "react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <form className="w-[500px] max-w-full mx-auto mt-20 flex flex-col justify-center shadow p-2.5 rounded-md shadow-slate-800">
      <h2 className="text-center mb-2.5">
        {isLogin ? (
          <span className="text-slate-700">
            don&apos;t have an account? <span className="cursor-pointer text-blue-500 uppercase hover:border-b hover:border-blue-500" onClick={() => setIsLogin(false)}>register</span>
          </span>
        ) : (
          <span className="text-slate-700">
            already have an account? <span className="cursor-pointer text-blue-500 uppercase hover:text-blue-400 hover:border-b hover:border-blue-500" onClick={() => setIsLogin(true)}>login</span>
          </span>
        )}
      </h2>
      <input
        className="border border-blue-500 w-full mb-5 p-2.5 rounded-md outline-gray-400 shadow-sm shadow-gray-400 text-gray-600"
        type="text"
        name="username"
        placeholder="Enter your username"
      />
      <input
        className="border border-blue-500 w-full mb-5 p-2.5 rounded-md outline-gray-400 shadow-sm shadow-gray-400 text-gray-600"
        type="password"
        name="password"
        placeholder="Enter your password"
      />
      {!isLogin &&
      <input
        className="border border-blue-500 w-full mb-5 p-2.5 rounded-md outline-gray-400 shadow-sm shadow-gray-400 text-gray-600"
        type="email"
        name="email"
        placeholder="Enter your email"
      />}
      
      <button
        className="bg-blue-500 p-1 text-white rounded-md mb-2"
        type="submit"
      >
        {isLogin ? "Login" : "Register"}
      </button>
    </form>
  );
};

export default Auth;
