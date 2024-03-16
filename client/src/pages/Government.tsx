import { RightHalf } from "@/components/RightHalf";
import { useState, useRef } from "react";
import {motion} from "framer-motion";

const Government = () => {
  const [schemes, setSchemes] = useState([]);

  const incomeRef = useRef<HTMLInputElement>(null);
    const ageRef = useRef<HTMLInputElement>(null);
    const urbanRuralRef = useRef<HTMLSelectElement>(null);

    const handleSearch = async () => {
        const income = incomeRef.current?.value;
        const age = ageRef.current?.value;
        const urbanRural = urbanRuralRef.current?.value;
        console.log(income, age, urbanRural);
        // const response = 1
        // const data = await response.json();
        // setSchemes(data);
        }


  return (
    <div className="mt-8 quando">
      <motion.h1
      initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      className="text-3xl font-semibold text-white">
        Government Schemes for me?
      </motion.h1>
      <div className="mt-8 flex">
        <div className="w-1/2">
        <div className="">
        {/* input income, age, urban_rural */}
        <div className="mt-4">
          <motion.input
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            type="number"
            placeholder="Income"
            className="w-full p-2 rounded-lg bg-black/20"
            ref={incomeRef}
          />

          <motion.input
           initial={{ x: -40, opacity: 0 }}
           animate={{ x: 0, opacity: 1 }}
           transition={{ duration: 0.5, delay: 0.4 }}
            type="number"
            placeholder="Age"
            className="w-full p-2 rounded-lg mt-4 bg-black/20"
            ref={ageRef}
          />

          <motion.select
           initial={{ x: -40, opacity: 0 }}
           animate={{ x: 0, opacity: 1 }}
           transition={{ duration: 0.5, delay: 0.6 }}
          ref={urbanRuralRef} className="w-full p-2 rounded-lg mt-4 bg-black/20">
            <option value="Urban">Urban</option>
            <option value="Rural">Rural</option>
          </motion.select>

          <div className="flex justify-end mb-4">
          <motion.button
           initial={{ x: -40, opacity: 0 }}
           animate={{ x: 0, opacity: 1 }}
           transition={{ duration: 0.5, delay: 0.7 }}
          onClick={handleSearch} className="bg-green-600 text-white p-2 rounded-lg mt-4">
            Search
          </motion.button>
          </div>
        </div>
      </div>
      <h1 className="my-4 text-xl">
        Schemes for you
      </h1>
          <motion.div
           initial={{ x: -40, opacity: 0 }}
           animate={{ x: 0, opacity: 1 }}
           transition={{ duration: 0.5, delay: 0.9 }}
          className="border bg-black/10 rounded-xl p-6">
            <h1>Ayushmaan Bharat Yojana</h1>
           <div className="flex text-sm my-2">
            <h1 className="mr-4">Min Age: 12 Years</h1>
            <h1>Max Age: 30 Years</h1>
           </div>
            <h1>Max Income: 
                <span className="text-green-600"> ₹ 50000</span>
            </h1>
        </motion.div>
        </div>
        <motion.div
         initial={{ x: 200, opacity: 0 }}
         animate={{ x: 0, opacity: 1 }}
         transition={{ duration: 1, delay: 0.2 }}
        className="w-1/2">
          <RightHalf />
        </motion.div>
      </div>
    </div>
  );
};

export default Government;
