import { useState, useContext, useRef } from "react";
import { GiSesame } from "react-icons/gi";
import Tick from "@/assets/tick.svg";
import { motion } from "framer-motion";
import FundContext from "@/context/FundContext";
import AuthContext from "@/context/AuthContext";

const year = new Date().getFullYear();
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const month = monthNames[new Date().getMonth()];
const day = new Date().getDate();
const isPhone = window.innerWidth < 768;

const Withdraw = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [amount, setAmount] = useState(0);
  const {toastMessage, isAuthenticated} = useContext(AuthContext);
  const {withdraw} = useContext(FundContext);

  const amountRef = useRef<HTMLInputElement>(null);
  const fundRef = useRef<HTMLSelectElement>(null);

  const handleClick = async () => {
    if(!isAuthenticated){
      toastMessage("Please login to continue!", "danger");
      return;
    }
    const amount = amountRef.current?.value || "";
    const fund = fundRef.current?.value || "";
    if(amount==""){
      toastMessage("Please fill all the fields to continue!", "danger");
      return;
    }

    if(fund==""){
        const am = await withdraw(parseInt(amount));
        if(!am){
            return;
        }
        setAmount(am);
        setIsSuccess(true);
        return;
    }else{
        toastMessage("Please select your account to continue!", "danger");
    }
  };

  const reset = () => {
    setIsSuccess(false);
    setAmount(0);
  }

  const cardVarient = {
    initial: {
      scaleY: 1.4,
    },
    final: {
      scaleY: 1,
    },
    onSuccessfulDeposit: {
      x: -70,
      scaleY: 1,
    },
  };

  const BalanceVarient = {
    start: {
      opaxity: 0,
      x: 80,
      y: -350,
    },
    final: {
        y: 80,
        opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.2,
      },
    },

    finalPhone: {
        x: 0,
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
            delay: 0.2,
            },
    },

    startPhone: {
        opacity: 0,
        x: 0,
        y: 200,
    }
  };

  


  return (
    <>
      <div className="flex justify-center antialiased bg-gray-200/0 text-white py-24 p-4">
        <motion.div
          initial="initial"
          animate={isSuccess&&!isPhone ? "onSuccessfulDeposit" : "final"}
          variants={cardVarient}
          transition={{ duration: 0.3 }}
          className="md:flex"
        >
          {/* Card */}
          <div className="min-w-[360px] mx-auto">
            <div className="bg-white/10 shadow-lg rounded-lg mt-9">
              {/* Card header */}
              <header className="text-center px-5 pb-5">
                {/* Avatar */}
                <div
                  className="inline-flex -mt-9 w-[72px] h-[72px] justify-center bg-black fill-current rounded-full border-4 border-white box-content shadow mb-3"
                >
 <GiSesame size={50} className="text-primary my-auto" />
                    </div>
                {/* Card name */}
                <h3 className="text-xl font-bold text-white mb-1">
                  Withdraw Money
                </h3>
                <div className="text-sm font-medium text-gray-400">
                  One tap withdraw
                </div>
              </header>
              {/* Card body */}
              {!isSuccess ? (
                <div className={`bg-gray-100/10 text-center px-5 py-6`}>
                  <div className="text-sm mb-6">
                    <strong className="font-semibold">Today</strong> {month}{" "}
                    {day},{" " + year}
                  </div>
                  <div className="space-y-3">
                    <div className="flex-grow">
                      <input
                        name="card-nr"
                        className="text-sm text-white bg-white/10 rounded-l leading-5 py-2 px-3 placeholder-gray-400 w-full border border-transparent focus:border-orange-300 focus:ring-0"
                        type="number"
                        placeholder="Amount"
                        aria-label="Amount"
                        ref={amountRef}
                      />
                    </div>
                    <div className="flex-grow flex">
                      <select
                        ref={fundRef}
                      className="text-sm text-white bg-white/10 rounded-l leading-5 py-2 px-3 placeholder-gray-400 w-full border border-transparent focus:border-orange-300 focus:ring-0"
                      >
                        <option value="">Self Account</option>
                        </select>                  
                    </div>
                    <button
                      onClick={handleClick}
                      className="font-semibold text-sm inline-flex items-center justify-center px-3 py-2 border border-transparent rounded leading-5 shadow transition duration-150 ease-in-out w-full bg-orange-500 hover:bg-orange-600 text-white focus:outline-none focus-visible:ring-2"
                    >
                      Withdraw
                    </button>
                  </div>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className={`bg-gray-100/10 text-center px-5 py-6 `}
                >
                  <motion.img
                    initial={{ scale: 0, rotateY: 180 }}
                    animate={{ scale: 1, rotateY: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    src={Tick}
                    className="w-20 h-20 mx-auto"
                  />
                  <h1 className="text-xl font-bold text-white mb-1">
                    Success!
                  </h1>
                  <div className="text-sm font-medium text-gray-400">
                    Your money has been withdrawn successfully.
                  </div>
                  <div className="">
                  <button onClick={reset} className="reset-button text-sm px-8 py-2 rounded-md my-2 text-white font-semibold bg-orange-500 hover:bg-orange-700">
                    Withdraw again
                  </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
          {isSuccess && (
            <motion.div
              initial={!isPhone?"start":"startPhone"}
              animate={isSuccess&&!isPhone?"final":"finalPhone"}
              variants={BalanceVarient}
              className="min-w-[360px] mx-auto"
            >
              <div className="bg-white/10 shadow-lg rounded-lg mt-9 p-8">
                <h1 className="font-semibold text-xl">
                    Available Balance
                </h1>
                <h1 className="font-semibold text-4xl text-green-700">
                    ₹ {amount}
                </h1>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default Withdraw;