import { motion } from "framer-motion";
import { SignupFormDemo } from "@/components/auth/SignupForm";
import { Atropos } from "atropos/react";
import SignupImage from "@/assets/signup.svg";
const animationProps = {
  initial: { x: 0, rotateY: 180, scale: 0.85 },
  animate: { x: 0, rotateY: 0, scale: 1, transition: { duration: 1.2 } },
};

const Signup = () => {
  return (
    <motion.div
      {...animationProps}
      className="pt-12 md:max-h-screen overflow-hidden md:flex"
    >
      <div className="flex justify-center align-middle md:w-1/2  hover:opacity-70">
        <Atropos
          activeOffset={70}
          shadowScale={1.05}
          onEnter={() => console.log("Enter")}
          onLeave={() => console.log("Leave")}
          onRotate={(x, y) => console.log("Rotate", x, y)}
          className="m-auto "
        >
          <img src={SignupImage} className="transform -scale-x-100 md:max-w-96 max-w-44" />
        </Atropos>
      </div>
      <div className="flex justify-center align-middle md:mt-0 mt-12">
        <SignupFormDemo />
      </div>
    </motion.div>
  );
};

export default Signup;