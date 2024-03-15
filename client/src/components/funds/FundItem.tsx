import React from "react";
import { IoQrCodeOutline } from "react-icons/io5";
import JoinFundQR from "./JoinFundQR";
import { useContext } from "react";
import FundContext from "@/context/FundContext";

interface FundItemProps {
  fund: any;
}

const FundItem: React.FunctionComponent<FundItemProps> = ({ fund }) => {
  const [showQR, setShowQR] = React.useState(false);
  const [imgurl, setImgurl] = React.useState("");

  const { getFundQR } = useContext(FundContext);

  const handleQR = async () => {
    const imgurl = await getFundQR(fund._id);
    setImgurl(imgurl);
    setShowQR(true);
  };

  return (
    <>
      {showQR && 
        <div className="absolute w-screen h-screen left-0 top-0  bg-black/20">
          <div className="w-[30rem] mx-auto mt-20">
          <JoinFundQR imgurl={imgurl} setShowQR={setShowQR} />
        </div>
        </div>}
       
      
        <div className="bg-white/10 shadow-lg rounded-lg p-4 m-4">
          <h1>
            <span className="text-xl font-bold text-white">
              Fund {fund.name}
            </span>
          </h1>
          <p className="text-gray-300 text-sm">
            General Interest: ₹{fund.generalInterest}
          </p>
          <h1>
            <span className="text-xs font-semibold text-gray-400">
              Balance: ₹{fund.balance}
            </span>
          </h1>
          <div className="flex justify-between mt-8">
            <IoQrCodeOutline
              onClick={handleQR}
              className="text-white my-auto text-3xl hover:text-orange-300 cursor-pointer"
            />
            <button className="bg-primary hover:bg-orange-700 text-black p-2 rounded-lg mt-2">
              View Fund
            </button>
          </div>
        </div>
      
    </>
  );
};

export default FundItem;
