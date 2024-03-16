import React from "react";
import { Label } from "@/ui/Label";
import { Input } from "@/ui/Input";
import { cn } from "@/utils/cn";
import { Link } from "react-router-dom";
import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { appName } from "@/data";
import AuthContext from "@/context/AuthContext";

export function SignupFormDemo() {

  const navigate = useNavigate();

  const {signup} = useContext(AuthContext);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const fullnameRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const annualIncomeRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const fullname = fullnameRef.current?.value;
    const phoneNumber = phoneNumberRef.current?.value;
    const annualIncome = annualIncomeRef.current?.value;
    const success = await signup(fullname, email, phoneNumber, password, annualIncome);
    if (success) {
      navigate("/login");
    }
  };
  return (
    <div className="w-full md:px-16 px-4 my-auto">
      <div className="w-full rounded-none md:rounded-2xl p-10 shadow-input bg-black/50">
        <h2 className="font-bold text-xl text-neutral-200">
          Welcome to {appName}
        </h2>
        <p className="text-sm max-w-sm mt-2 dark:text-neutral-300">
          Sign up to {appName}. Start earning now.
        </p>

        <div className="my-8">
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="firstname">Full name</Label>
              <Input
                ref={fullnameRef}
                id="fullname"
                placeholder="Tyler"
                type="text"
              />
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              ref={emailRef}
              id="email"
              placeholder="projectmayhem@fc.com"
              type="email"
            />
          </LabelInputContainer>
          <div className="flex">
          <LabelInputContainer className="mb-4 w-1/2 mr-4">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                ref={phoneNumberRef}
                id="phoneNumber"
                placeholder="9999999999"
                type="text"
                />
            </LabelInputContainer>
          <LabelInputContainer className="mb-4 w-1/2">
            <Label htmlFor="password">Password</Label>
            <Input
              ref={passwordRef}
              id="password"
              placeholder="••••••••"
              type="password"
            />
          </LabelInputContainer>
      
          </div>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Annual Income</Label>
            <Input
              ref={annualIncomeRef}
              id="email"
              placeholder="10000"
              type="number"
            />
          </LabelInputContainer>
          <button
            onClick={handleSubmit}
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          >
            Sign up &rarr;
            <BottomGradient />
          </button>
          <p className="text-xs text-neutral-300 mt-4">
            By signing up, you agree to our{" "}
            <a href="#" className="text-orange-500">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-orange-500">
              Privacy Policy
            </a>
            .
          </p>
          <p className="text-xs text-neutral-300 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-orange-500">
              Log in
            </Link>
          </p>
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