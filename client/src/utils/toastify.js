import { toast } from "react-toastify";

const toastError = ({
  status = 404,
  response = { statusText: "Not Found" },
}) => {
  const msg = response.data ? response.data.message : response.statusText;
  toast.error(`Error ${status}: ${msg}`, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

const toastSuccess = (msg) => {
  toast.success(msg, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

export { toastError, toastSuccess };
