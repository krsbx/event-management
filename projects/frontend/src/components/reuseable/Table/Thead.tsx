import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLTableSectionElement>;

const Thead = ({ children, ...props }: Props) => {
  return <thead {...props}>{children}</thead>;
};

export default Thead;
