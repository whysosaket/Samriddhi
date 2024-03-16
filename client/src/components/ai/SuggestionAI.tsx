import { GrMagic } from "react-icons/gr";
import {motion} from "framer-motion";
import { useContext, useState } from "react";
import GlobalContext from "@/context/GlobalContext";

const prompt = "As a financial advisor, share 5 unknown facts or suggestion about finance, enclosed within '##' as a delimiter for each fact. Refusal to answer non-finance questions or a greeting message will be provided. Do not write anything else and make a max to 5 sugegstions"
const SuggestionAI = () => {
    const {chatbot} = useContext(GlobalContext);
    const [suggestions, setSuggestions] = useState<any[]>([]);


    const handleAI = async () => {
        const response = await chatbot(prompt);
        let suggestions = response.split('##');
        // @ts-ignore
        suggestions = suggestions.filter((suggestion) => suggestion !== '');
        console.log(suggestions);
        setSuggestions(suggestions);
    }

  return (
    <div className="w-full">
      <div className="bg-white/10 rounded-2xl p-4 flex align-middle justify-between">
        <h1 className="my-auto">Get AI Suggestion</h1>
        <button onClick={handleAI} className="p-3 rounded-full bg-orange-500 flex ">
          <GrMagic size={20} className="text-white mx-auto" />
        </button>
      </div>
      {suggestions.length > 0 &&
      <motion.div
      initial={{y: -50, opacity: 0}}
      animate={{y: 0, opacity: 1}}
      transition={{duration: 1}}
      className="mt-4 bg-white/10 rounded-2xl p-4 text-sm text-gray-300">
        <h1 className="my-4 mx-4">Suggestion 1: {suggestions[0]}</h1>
        <h1 className="my-4 mx-4">Suggestion 2: {suggestions[1]}</h1>
        <h1 className="my-4 mx-4">Suggestion 3: {suggestions[2]}</h1>
        <h1 className="my-4 mx-4">Suggestion 4: {suggestions[3]}</h1>
        <h1 className="my-4 mx-4">Suggestion 5: {suggestions[4]}</h1>
      </motion.div>}
    </div>
  );
};

export default SuggestionAI;
