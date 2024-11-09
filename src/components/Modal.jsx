import useOutsideClick from "@/hooks/outSideClick";
import { IoMdClose } from "react-icons/io";

const Modal = ({ title, onClose, children }) => {
  const ModalRef = useOutsideClick(() => {
    onClose();
  });
  return (
    <div className="bg-zinc-900/10 backdrop-blur-sm fixed inset-0 z-[100]">
      <div
        ref={ModalRef}
        className="fixed drop-shadow-lg border border-zinc-700 top-[50%] left-[50%] max-h-[90%] h-auto md:h-auto md:max-h-[85vh] w-[90%] md:w-[90vw] md:max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-zinc-700 p-4"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">{title}</h2>
          <button
            className="hover:bg-zinc-600 text-zinc-300 hover:text-white  h-[25px] w-[25px] flex items-center justify-center rounded-full focus:outline-none"
            onClick={onClose}
          >
            <IoMdClose />
          </button>
        </div>
        <div className="py-2 flex items-center justify-center h-full">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
