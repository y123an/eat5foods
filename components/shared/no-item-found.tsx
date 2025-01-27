import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  heading?: string;
  message: string;
  buttonText?: string;
  link?: string;
  icon?: ReactNode;
}

const NoItemComponent = ({
  heading,
  message,
  link,
  buttonText,
  icon,
}: Props) => {
  return (
    <div className="flex flex-col items-center justify-center mx-auto w-full min-h-[80vh] p-4 text-center">
      {icon && icon} {/* Render icon if provided */}
      <div className="w-full space-y-4">
        <h2 className="text-3xl font-bold">{heading}</h2>
        <p className="text-gray-500 mb-3 dark:text-gray-400">{message}</p>
        {buttonText && (
          <Link href={link || "#"}>
            <Button className="w-1/2" size="default">
              {buttonText}
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default NoItemComponent;
