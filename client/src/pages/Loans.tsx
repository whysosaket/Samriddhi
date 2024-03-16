// @ts-nocheck
import { Link } from "react-router-dom"
import { FaLaptopHouse } from "react-icons/fa";
import {motion} from "framer-motion";
import { useContext, useEffect, useState } from "react";
import LoanContext from "@/context/LoanContext";
import BarChart from "@/components/charts/BarChart";


const Loans = () => {
  const { getLoans } = useContext(LoanContext);
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    const fetchLoans = async () => {
      const loans = await getLoans();
      setLoans(loans);
    };
    fetchLoans();
  }, []);

  const calculateEMI = (amount: number, interest: number, duration: number) => {
    let ans =  (amount + (amount * interest * duration) / 100) / duration;
    return ans.toFixed(2);
  }



  return (
    <div className="mt-8 quando w-full md:px-8 px-2">
      <div className="w-full flex justify-between align-middle">
      <motion.h1
      initial={{ x: -200, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0 }}
      className="text-3xl font-semibold my-auto">My Loans</motion.h1>
      <Link to="/getloan" className="bg-primary hover:bg-orange-700 text-white p-4 rounded-full my-auto">
        <FaLaptopHouse size={30} className="my-auto" />
      </Link>
      </div>

      <div className="w-full md:flex px-2">
        <div className="md:w-1/2">
          {
              loans.map((loan, index) => {
                console.log(loan);
                return (
                  <motion.div
                    initial={{ x: -200, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.2 + index * 0.2 }}
                    key={index}
                    className="w-full bg-white/10 hover:bg-white/30 cursor-pointer p-4 rounded-xl mt-4"
                  >
                    <div>
                      <h1 className="text-xl">{loan.fund.name}</h1>
                      <hr className="my-2" />
                    </div>
                    <h1>Amount: ₹{loan.amount}</h1>
                    <h1>Interest: {loan.interest}%</h1>
                    <h1>Duration: {loan.duration} months</h1>
                    <h1 className={`text-${loan.status==="approved"?"green":"yellow"}-600`}>Status: {loan.status}</h1>
                    <h1>EMI: ₹{calculateEMI(loan.amount, loan.interest, loan.duration)}</h1>
                  </motion.div>
                );
              })
          }
        </div>
        <div className="md:w-1/2 md:px-12 md:mt-28 mt-12">
           <motion.div
           initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
           >
           <BarChart />
           </motion.div>
        </div>
      </div>
      
    </div>
  )
}

export default Loans