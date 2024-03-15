import { createContext } from "react";
const GlobalContext = createContext<any>({});
import { toast } from "react-toastify";
// let url = import.meta.env.VITE_URL;

const GlobalState = (props: any) => {
  const toastMessage = (message: string, type: string) => {
    if (type === "success") toast.success(message);
    else if (type === "error") toast.error(message);
    else if (type === "warning") toast.warning(message);
    else toast.info(message);
  };

  return (
    <GlobalContext.Provider value={{ toastMessage }}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
export { GlobalState };
