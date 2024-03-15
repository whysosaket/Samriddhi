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
          className={i === 3 || i === 6 ? "md:col-span-2" : ""}
        />
      ))}
    </BentoGrid>
  );
}
const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] opacity-50 rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);
const items = [
    {
      title: "Loan Management",
      description: "Access flexible loans tailored to your needs with low interest rates and easy repayment options.",
      header: <Skeleton />,
      icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Insurance Coverage",
      description: "Secure your future with comprehensive insurance plans designed to protect you and your loved ones.",
      header: <Skeleton />,
      icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Digital Payments",
      description: "Make quick and secure payments using phone numbers without the need for a smartphone.",
      header: <Skeleton />,
      icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Deposit Management",
      description: "Effortlessly deposit and manage funds with transparent processes and real-time updates.",
      header: <Skeleton />,
      icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Withdrawal Options",
      description: "Access your funds anytime, anywhere with convenient withdrawal options and instant processing.",
      header: <Skeleton />,
      icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Future Investments",
      description: "Explore investment opportunities and grow your wealth with expert guidance and personalized strategies.",
      header: <Skeleton />,
      icon: <IconBoxAlignTopLeft className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Fund Management",
      description: "Efficiently manage community funds with transparency, accountability, and fair distribution practices.",
      header: <Skeleton />,
      icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
    },
  ];
  
