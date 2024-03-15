import { motion } from "framer-motion";

const Success = () => {
  return (
    <>
    {/* component */}
    <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1}}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-gray-100/0">
      <div className="bg-black/40 p-6 md:w-1/4 mt-40  md:mx-auto">
        <svg
          viewBox="0 0 24 24"
          className="text-green-600 w-16 h-16 mx-auto my-6"
        >
          <path
            fill="currentColor"
            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
          ></path>
        </svg>
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-100 font-semibold text-center">
            Successfully Joined Fund
          </h3>
          <p className="text-gray-600 my-2">
            Thank you for joining our fund. You can now start earning.
          </p>
          <p> Have a great day!</p>
          <div className="py-10 text-center">
            <a
              href="#"
              className="px-12 bg-orange-600 hover:bg-orange-500 text-white font-semibold py-3"
            >
              VIEW FUND
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  </>
  
  )
}

export default Success