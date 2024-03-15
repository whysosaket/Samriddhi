import { createContext } from "react";
const LoanContext = createContext<any>({});
import { toast } from "react-toastify";
let url = import.meta.env.VITE_URL;

const LoanState = (props: any) => {

  const toastMessage = (message: string, type: string) => {
    if (type === "success") toast.success(message);
    else if (type === "error") toast.error(message);
    else if (type === "warning") toast.warning(message);
    else toast.info(message);
  };

  const getInterest = async (amount: number, duration: number, interest: number) => {
        
    try {
      const response = await fetch(`${url}/api/loan/interest`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token") || ""
        },
        body: JSON.stringify({ amount, duration, interest }),
      });

      const data = await response.json();
      if (data.success) {
        toastMessage(data.info, "success");
        return data.interest;
      } else {
        toastMessage(data.error, "error");
        return false;
      }
    } catch (error) {
      console.log(error);
      toastMessage("Something went wrong!", "error");
    }
  }

  const getLoans = async () => {
    try {
      const response = await fetch(`${url}/api/loan/get`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token") || ""
        }
      });

      const data = await response.json();
      if (data.success) {
        toastMessage(data.info, "success");
        return data.loans;
      } else {
        toastMessage(data.error, "error");
        return false;
      }
    } catch (error) {
      console.log(error);
      toastMessage("Something went wrong!", "error");
    }
  }

  return (
    <LoanContext.Provider value={{ toastMessage, getInterest, getLoans  }}>
      {props.children}
    </LoanContext.Provider>
  );
};

export default LoanContext;

export { LoanState };