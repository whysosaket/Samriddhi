import MeChat from "./MeChat";
import TheyChat from "./TheyChat";
import { GoPaperclip } from "react-icons/go";
import { HiOutlineFaceSmile } from "react-icons/hi2";
import { FaTelegramPlane } from "react-icons/fa";

const ChatInterface = () => {
  return (
    <>
      <div className="flex h-96 antialiased text-gray-800">
        <div className="flex flex-row h-full w-full overflow-x-hidden">
          <div className="flex flex-col flex-auto h-full py-6">
            <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100/10 h-full p-4">
              <div className="flex flex-col h-full overflow-x-auto mb-4">
                <div className="flex flex-col h-full">
                  <div className="grid grid-cols-12 gap-y-2">
                    <TheyChat />
                    <MeChat />
                  </div>
                </div>
              </div>
              <div className="flex flex-row items-center h-16 rounded-xl bg-white/10 w-full px-4">
                <div>
                  <button className="flex items-center justify-center text-gray-400 hover:text-gray-100">
                    <GoPaperclip size={25} />
                  </button>
                </div>
                <div className="flex-grow ml-4">
                  <div className="relative w-full">
                    <input
                      type="text"
                      className="flex w-full border rounded-xl focus:outline-none bg-white/10 focus:border-indigo-300 pl-4 h-10"
                    />
                    <button className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
                      <HiOutlineFaceSmile size={30} />
                    </button>
                  </div>
                </div>
                <div className="ml-4">
                  <button className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0">
                    <span>Send</span>
                    <span className="ml-2">
                      <FaTelegramPlane size={25} />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatInterface;
