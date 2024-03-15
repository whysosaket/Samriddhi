import { createContext, useState, useEffect } from "react";
const AuthContext = createContext<any>({});
import { toast } from "react-toastify";
let url = import.meta.env.VITE_URL;

const AuthState = (props: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const toastMessage = (message: string, type: string) => {
    if (type === "success") toast.success(message);
    else if (type === "error") toast.error(message);
    else if (type === "warning") toast.warning(message);
    else toast.info(message);
  };

  useEffect(() => {
    setTimeout(() => {
      checkAuthenticated();
    }, 1000);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${url}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (data.success) {
        localStorage.setItem("auth-token", data.authtoken);
        setIsAuthenticated(true);
        toastMessage("Logged in Successfully", "success");
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

  const signup = async (name: string, email: string, phone: string, password: string, annualIncome: number) => {
    try {
      const response = await fetch(`${url}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, phone, password, annualIncome }),
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

  const logout = () => {
    localStorage.removeItem("auth-token");
    setIsAuthenticated(false);
    toastMessage("Logged out Successfully", "success");
  };

  const checkAuthenticated = async () => {
    if (
      localStorage.getItem("auth-token") === null ||
      localStorage.getItem("auth-token") === undefined ||
      localStorage.getItem("auth-token") === ""
    ) {
      return;
    }
    try {
      const response = await fetch(`${url}/api/auth/getuser`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token") || "",
        },
      });

      const data = await response.json();
      console.log(data);
      if (data.success) {
        setIsAuthenticated(true);
        return true;
      } else {
        setIsAuthenticated(false);
        localStorage.removeItem("token");
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ toastMessage, login, logout, isAuthenticated, signup }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
export { AuthState };
