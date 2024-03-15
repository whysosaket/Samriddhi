import {motion} from 'framer-motion'

const JoinFundQR = () => {
  return (
    <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="bg-black/10 rounded-lg  p-8">
        <h2 className="font-bold text-xl text-neutral-200 my-4 text-center">
          Scan the QR code
        </h2>
        <div className='bg-white flex justify-center'>
        <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg" alt="QR Code" />
        </div>
        <p className="text-sm max-w-sm mt-2 dark:text-neutral-300 text-center">
          to join the fund.
        </p>
        
    </motion.div>
  )
}

export default JoinFundQR