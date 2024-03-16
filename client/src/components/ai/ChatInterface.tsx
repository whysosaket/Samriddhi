import MeChat from "./MeChat";
import TheyChat from "./TheyChat";
import { GoPaperclip } from "react-icons/go";
import { HiOutlineFaceSmile } from "react-icons/hi2";
import { FaTelegramPlane } from "react-icons/fa";
import { useContext, useState, useRef } from "react";
import GlobalContext from "@/context/GlobalContext";

const prompt = "I am new to finance and you have to be my best friend now for what ever I ask next, answer only in one or two line. and enclose the answer within ***answer*** , also refuse to answer if it is not a finance related question.  or a greeting message.  ";

const ChatInterface = () => {

    const [myMessages, setMyMessages] = useState([]);
    const [theirMessages, setTheirMessages] = useState([]);
    const [buffer, setBuffer] = useState([]);

    const {chatbot} = useContext(GlobalContext);

    const messageRef = useRef<HTMLInputElement>(null);

   const handleSubmit = async () => {
        const message = messageRef.current?.value;
        if(!message) return;
        messageRef.current.value = '';
        // @ts-ignore
        setMyMessages([...myMessages, message]);
        // @ts-ignore
        setBuffer([...buffer, message]);
        const answer = await chatbot(prompt+message);
        if (answer) {
            const finalAnswer = answer.split('**')[1];
            // @ts-ignore
            setTheirMessages([...theirMessages, finalAnswer]);
        }
    };

  return (
    <>
      <div className="flex h-[20rem] antialiased text-gray-800">
        <div className="flex flex-row h-96 w-full overflow-x-hidden">
          <div className="flex flex-col flex-auto h-full py-6">
            <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100/10 h-full p-4">
              <div className="flex flex-col h-full overflow-x-auto mb-4">
                <div className="flex flex-col h-full">
                <TheyChat message={"Hi, how can I help you?"} />    
                    {
                        buffer.map((message, index) => {
                            return <>
                            <div key={index} className="grid grid-cols-12 gap-y-2">
                                <MeChat message={myMessages[index]} />
                                <TheyChat message={theirMessages[index]} />
                                <p className="hidden">{message}</p>
                            </div>
                            </>
                        })
                    }
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
                      ref={messageRef}

                      className="flex w-full border rounded-xl focus:outline-none text-white bg-white/10 focus:border-indigo-300 pl-4 h-10"
                    />
                    <button className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
                      <HiOutlineFaceSmile size={30} />
                    </button>
                  </div>
                </div>
                <div className="ml-4">
                  <button onClick={handleSubmit} className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0">
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
