import { AiOutlineClose } from "react-icons/ai";
import { useModals } from "../../router";
import Button from "./Button";
import { useCallback } from "react";

type Props = {
  children: React.ReactNode;
};

const Modal = ({ children }: Props) => {
  const modals = useModals();

  const onClose = useCallback(() => {
    modals.close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fixed w-screen h-screen z-10 inset-0 bg-black/25 flex items-center justify-center">
      <div className="absolute inset-0 z-[-1]" onClick={onClose}></div>
      <div className="flex flex-col space-y-4 w-[80vw] md:w-[65vw] bg-white p-5 rounded-lg relative">
        <div className="absolute top-5 right-5 z-[1]">
          <Button className="aspect-square" onClick={onClose}>
            <AiOutlineClose />
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
