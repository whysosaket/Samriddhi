import React from "react";
import { Label } from "@/ui/Label";
import { Input } from "@/ui/Input";
import { cn } from "@/utils/cn";
import { useContext, useRef, useState } from "react";
import { appName } from "@/data";
import GlobalContext from "@/context/GlobalContext";
import { motion } from "framer-motion";
import JoinFundQR from "./JoinFundQR";
import FundContext from "@/context/FundContext";

const CreateFundForm = () => {
  const fundNameRef = useRef<HTMLInputElement>(null);
  const generalInterestRef = useRef<HTMLInputElement>(null);
  const {setLoading, toastMessage} = useContext(GlobalContext);
  const [imageurl, setImageurl] = useState("");
  const [created, setCreated] = useState(false);
  const {createFund} = useContext(FundContext);

  const handleSubmit = async () => {
    const fundName = fundNameRef.current?.value;
    const generalInterest = generalInterestRef.current?.value;

    // checking if the fields are empty
    if (!fundName || !generalInterest) {
      toastMessage("Please fill all the fields", "error");
      return;
    }
    setLoading(true);
    const response = await createFund(fundName, generalInterest);
   if(response){
        setImageurl(response);
   }

    setTimeout(() => {
        setLoading(false);
        toastMessage("Fund created successfully", "success");
        setCreated(true);
        }, 2000);
  };
  return (
    <>{created?<JoinFundQR imgurl={imageurl} />:
    <motion.div
    initial={{ opacity: 0, x: -100 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6 }}
    className="md:w-2/3 md:px-16 my-auto">
      <div className="w-full rounded-none md:rounded-2xl p-10 shadow-input bg-black/50">
        <h2 className="font-bold text-xl text-neutral-200">
          {created?"Join":"Create"} a {appName} Fund
        </h2>
        <p className="text-sm max-w-sm mt-2 dark:text-neutral-300">
          Create Fund. Start earning now.
        </p>

        <div className="my-8">
          <LabelInputContainer className="mb-4">
            <Label htmlFor="fundname">Fund Name</Label>
            <Input
              ref={fundNameRef}
              id="fundname"
              placeholder="Varanasi Fund 5"
              type="text"
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">General Interest</Label>
            <Input
              ref={generalInterestRef}
              id="password"
              placeholder="2.5"
              type="number"
            />
          </LabelInputContainer>

          <button
            onClick={handleSubmit}
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          >
            Create Fund &rarr;
            <BottomGradient />
          </button>
        </div>
      </div>
    </motion.div>}
    </>
  );
};

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

export default CreateFundForm;
