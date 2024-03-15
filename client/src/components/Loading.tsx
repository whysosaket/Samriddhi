import { useContext } from "react";
import GlobalContext from "@/context/GlobalContext";
const Loading = () => {
  const { loading } = useContext(GlobalContext);
  return (
    <>
      {loading ? (
        <div className="absolute bg-black/50 w-full h-screen">
          <div className="absolute top-[45%] left-[45%] flex justify-center items-center z-50">
            <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-orange-500" />
            <img
              src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg"
              className="rounded-full h-28 w-28"
            />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Loading;
