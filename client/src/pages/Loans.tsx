import { Link } from "react-router-dom"
import { FaLaptopHouse } from "react-icons/fa";


const Loans = () => {
  return (
    <div className="mt-8 quando w-full">
      <div className="w-full flex justify-between align-middle">
      <h1 className="text-3xl font-semibold my-auto">My Loans</h1>
      <Link to="/getloan" className="bg-primary hover:bg-orange-700 text-white p-4 rounded-full my-auto">
        <FaLaptopHouse size={30} className="my-auto" />
      </Link>
      </div>
      
    </div>
  )
}

export default Loans