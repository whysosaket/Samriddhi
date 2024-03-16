import { BentoGrid, BentoGridItem } from "@/ui/bento-grid";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";

import _1 from "@/assets/1.jpg";
import _2 from "@/assets/2.jpg";
import _3 from "@/assets/3.jpg";
import _4 from "@/assets/4.jpg";
import _5 from "@/assets/5.jpg";
import _6 from "@/assets/6.jpg";
import _7 from "@/assets/7.jpg";


export function BentoGridDemo() {
  return (
    <BentoGrid className="max-w-full mx-auto">
      {items.map((item, i) => (
        <BentoGridItem
          itemNumber={i}
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          icon={item.icon}
          link={item.link || "/"}
          className={i === 3 || i === 6 ? "md:col-span-2" : ""}
        />
      ))}
    </BentoGrid>
  );
}
interface SkeletonProps {
  img: any;
}
const Skeleton:React.FunctionComponent<SkeletonProps> = ({img}) => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] opacity-50 rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100">
    <img src={img} alt="skeleton" className="w-full h-full" />
  </div>
);
const items = [
  {
    title: "Loan Management",
    description:
      "Access flexible loans tailored to your needs with low interest rates and easy repayment options.",
    header: <Skeleton img={_1} />,
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
    link: "/loans",
  },
  {
    title: "Government Schemes",
    description:
      "Explore and apply for government schemes and grants with ease and transparency.",
    header: <Skeleton img={_2} />,
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
    link: "/government",
  },
  {
    title: "Digital Payments",
    description:
      "Make quick and secure payments using phone numbers without the need for a smartphone.",
    header: <Skeleton img={_3} />,
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
    link: "/payments",
  },
  {
    title: "Deposit Management",
    description:
      "Effortlessly deposit and manage funds with transparent processes and real-time updates.",
    header: <Skeleton img={_4} />,
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
    link: "/deposit",
  },
  {
    title: "Withdrawal Options",
    description:
      "Access your funds anytime, anywhere with convenient withdrawal options and instant processing.",
    header: <Skeleton img={_5} />,
    icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
    link: "/withdraw",
  },
  {
    title: "Future Investments",
    description:
      "Explore investment opportunities and grow your wealth with expert guidance and personalized strategies.",
    header: <Skeleton img={_6} />,
    icon: <IconBoxAlignTopLeft className="h-4 w-4 text-neutral-500" />,
    link: "/investments",
  },
  {
    title: "Fund Management",
    description:
      "Efficiently manage community funds with transparency, accountability, and fair distribution practices.",
    header: <Skeleton img={_7} />,
    icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
    link: "/funds",
  },
];
