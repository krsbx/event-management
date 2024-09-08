import classNames from "classnames";
import { TableHTMLAttributes } from "react";
import Thead from "./Thead";
import Tbody from "./Tbody";
import Tr from "./Tr";
import Th from "./Th";
import Td from "./Td";

type Props = TableHTMLAttributes<HTMLTableElement>;

const Table = ({ children, className = "", ...props }: Props) => {
  const tableClass = classNames({
    "w-full": true,
    "text-sm": true,
    "text-left": true,
    "rtl:text-right": true,
    [className]: !!className,
  });

  return (
    <table className={tableClass} {...props}>
      {children}
    </table>
  );
};

Table.Thead = Thead;
Table.Tbody = Tbody;
Table.Th = Th;
Table.Tr = Tr;
Table.Td = Td;

export default Table;
