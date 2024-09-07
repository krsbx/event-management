import classNames from "classnames";
import React, { forwardRef } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import LeftRightWrapper, { Props as WrapperProps } from "./LeftRightWrappers";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> &
  Omit<WrapperProps, "children"> & {
    uppercase?: boolean;
    small?: boolean;
    isLoading?: boolean;
  };

const Button = forwardRef<HTMLButtonElement, Props>(
  (
    {
      className = "",
      uppercase,
      small,
      disabled,
      children,
      isLoading,
      ...props
    },
    ref,
  ) => {
    const buttonClass = classNames({
      // Normal State
      "px-[0.625rem]": true,
      "py-1.5": true,
      "rounded-lg": true,
      uppercase: uppercase,
      "w-full": true,
      "text-sm": !small,
      "text-xs": small,
      "bg-gray-100": disabled,
      "bg-white": !disabled,
      border: true,
      "font-medium": true,

      // Focus state
      "focus:ring-sky-500": true,
      "focus:border-sky-500": true,
      "focus:outline-sky-500": true,

      // Hover state
      "hover:border-blue-400": true,

      // Transition
      "transition duration-300 ease-in-out": true,

      // Custom
      [className]: !!className,
    });

    const childrenClass = classNames({
      "w-full": true,
      "opacity-0": isLoading,
    });

    const loadingClass = classNames({
      "w-full": true,
      "opacity-0": !isLoading,
      absolute: true,
      "left-1/2": true,
      "top-1/2": true,
      "-translate-x-1/2": true,
      "-translate-y-1/2": true,
      "text-gray-700": true,
      flex: true,
      "items-center": true,
      "justify-center": true,
    });

    return (
      <LeftRightWrapper>
        <button className={buttonClass} {...props} ref={ref}>
          <div className="flex relative">
            <div className={childrenClass}>{children}</div>
            <div>
              {isLoading && (
                <div className={loadingClass}>
                  <AiOutlineLoading className="animate-spin" />
                </div>
              )}
            </div>
          </div>
        </button>
      </LeftRightWrapper>
    );
  },
);

export default Button;
