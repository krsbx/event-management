import classNames from "classnames";
import React, { forwardRef } from "react";
import LeftRightWrapper, { Props as WrapperProps } from "./LeftRightWrappers";
import ErrorSuccessMessage, {
  Props as ErrorSuccessMessageProps,
} from "./ErrorSuccessMessage";

export type Props = Omit<WrapperProps, "children"> &
  ErrorSuccessMessageProps &
  React.InputHTMLAttributes<HTMLSelectElement> & {
    containerClass?: string;
  };

const Dropdown = forwardRef<HTMLSelectElement, Props>(
  (
    {
      leftIcon,
      rightIcon,
      error,
      errorMessage,
      success,
      successMessage,
      className = "",

      containerClass: _containerClass = "",

      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const selectClass = classNames({
      // Normal statte
      "pl-[2.5rem]": leftIcon,
      "pl-[0.5rem]": !leftIcon,
      "pr-[2.5rem]": rightIcon,
      "pr-[0.5rem]": !rightIcon,
      "h-[2.35rem]": true,
      "rounded-lg": true,
      "border-blue-500": true,
      "bg-gray-100": disabled,
      "bg-white": !disabled,
      "w-full": true,
      "text-sm": true,
      "text-ellipsis": true,

      // Focus state
      "focus:ring-sky-500": true,
      "focus:border-sky-500": true,

      // Hover state
      "hover:border-blue-400": true,

      [className]: !!className,
    });

    const containerClass = classNames({
      "flex flex-col": true,
      [_containerClass]: !!_containerClass,
    });

    const wrapperClass = rightIcon ? "no-chevron" : "";

    return (
      <React.Fragment>
        <div className={containerClass}>
          <LeftRightWrapper
            leftIcon={leftIcon}
            rightIcon={rightIcon}
            className={wrapperClass}
          >
            <select
              className={selectClass}
              disabled={disabled}
              {...props}
              ref={ref}
            >
              {!props.value && props.placeholder && (
                <option value={""}>{props.placeholder}</option>
              )}
              {children}
            </select>
          </LeftRightWrapper>
          <ErrorSuccessMessage
            error={error}
            errorMessage={errorMessage}
            success={success}
            successMessage={successMessage}
          />
        </div>
        <style jsx={"true"}>{`
          .no-chevron > select {
            /* for Firefox */
            -moz-appearance: none;
            /* for Chrome */
            -webkit-appearance: none;
          }
          .no-chevron > select::-ms-expand {
            display: none;
          }
        `}</style>
      </React.Fragment>
    );
  },
);

Dropdown.displayName = "Dropdown";

export default Dropdown;
