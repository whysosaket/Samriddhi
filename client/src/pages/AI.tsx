import ChatInterface from "@/components/ai/ChatInterface";
import SuggestionAI from "@/components/ai/SuggestionAI";
import {motion} from "framer-motion"

const AI = () => {
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
        </motion.div>
      </div>
    </div>
  );
};

export default AI;
