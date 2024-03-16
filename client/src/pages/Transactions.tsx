import { useEffect, useState, useContext } from "react"
import FundContext from "@/context/FundContext"
import {motion} from "framer-motion"

const Transactions = () => {
    const { getTransactions } = useContext(FundContext);
    const [transactions, setTransactions] = useState<any[]>([]);

    
    useEffect(() => {
        const fetchTransactions = async () => {
            const transactions = await getTransactions();
            if (transactions) {
                setTransactions(transactions);
            }
        }
        fetchTransactions();
    }, [])

    const convertDate = (date: string) => {
        const d = new Date(date);
        return d.toDateString();
    }

    return (
        <div className="mt-8 md:px-8 quando">
            <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-semibold text-white">Transactions</motion.h1>
            <div>
                {transactions.length > 0 ? (
                    <motion.table
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="table-auto w-full mt-8 border-collapse">
                        <thead>
                            <tr className="bg-gray-800 text-white">
                                <th className="p-2 text-left">Date</th>
                                <th className="p-2 text-left">To</th>
                                <th className="p-2 text-left">Type</th>
                                <th className="p-2 text-left">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((transaction, index) => (
                                <motion.tr
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.5+index * 0.1 }}
                                key={index} className="bg-white/5 my-2 border-b border-gray-300">
                                    <td className="p-2">{convertDate(transaction.created)}</td>
                                    <td className="p-2">{transaction.fund ? transaction.fund.name : transaction.to.name} {transaction.to && (transaction.to._id == transaction.by._id) && "(Self)"}</td>
                                    <td className="p-2">{transaction.type}</td>
                                    <td className="p-2">₹{transaction.amount}</td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </motion.table>
                ) : (
                    <h1 className="text-white">No Transactions Found</h1>
                )}
            </div>
        </div>
    )
}

export default Transactions;
