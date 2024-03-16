import { motion } from "framer-motion";
import FundItem from "@/components/funds/FundItem";
import { useEffect, useState, useContext } from "react";
import { MdLibraryAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import FundContext from "@/context/FundContext";
import { useNavigate } from "react-router-dom";


const Funds = () => {

    const [funds, setFunds] = useState([]);
    const { getFunds } = useContext(FundContext);


    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchFunds = async () => {
            const funds = await getFunds();
            setFunds(funds);
        };
        fetchFunds();
    }, []);

    const navigate = useNavigate();

    useEffect(() => {
      window.scrollTo(0, 0);
      if(localStorage.getItem('auth-token') == null) navigate('/login');
    }, []);

  return (
    <>
    <div className="quando">
      <motion.h1
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-4xl font-bold text-start text-white my-10 ml-5"
      >
        My Funds
      </motion.h1>
      <div className="flex flex-wrap md:flex-row flex-col justify-center w-full">
        {funds.map((fund, index) => {
          return (
            <motion.div
              initial={{ y: 500, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, delay: index * 0.2 }}
              key={index}
              className="w-full md:w-1/3 lg:w-1/4"
            >
              <FundItem fund={fund} />
            </motion.div>
          );
        })}
      </div>
    </div>
    <Link to="/createfund" className="fixed bottom-4 right-2 md:bottom-10 md:right-10 bg-primary hover:bg-[#e37655] h-20 w-20 flex justify-center text-white rounded-full mx-4 my-auto quando">
        <MdLibraryAdd size={30} className="my-auto" />
    </Link>
    </>
  );
};

export default Funds;
