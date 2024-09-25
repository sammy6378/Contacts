import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Auth from "./Pages/Auth";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
    <ToastContainer />
    <div>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <Routes>
                 <Route path="/" element={<Home />} />
              </Routes>
             
            </>
          }
        ></Route>
      </Routes>
    </div>
    </>
  );
};

export default App;