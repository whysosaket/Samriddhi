import { BentoGridDemo } from "@/components/services/BentoGridDemo";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    if(localStorage.getItem('auth-token') == null) navigate('/login');
  }, []);
  return (
    <div className="quando">
      <motion.h1
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-4xl font-bold text-start text-white my-10 ml-5"
      >
        Services
      </motion.h1>
      <BentoGridDemo />
    </div>
  );
};

export default Services;
