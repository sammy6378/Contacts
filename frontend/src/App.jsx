import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Auth from "./Pages/Auth";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Auth />} />
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
  );
};

export default App;