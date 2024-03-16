import { GrMagic } from "react-icons/gr";
import {motion} from "framer-motion";

const SuggestionAI = () => {
  return (
    <div className="w-full">
      <div className="bg-white/10 rounded-2xl p-4 flex align-middle justify-between">
        <h1 className="my-auto">Get AI Suggestion</h1>
        <button className="p-3 rounded-full bg-orange-500 flex ">
          <GrMagic size={20} className="text-white mx-auto" />
        </button>
      </div>
      <motion.div
      initial={{y: -50, opacity: 0}}
      animate={{y: 0, opacity: 1}}
      transition={{duration: 1}}
      className="mt-4 bg-white/10 rounded-2xl p-4">
        <h1 className="my-2 mx-2">hiiii</h1>
        <h1 className="my-2 mx-2">hiiii</h1>
        <h1 className="my-2 mx-2">hiiii</h1>
        <h1 className="my-2 mx-2">hiiii</h1>
        <h1 className="my-2 mx-2">hiiii</h1>
      </motion.div>
    </div>
  );
};

export default SuggestionAI;
