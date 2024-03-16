import ChatInterface from "@/components/ai/ChatInterface";
import SuggestionAI from "@/components/ai/SuggestionAI";
import {motion} from "framer-motion"
import GlobalContext from "@/context/GlobalContext";
import { useContext, useState, useRef } from "react";

const AI = () => {
  const [maxAmount, setMaxAmount] = useState(0);
  const {maxLoan} = useContext(GlobalContext);
  
  const incomeRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const dependentsRef = useRef<HTMLInputElement>(null);

  const handleSearch = async () => {
    const income = incomeRef.current?.value;
    const age = ageRef.current?.value;
    const dependents = dependentsRef.current?.value;
    if(!income || !age || !dependents) return;
    const response = await maxLoan(income, age, dependents);
    setMaxAmount(response);
  }


  return (
    <div className="mt-8 quando">
      <motion.h1
      initial={{x: -200, opacity: 0}}
      animate={{x: 0, opacity: 1}}
      transition={{duration: 1}}
      className="text-2xl text-white">AI Magic</motion.h1>
      <div className="flex mt-2">
        <div className="w-1/2">
          <motion.h1
          initial={{x: -200, opacity: 0}}
          animate={{x: 0, opacity: 1}}
          transition={{duration: 1, delay: 0.2}}
          >
            Chat with our AI to get the best advice and help for your financial
            problems
          </motion.h1>
          <motion.div 
          initial={{x: -200, opacity: 0}}
          animate={{x: 0, opacity: 1}}
          transition={{duration: 1, delay: 0.4}}
          className="mt-8">
          <ChatInterface />
          </motion.div>
           
        </div>
        <motion.div
        initial={{x: 200, opacity: 0}}
        animate={{x: 0, opacity: 1}}
        transition={{duration: 1, delay: 0.3}}
        className="w-1/2 px-6">
            <SuggestionAI />
            <div className="mt-24 bg-white/10 rounded-2xl p-6">
            {/* add three inputs of number type income, age and dependents */}
            <motion.input
            ref={incomeRef}
            initial={{x: -200, opacity: 0}}
            animate={{x: 0, opacity: 1}}
            transition={{duration: 1, delay: 0.6}}
            type="number"
            placeholder="Income"
            className="w-full p-2 rounded-lg bg-black/20"
            />
            <motion.input
            ref={ageRef}
            initial={{x: -200, opacity: 0}}
            animate={{x: 0, opacity: 1}}
            transition={{duration: 1, delay: 0.8}}
            type="number"
            placeholder="Age"
            className="w-full p-2 rounded-lg mt-4 bg-black/20"
            />
            <motion.input
            ref={dependentsRef}
            initial={{x: -200, opacity: 0}}
            animate={{x: 0, opacity: 1}}
            transition={{duration: 1, delay: 1}}
            type="number"
            placeholder="Dependents"
            className="w-full p-2 rounded-lg mt-4 bg-black/20"
            />
            <motion.button
            onClick={handleSearch}
            initial={{x: -200, opacity: 0}}
            animate={{x: 0, opacity: 1}}
            transition={{duration: 1, delay: 1.2}}
            className="bg-primary text-white p-2 rounded-lg mt-4 w-full">
              Search
            </motion.button>
          </div>
         {maxAmount>0&& <motion.div
          initial={{y: -50, opacity: 0}}
          animate={{y: 0, opacity: 1}}
          transition={{duration: 1, delay: 0.1}}
          className="bg-white/10 mt-4 rounded-2xl p-6">
            <h1>
              MAX AMOUNT: ₹ {maxAmount.toFixed(2)}
            </h1>
          </motion.div>}
        </motion.div>
      </div>
    </div>
  );
};

export default AI;
