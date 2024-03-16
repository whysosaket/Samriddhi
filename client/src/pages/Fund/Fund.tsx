import { useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import FundContext from "@/context/FundContext";
import LoanContext from "@/context/LoanContext";
import { motion } from "framer-motion";
import PieChart from "@/components/charts/PieChart";
import LineChart from "@/components/charts/LineChart";
import { FaToggleOff } from "react-icons/fa6";

const Fund = () => {
  const location = useLocation();
  const fundId = location.pathname.split("/")[2];
  const { getFund, getFundUserInfo } = useContext(FundContext);
  const { getFundLoans, approveLoan } = useContext(LoanContext);
  const [fund, setFund] = useState({
    name: "",
    balance: 0,
    generalInterest: 0,
    members: [],
  });
  const [fundLoans, setFundLoans] = useState([]);

  const [isInvestment, setIsInvestment] = useState(false);
  const [fundUserInfo, setFundUserInfo] = useState({userInterest: 0, interestAmount: 0});

  useEffect(() => {
    const fetchFund = async () => {
      const fund = await getFund(fundId);
      console.log(fund);
      setFund(fund);
    };
    fetchFund();

    const fetchFundLoans = async () => {
      const loans = await getFundLoans(fundId);
      setFundLoans(loans);
    };

    fetchFundLoans();

    const fetchFundUserInfo = async () => {
      const userInfo = await getFundUserInfo(fundId);
      setFundUserInfo(userInfo);
    };

    fetchFundUserInfo();
  }, []);

  const toggleInvestments = () => {
    setIsInvestment(!isInvestment);
  };

  return (
    <div className="quando mt-8 px-8">
      <div className="md:flex justify-between">
        <motion.h1
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0 }}
          className="text-4xl"
        >
          {fund.name}
        </motion.h1>
        <motion.h1
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-2"
        >
          {" "}
          Balance: ₹{fund.balance}
        </motion.h1>
      </div>
      <motion.h1
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="mt-2 text-sm text-gray-400"
      >
        {" "}
        General Interest: {fund.generalInterest}%
      </motion.h1>
      <motion.h1
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="mt-2 text-sm text-gray-400"
      >
        {" "}
        Your Interest: ₹{fundUserInfo.userInterest}
      </motion.h1>
      <motion.h1
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="mt-2 text-sm text-gray-400"
      >
        {" "}
        Total Fund Interest: ₹{fundUserInfo.interestAmount}
      </motion.h1>


      <div className="md:flex">
        <div className="md:w-1/2">
          <div>
            <motion.h1
              initial={{ x: -200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-2xl mt-4"
            >
              Members
            </motion.h1>
            {fund.members.map((member: any, index: number) => {
              return (
                <motion.div
                  initial={{ x: -200, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.4 + index * 0.2 }}
                  key={index}
                  className="w-full bg-white/10 hover:bg-white/30 cursor-pointer p-4 rounded-xl mt-4"
                >
                  <h1>Name: {member.name}</h1>
                  <h1>Balance: ₹{member.balance}</h1>
                </motion.div>
              );
            })}
          </div>
          <div>
            <motion.h1
              initial={{ x: -200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="text-2xl mt-4"
            >
              Loans
            </motion.h1>
            {fundLoans.map((loan: any, index: number) => {
              return (
                <motion.div
                  initial={{ x: -200, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.7 + index * 0.2 }}
                  key={index}
                  className="w-full md:flex justify-between align-middle bg-white/10 hover:bg-white/30 cursor-pointer p-4 rounded-xl mt-4"
                >
                  <div>
                    <h1>Name: {loan.user.name}</h1>
                    <h1>Loan: ₹{loan.amount}</h1>
                    <h1>Interest: {loan.interest}%</h1>
                    <h1>Duration: {loan.duration} months</h1>
                    <h1
                      className={`text-${
                        loan.status === "approved" ? "green" : "yellow"
                      }-600`}
                    >
                      Status: {loan.status}
                    </h1>
                  </div>
                  {loan.status != "approved" && (
                    <div className="my-auto">
                      <button
                        onClick={() => approveLoan(loan._id)}
                        className="bg-green-600 text-white p-2 rounded-lg mt-2"
                      >
                        Approve
                      </button>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
        <motion.div
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="md:px-8 md:pl-32 pt-8"
        >
          {isInvestment ? <LineChart /> : <PieChart />}
          <button
            onClick={toggleInvestments}
            className="bg-white/10 text-white p-2 rounded-lg mt-2 flex"
          >
            <FaToggleOff size={30} className="mr-2" />
            <span className="my-auto">Toggle</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Fund;
