import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Auth from "./Pages/Auth";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Edit from './Pages/Edit';
import Add from "./Pages/Add";
import SingleContact from "./Pages/SingleContact";

const App = () => {
  const isAuthenticated = () => {
    return
  }
  return (
    <>
    <ToastContainer />  
    <div>
      <Routes>
        <Route path="/" element={<Navigate to={'/auth'} replace />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/*"
          element={
            <>
              <Navbar /> 
              <Routes> 
                 <Route path="/home" element={<Home />} />
                 <Route path="/edit/:id" element={<Edit />} />
                 <Route path="/add" element={<Add />} />
                 <Route path="/contact/:id" element={<SingleContact />} />
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