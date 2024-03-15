import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import 'atropos/css'

import Home from "@/pages/Home";
import Navbar from "@/components/Navbar";
import Login from "@/pages/Login";
import _404 from "@/pages/_404";
import DynamicBackground from "@/components/DynamicBackground";
import Signup from "@/pages/Signup";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1200}
        hideProgressBar={false}
        newestOnTop={false}
        theme="dark"
        closeOnClick
        rtl={false}
        pauseOnHover
        limit={2}
      />
      <DynamicBackground />
      <div className="py-6 px-12">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<_404 />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
