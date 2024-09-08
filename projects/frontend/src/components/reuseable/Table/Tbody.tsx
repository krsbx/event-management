import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLTableSectionElement>;

const Tbody = ({ children, ...props }: Props) => {
  return <tbody {...props}>{children}</tbody>;
};

export default Tbody;
