import { LoanFormDemo } from '@/components/loan/LoanForm'
import {motion} from 'framer-motion'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RequestLoan = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    if(localStorage.getItem('auth-token') == null) navigate('/login');
  }, []);
  return (
    <motion.div
    initial={{ opacity: 0, y: -180 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
    className='mt-16 md:w-3/4 mx-auto'
    >
    <LoanFormDemo />
    </motion.div>
  )
}

export default RequestLoan