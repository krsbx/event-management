import classNames from "classnames";
import React from "react";

export type Props = {
  label: string;
  htmlFor?: string;
  className?: string;
  containerClass?: string;
  textColor?: string;
  tooltip?: string;
  required?: boolean;
  children?: React.ReactNode;
};

const Label = ({
  label,
  textColor,
  className = "",
  htmlFor,
  tooltip,
  children,
  required,
  containerClass: _containerClass = "",
}: Props) => {
  const labelClass = classNames({
    [textColor ?? "text-gray-700"]: true,
    "block text-sm": true,
    [className]: true,
  });
  const containerClass = classNames({
    "flex w-full space-x-1": true,
    [_containerClass]: true,
  });

  return (
    <div className={containerClass}>
      <label className={labelClass} htmlFor={htmlFor} title={tooltip}>
        {label}
        {children}
      </label>
      {required && <span className="text-red-500">*</span>}
    </div>
  );
};

export default Label;
