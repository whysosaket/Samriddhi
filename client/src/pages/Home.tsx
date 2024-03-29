import Card1 from "@/components/Home/Card1";
import Card2 from "@/components/Home/Card2";
import Stroke from "@/assets/stroke.png";
import { BsArrowRight } from "react-icons/bs";
import Background from "@/components/Home/Background";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="my-4 flex md:flex-row flex-col">
      <motion.div
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="md:w-3/5 w-full"
      >
        <div className="-mb-10 quando">
          <img className="w-[12rem] fill-white transparent" src={Stroke} />
          <h1 className="text-primary relative left-12 bottom-24 text-[2.5rem]">
            Hey!
          </h1>
        </div>
        <div className="md:text-[5rem] text-[2.5rem] ml-10 quando">
          <motion.h1
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0 }}
          >
            Let's start
            <BsArrowRight className="text-secondary inline ml-6" />
          </motion.h1>
          <motion.h1
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.1 }}
          >
            something big
          </motion.h1>
          <motion.h1
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            together
          </motion.h1>
        </div>
        <motion.div
          initial={{ y: 200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0 }}
          className="w-full flex mt-12 ml-10 overflow-hidden "
        >
          <div className="md:w-1/3 flex align-middle">
            <h1 className="text-5xl my-auto">3</h1>
            <div className="my-auto ml-3 text-gray-400">
              <h1 className="text-sm">Years of</h1>
              <h1 className="text-sm">Experience</h1>
            </div>
          </div>
          <div className="md:w-1/3 flex align-middle">
            <h1 className="text-5xl my-auto">5M</h1>
            <div className="my-auto ml-3 text-gray-400">
              <h1 className="text-sm">Users</h1>
              <h1 className="text-sm">Served</h1>
            </div>
          </div>
        </motion.div>
      </motion.div>
      <div className="md:w-2/5 max-w-screen overflow-hidde">
        <Background />
        <div className="mt-48 z-50">
          <motion.div
          initial={{ x: 500, opacity: 0 }}
          animate={{ x: 0, opacity: 1, rotate: [40, 8]}}
          transition={{ duration: 1, delay: 0 }}
          className="absolute rotate-[8deg] ml-10">
            <Card1 />
          </motion.div>
        </div>
        <div className="mt-[28rem]">
          <motion.div
          initial={{ y: 500, opacity: 0 }}
          animate={{ y: 0, opacity: 1, rotate: [-40, -8] }}
          transition={{ duration: 1, delay: 0 }}
          className="absolute rotate-[-6deg] ml-10">
            <Card2 />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;
