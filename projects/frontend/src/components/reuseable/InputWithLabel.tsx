import { forwardRef } from "react";
import Input, { Props as InputProps } from "./Input";
import Label, { Props as LabelProps } from "./Label";

type Props = InputProps & LabelProps;

const InputWithLabel = forwardRef<HTMLInputElement, Props>(
  ({ className, ...props }, ref) => {
    return (
      <div className="flex flex-col space-y-1">
        <Label
          label={props.label}
          htmlFor={props.id}
          required={props.required}
          className={className}
        />
        <Input {...props} ref={ref} />
      </div>
    );
  },
);

InputWithLabel.displayName = "InputWithLabel";

export default InputWithLabel;
