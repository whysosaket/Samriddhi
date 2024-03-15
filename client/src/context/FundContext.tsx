import { createContext, useState } from "react";
const FundContext = createContext<any>({});
import { toast } from "react-toastify";
let url = import.meta.env.VITE_URL;

const FundState = (props: any) => {
  const toastMessage = (message: string, type: string) => {
    if (type === "success") toast.success(message);
    else if (type === "error") toast.error(message);
    else if (type === "warning") toast.warning(message);
    else toast.info(message);
  };

  const createFund = async (name: string, generalInterest: number) => {
    try {
      const response = await fetch(`${url}/api/fund/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token") || ""
        },
        body: JSON.stringify({ name, generalInterest }),
      });

      const data = await response.json();
      if (data.success) {
        toastMessage(data.info, "success");
        console.log(data);
        return data.imgurl;
      } else {
        toastMessage(data.error, "error");
        return false;
      }
    } catch (error) {
      console.log(error);
      toastMessage("Something went wrong!", "error");
    }
  };

  const joinFund = async (fundId: string) => {
    try {
      const response = await fetch(`${url}/api/fund/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token") || ""
        },
        body: JSON.stringify({ fundId }),
      });

      const data = await response.json();
      if (data.success) {
        toastMessage(data.info, "success");
        return true;
      } else {
        toastMessage(data.error, "error");
        return false;
      }
    } catch (error) {
      console.log(error);
      toastMessage("Something went wrong!", "error");
    }
  };

  const getFunds = async () => {
    try {
      const response = await fetch(`${url}/api/fund/myfunds`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token") || ""
        },
      });

      const data = await response.json();
      if (data.success) {
        return data.funds;
      } else {
        toastMessage(data.error, "error");
        return false;
      }
    } catch (error) {
      console.log(error);
      toastMessage("Something went wrong!", "error");
    }
  }

  const getFundQR = async (fundId: string) => {
    try {
      const response = await fetch(`${url}/api/fund/getqr`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token") || ""
        },
        body: JSON.stringify({ fundId }),
      });

      const data = await response.json();
      if (data.success) {
        return data.imgurl;
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
    <FundContext.Provider value={{ toastMessage, createFund, joinFund, getFunds,getFundQR }}>
      {props.children}
    </FundContext.Provider>
  );
};

export default FundContext;
export { FundState };
