import classNames from "classnames";

export type Props = {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

const LeftRightWrapper = ({
  leftIcon,
  children,
  rightIcon,
  className = "",
}: Props) => {
  const containerClass = classNames({
    "w-full flex relative": true,
    [className]: !!className,
  });

  return (
    <div className={containerClass}>
      {leftIcon && (
        <div className="items-center absolute inset-y-0 pl-3.5 left-0 z-50 top-1/2 -translate-y-1/2">
          {leftIcon}
        </div>
      )}
      {children}
      {rightIcon && (
        <div className="items-center absolute inset-y-0 pr-3.5 right-0 z-50 top-1/2 -translate-y-1/2">
          {rightIcon}
        </div>
      )}
    </div>
  );
};

export default LeftRightWrapper;
