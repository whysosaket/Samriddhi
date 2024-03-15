import { BentoGridDemo } from "@/components/services/BentoGridDemo";
import { motion } from "framer-motion";

const Services = () => {
  return (
    <div>
      <motion.h1
      initial={{ y: -200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      className="text-4xl font-bold text-center text-primary mt-10 mb-10">
        Services
      </motion.h1>
      <BentoGridDemo />
    </div>
  );
};

export default Services;
