import { forwardRef } from "react";
import Dropdown, { Props as DropdownProps } from "./Dropdown";
import Label, { Props as LabelProps } from "./Label";

type Props = DropdownProps & LabelProps;

const DropdownWithLabel = forwardRef<HTMLSelectElement, Props>(
  ({ className, ...props }, ref) => {
    return (
      <div className="flex flex-col space-y-1">
        <Label
          label={props.label}
          htmlFor={props.id}
          required={props.required}
          className={className}
        />
        <Dropdown {...props} ref={ref} />
      </div>
    );
  },
);

export default DropdownWithLabel;
