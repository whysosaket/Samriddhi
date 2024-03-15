import {motion} from 'framer-motion'
import React from 'react';

interface JoinFundQRProps {
    imgurl: string;
    setShowQR?: React.Dispatch<React.SetStateAction<boolean>>;
}

const JoinFundQR:React.FunctionComponent<JoinFundQRProps> = ({imgurl, setShowQR}) => {
  return (
    <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="bg-black/30 rounded-lg  p-8">
        <h2 className="font-bold text-xl text-neutral-200 my-4 text-center">
          Scan the QR code
        </h2>
        <div className='bg-white rounded-2xl flex justify-center'>
        <img src={imgurl} alt="QR Code" className='w-96 h-96' />
        </div>
        <p className="text-sm max-w-sm mt-2 dark:text-neutral-300 text-center">
          to join the fund.
        </p>
        {setShowQR&&<div className="py-10 text-center">
            <button
              onClick={() => setShowQR && setShowQR(false)}
              className="px-12 bg-orange-600 hover:bg-orange-500 text-white font-semibold py-3"
            >
              Close
            </button>
        </div>}
    </motion.div>
  )
}

export default JoinFundQR