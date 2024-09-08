import classNames from "classnames";
import { ThHTMLAttributes } from "react";

type Props = ThHTMLAttributes<HTMLTableCellElement>;

const Th = ({ children, className = "", ...props }: Props) => {
  const thClass = classNames({
    "px-6 py-3": true,
    [className]: !!className,
  });

  return (
    <th className={thClass} {...props}>
      {children}
    </th>
  );
};

export default Th;
