import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Auth from "./Pages/Auth";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Edit from './Pages/Edit';
import Add from "./Pages/Add";

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
                 <Route path="/edit/:id" element={<Edit />} />
                 <Route path="/add" element={<Add />} />
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