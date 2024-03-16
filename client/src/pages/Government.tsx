import { RightHalf } from "@/components/RightHalf";
import { useState, useRef, useContext } from "react";
import { motion } from "framer-motion";
import GlobalContext from "@/context/GlobalContext";

const Government = () => {
  const [schemes, setSchemes] = useState([]);

  const incomeRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const urbanRuralRef = useRef<HTMLSelectElement>(null);

  const { getSchemes } = useContext(GlobalContext);

  function convertToObjectArray(inputObject: any) {
    const keys = Object.keys(inputObject);
    const length = Object.values(inputObject[keys[0]]).length;
    const result = [];

    for (let i = 0; i < length; i++) {
      const obj = {};
      keys.forEach((key) => {
        // @ts-ignore
        obj[key] = inputObject[key][i];
      });
      result.push(obj);
    }

    return result;
  }

  const handleSearch = async () => {
    const income = incomeRef.current?.value;
    const age = ageRef.current?.value;
    const urbanRural = urbanRuralRef.current?.value;
    console.log(income, age, urbanRural);
    const response = await getSchemes(income, age, urbanRural);
    console.log(response);
    const outputArray = convertToObjectArray(response);
    console.log(outputArray);
    // @ts-ignore
    setSchemes(outputArray);
  };

  return (
    <div className="mt-8 quando">
      <motion.h1
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-semibold text-white"
      >
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
                ref={urbanRuralRef}
                className="w-full p-2 rounded-lg mt-4 bg-black/20"
              >
                <option value="Urban">Urban</option>
                <option value="Rural">Rural</option>
              </motion.select>

              <div className="flex justify-end mb-4">
                <motion.button
                  initial={{ x: -40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  onClick={handleSearch}
                  className="bg-green-600 text-white p-2 rounded-lg mt-4"
                >
                  Search
                </motion.button>
              </div>
            </div>
          </div>
          <h1 className="my-4 text-xl">Schemes for you</h1>
          {schemes.length > 0 ? (
            <motion.div
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="w-full"
            >
              {schemes.map((scheme: any, index: number) => (
                <motion.div
                  initial={{ x: -40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                  className="border bg-black/10 rounded-xl p-6 my-2"
                  key={index}
                >
                  <h1>{scheme.Scheme}</h1>
                  <div className="flex text-sm my-2">
                    <h1 className="mr-4">Min Age: {scheme.Min_Age} Years</h1>
                    <h1>Max Age: {scheme.Max_Age} Years</h1>
                  </div>
                  <h1>
                    Max Income:
                    <span className="text-green-600">
                      {" "}
                      ₹{scheme.Min_Income}
                    </span>
                  </h1>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <h1 className="text-white">No Schemes Found</h1>
          )}
        </div>
        <motion.div
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="w-1/2"
        >
          <RightHalf />
        </motion.div>
      </div>
    </div>
  );
};

export default Government;
