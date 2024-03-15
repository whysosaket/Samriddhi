import CreateFundForm from '@/components/funds/CreateFundForm'
import {motion} from 'framer-motion'

const CreateFund = () => {
  return (
    <div className="px-5">
    <motion.h1
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-4xl font-bold quando text-start text-white my-10"
      >
        Create Fund
      </motion.h1>
      <div className='flex justify-center'>
      <CreateFundForm />
      </div>
    </div>
  )
}

export default CreateFund