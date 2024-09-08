import classNames from "classnames";
import { AiOutlineLoading } from "react-icons/ai";

type Props = {
  isLoading: boolean;
};

const LoadingSpinner = ({ isLoading }: Props) => {
  const containerClass = classNames({
    "w-full h-full": true,
    "flex flex-col bg-black/25": true,
    "items-center justify-center": true,
    "space-y-2": true,
    "transition-all": true,
    "duration-300": true,
    "rounded-lg": true,
    "opacity-0": !isLoading,
    "opacity-100": isLoading,
    "z-0": !isLoading,
    "z-20": isLoading,
    absoulte: true,
  });

  return (
    <div className={containerClass}>
      <AiOutlineLoading className="animate-spin text-sky-500 text-2xl" />
    </div>
  );
};

export default LoadingSpinner;
