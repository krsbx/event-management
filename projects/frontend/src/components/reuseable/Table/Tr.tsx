import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLTableRowElement>;

const Tr = ({ children, ...props }: Props) => {
  return <tr {...props}>{children}</tr>;
};

export default Tr;
