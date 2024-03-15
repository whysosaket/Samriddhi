import { motion } from "framer-motion";
import FundItem from "@/components/funds/FundItem";
import { useEffect } from "react";
import { MdLibraryAdd } from "react-icons/md";

let funds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const Funds = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

  return (
    <>
    <div className="quando">
      <motion.h1
        initial={{ y: -200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-4xl font-bold text-center text-primary mt-10 mb-10"
      >
        My Funds
      </motion.h1>
      <div className="flex flex-wrap justify-center w-full">
        {funds.map((fund, index) => {
          return (
            <motion.div
              initial={{ y: 500, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, delay: index * 0.2 }}
              key={index}
              className="w-1/2 md:w-1/3 lg:w-1/4"
            >
              <FundItem fund={fund} />
            </motion.div>
          );
        })}
      </div>
    </div>
    <button className="absolute bottom-10 right-10 bg-primary hover:bg-[#e37655] h-20 w-20 flex justify-center text-white rounded-full mx-4 my-auto quando">
        <MdLibraryAdd size={30} className="my-auto" />
    </button>
    </>
  );
};

export default Funds;
