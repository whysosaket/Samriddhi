import { SiStardock } from "react-icons/si";
import { SiStarbucks } from "react-icons/si";
import { BsStars } from "react-icons/bs";
import { SiStartrek } from "react-icons/si";
import { motion } from "framer-motion";

const Background = () => {
  return (
    <div className="w-[35rem] h-[43rem] absolute opacity-20 mt-10 -z-10">
      <motion.div
        initial={{ y: -200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="flex"
      >
        <SiStardock size={200} className="text-primary my-auto" />
        <BsStars size={50} className="text-secondary/70 my-auto ml-10 mt-24" />
      </motion.div>
      <motion.div
          initial={{y: 200, opacity: 0}}
          animate={{y: 0, opacity: 1}}
          transition={{duration: 1.2}}
      className="absolute bottom-20 right-20 flex justify-between w-full">
        <SiStarbucks size={60} className="text-secondary my-auto ml-40 mb-10" />
        <SiStartrek size={90} className="text-primary my-auto mr-10" />
      </motion.div>
    </div>
  );
};

export default Background;
