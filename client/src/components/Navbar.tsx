import { GiSesame } from "react-icons/gi";
import {motion} from "framer-motion";


const Navbar = () => {
  return (
    <motion.nav
    initial={{y: -200, opacity: 0}}
    animate={{y: 0, opacity: 1}}
    transition={{duration: 1.2}}
    className="flex quando justify-between">
        <div className="flex align-middle ">
            <GiSesame size={30} className="text-primary my-auto" />
            <h1 className="my-auto ml-2">Samriddhi</h1>
        </div>
        <div className="flex align-middle">
            <div className="flex align-middle mx-4 my-auto">
                <ul className="flex my-auto">
                    <li className="mx-4">Home</li>
                    <li className="mx-4">About</li>
                    <li className="mx-4">Contact</li>
                </ul>
            </div>
            <button className="bg-primary hover:bg-[#e37655] text-black px-8 py-2 rounded-lg mx-4 my-auto">Login</button>
        </div>
    </motion.nav>
  )
}

export default Navbar