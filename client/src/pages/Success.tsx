import tick from "@/assets/tick.svg";
import {motion} from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
    const navigate = useNavigate();

    useEffect(() => {
      window.scrollTo(0, 0);
      if(localStorage.getItem('auth-token') == null) navigate('/login');
    }, []);
  return (
    <motion.div
    initial={{ opacity: 0, y: -180 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
    className="w-full">
        <div className="flex justify-center items-center h-[80vh]">
            <div className="w-[50rem] h-64 bg-white/10 rounded-2xl py-12">
                <div className="flex justify-center items-center">
                    <img src={tick} alt="tick" className="w-20 h-20" />
                </div>
                <h1 className="text-xl font-bold text-white text-center">Success!</h1>
                <div className="text-sm font-medium text-gray-400 text-center mt-4">
                    Operation Done Successfully
                </div>
            </div>
        </div>
    </motion.div>
  )
}

export default Success