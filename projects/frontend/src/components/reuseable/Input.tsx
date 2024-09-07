import React, { forwardRef } from "react";
import classNames from "classnames";
import LeftRightWrapper, { Props as WrapperProps } from "./LeftRightWrappers";
import ErrorSuccessMessage, {
  Props as ErrorSuccessMessageProps,
} from "./ErrorSuccessMessage";

export type Props = Omit<WrapperProps, "children"> &
  ErrorSuccessMessageProps &
  React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      leftIcon,
      rightIcon,
      error,
      errorMessage,
      success,
      successMessage,

      // Input Props
      disabled,
      required,
      className = "",
      ...props
    },
    ref,
  ) => {
    const inputClass = classNames({
      // Normal State
      "pl-[2.5rem]": leftIcon,
      "pl-[0.5rem]": !leftIcon,
      "pr-[2.5rem]": rightIcon,
      "pr-[0.5rem]": !rightIcon,
      "w-full": true,
      "text-sm": true,
      border: true,
      "rounded-lg": true,
      "border-blue-500": !success && !error,
      "border-green-500": success && !error,
      "border-red-500": !success && error,
      "bg-gray-100": disabled,
      "bg-white": !disabled,

      // Focus state
      "focus:ring-sky-500": true,
      "focus:border-sky-500": true,

      // Hover state
      "hover:border-blue-400": !success && !error,
      "hover:border-green-500": success && !error,
      "hover:border-red-500": !success && error,

      // Placeholder
      "placeholder:text-gray-500": true,

      // Transition
      "transition duration-300 ease-in-out": true,

      // Custom
      [className]: !!className,
    });

    return (
      <React.Fragment>
        <div className="flex flex-col">
          <LeftRightWrapper leftIcon={leftIcon} rightIcon={rightIcon}>
            <input
              className={inputClass}
              disabled={disabled}
              required={required}
              {...props}
              ref={ref}
            />
          </LeftRightWrapper>
          <ErrorSuccessMessage
            error={error}
            errorMessage={errorMessage}
            success={success}
            successMessage={successMessage}
          />
        </div>
        <style jsx={"true"}>{`
          input[type="number"]::-webkit-inner-spin-button,
          input[type="number"]::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }

          input[type="number"] {
            -moz-appearance: textfield;
          }
        `}</style>
      </React.Fragment>
    );
  },
);

Input.displayName = "Input";

export default Input;
