import React, {useContext, useRef, useState, useEffect } from "react";
import { Label } from "@/ui/Label";
import { Input } from "@/ui/Input";
import { cn } from "@/utils/cn";
// import { useNavigate } from "react-router-dom";
import { appName } from "@/data";
// import AuthContext from "@/context/AuthContext";
import FundContext from "@/context/FundContext";

export function LoanFormDemo() {
  // const navigate = useNavigate();

  const [funds, setFunds] = useState([]);
  const { getFunds} = useContext(FundContext);

  const amountRef = useRef<HTMLInputElement>(null);
  const interestRef = useRef<HTMLInputElement>(null);
  const durationRef = useRef<HTMLInputElement>(null);
  const fundRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    const fetchFunds = async () => {
      const funds = await getFunds();
      setFunds(funds);
    };
    fetchFunds();
  }, []);

  // const {requestLoan, getFunds} = useContext(FundContext);

  const handleSubmit = async () => {
    
  };
  return (
    <div className="w-full px-16 my-auto">
      <div className="w-full rounded-none md:rounded-2xl p-10 shadow-input bg-black/50">
        <div className="flex justify-between">
        <div>
        <h2 className="font-bold text-xl text-neutral-200">
          Welcome to {appName}
        </h2>
        <p className="text-sm max-w-sm mt-2 dark:text-neutral-300">
          Get a quick loan from {appName}. Continue your earning journey.
        </p>
        </div>
        <div>
          <button className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-20 text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] hover:bg-slate-600">
            Get Info
          </button>
        </div>
        </div>
      

        <div className="my-8">
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Amount</Label>
            <Input
              ref={amountRef}
              id="email"
              placeholder="₹1000"
              type="number"
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Duration</Label>
            <Input
              ref={durationRef}
              id="email"
              placeholder="5 Months"
              type="number"
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Interest</Label>
            <Input
              ref={interestRef}
              id="email"
              placeholder="10%"
              type="number"
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Fund</Label>
            <select
              ref={fundRef}
              className="text-sm text-white bg-white/10 rounded-l leading-5 py-2 px-3 placeholder-gray-400 w-full border border-transparent focus:border-orange-300 focus:ring-0"
              >
                {
                  funds.map((fund) => (
                    // @ts-ignore
                    <option key={fund.id} value={fund.id}>{fund.name}</option>
                  ))
                }
              </select>
          </LabelInputContainer>

          <button
            onClick={handleSubmit}
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          >
            Request Loan &rarr;
            <BottomGradient />
          </button>

        </div>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
