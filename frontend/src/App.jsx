import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Auth from "./Pages/Auth";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Auth />} />
        <Route path="/*">
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Auth />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
