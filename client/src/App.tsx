import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "atropos/css";

import Home from "@/pages/Home";
import Navbar from "@/components/Navbar";
import Login from "@/pages/Login";
import _404 from "@/pages/_404";
import DynamicBackground from "@/components/DynamicBackground";
import Signup from "@/pages/Signup";
import { GlobalState } from "@/context/GlobalContext";
import { AuthState } from "@/context/AuthContext";
import Services from "@/pages/Services";
import Funds from "@/pages/Fund/Funds";
import CreateFund from "@/pages/Fund/CreateFund";
import Loading from "@/components/Loading";
import JoinFund from "./pages/Fund/JoinFund";
import { FundState } from "./context/FundContext";
import Deposit from "./pages/Banking/Deposit";

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
      <GlobalState>
        <Loading />
        <AuthState>
          <FundState>
          <div className="py-6 px-12">
            <Router>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/services" element={<Services />} />

                {/* Services */}
                <Route path="/funds" element={<Funds />} />
                <Route path="/createfund" element={<CreateFund />} />
                <Route path="/joinfund/:id" element={<JoinFund />} />

                {/* Banking */}
                <Route path="/deposit" element={<Deposit />} />

                <Route path="*" element={<_404 />} />
              </Routes>
            </Router>
          </div>
          </FundState>
        </AuthState>
      </GlobalState>
    </>
  );
}

export default App;
