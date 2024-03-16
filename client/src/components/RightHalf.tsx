import { Link } from "react-router-dom";
import { CardBody, CardContainer, CardItem } from "@/ui/Card3D";
import { useNavigate } from "react-router-dom";

export function RightHalf() {
  const navigate = useNavigate();

  const gotoAI = () => {
    navigate("/ai");
  };

  return (
    <CardContainer className="inter-var z-10 -mt-12">
      <CardBody className="relative group/card  hover:shadow-2xl hover:shadow-emerald-500/[0.1] bg-black/20 border-white/[0.2] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          We have AI for you
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          Integrate AI into your financial choices and make better decisions.
        </CardItem>
        <CardItem
          translateZ="100"
          rotateX={20}
          rotateZ={-10}
          className="w-full mt-4"
        >
          <img
            src="https://previews.123rf.com/images/peshkov/peshkov1906/peshkov190600808/124848745-creative-circuit-head-outline-on-orange-background-ai-and-software-concept-3d-rendering.jpg"
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div className="flex justify-between items-center mt-20">
          <CardItem
            translateZ={20}
            translateX={-40}
            as="button"
            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
          >
            <span onClick={gotoAI}>Try now →</span>
          </CardItem>
          <CardItem
            translateZ={20}
            translateX={40}
            as="button"
            className="px-4 py-2 rounded-xl bg-orange-500 hover:scale-125 hover:bg-orange-700  text-white text-xs font-bold"
          >
            <Link to="/signup">Signup</Link>
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
