import { toast } from "react-toastify";

const successToast = (message: string) => {
  toast.success(message);
};

const errorToast = (message: string) => {
  toast.error(message);
};

export { errorToast, successToast };
