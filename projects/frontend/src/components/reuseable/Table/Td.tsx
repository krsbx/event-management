import classNames from "classnames";
import { TdHTMLAttributes } from "react";

type Props = TdHTMLAttributes<HTMLTableCellElement>;

const Td = ({ children, className = "", ...props }: Props) => {
  const tdClass = classNames({
    "px-6 py-4": true,
    [className]: !!className,
  });

  return (
    <td className={tdClass} {...props}>
      {children}
    </td>
  );
};

export default Td;
