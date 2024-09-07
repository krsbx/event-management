import classNames from "classnames";

export type Props = {
  error?: boolean;
  errorMessage?: string;
  success?: boolean;
  successMessage?: string;
};

const ErrorSuccessMessage = ({
  error,
  errorMessage,
  success,
  successMessage,
}: Props) => {
  if (!success && !error) return null;
  if (!successMessage && !errorMessage) return null;

  const textClass = classNames({
    "mt-1 text-sm": true,
    "text-red-500": error,
    "text-green-500": success,
  });

  return <div className={textClass}>{successMessage || errorMessage}</div>;
};

export default ErrorSuccessMessage;
