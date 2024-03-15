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
import JoinFund from "@/pages/Fund/JoinFund";
import { FundState } from "@/context/FundContext";
import Deposit from "@/pages/Banking/Deposit";
import Withdraw from "@/pages/Banking/Withdraw";
import Loans from "./pages/Loans";
import RequestLoan from "./pages/Loan/RequestLoan";
import { LoanState } from "./context/LoanContext";
import Success from "./pages/Success";

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
            <LoanState>
          <div className="py-6 md;px-12 px-4">
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
                <Route path="/withdraw" element={<Withdraw />} />

                {/* Loans */}
                <Route path="/loans" element={<Loans />} />
                <Route path="/getloan" element={<RequestLoan />} />

                <Route path="*" element={<_404 />} />
                <Route path="/success" element={<Success/>} />
              </Routes>
            </Router>
          </div>
          </LoanState>
          </FundState>
        </AuthState>
      </GlobalState>
    </>
  );
}

export default App;
