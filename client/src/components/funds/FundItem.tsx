import React from "react";

interface FundItemProps {
  fund: any;
}

const FundItem: React.FunctionComponent<FundItemProps> = ({ fund }) => {
  return (
    <div className="bg-white/10 shadow-lg rounded-lg p-4 m-4">
      <h1>
        <span className="text-xl font-bold text-white">Fund {fund}</span>
      </h1>
      <p className="text-gray-300 text-sm">This is a fund item</p>
      <h1>
        <span className="text-xs font-semibold text-gray-400">
          Balance: ₹1000
        </span>
      </h1>
      <div className="flex justify-end">
        <button className="bg-primary text-black p-2 rounded-lg mt-2">
          View Fund
        </button>
      </div>
    </div>
  );
};

export default FundItem;
