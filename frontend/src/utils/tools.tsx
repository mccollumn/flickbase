import CircularProgress from "@mui/material/CircularProgress";
import { FormikErrors, FormikTouched } from "formik";
import { toast } from "react-toastify";

interface Formik {
  errors: FormikErrors<{ [key: string]: string }>;
  touched: FormikTouched<{ [key: string]: string }>;
}

export const errorHelper = (formik: Formik, values: string) => ({
  error: formik.errors[values] && formik.touched[values] ? true : false,
  helperText:
    formik.errors[values] && formik.touched[values]
      ? formik.errors[values]
      : null,
});

export const Loader = () => (
  <div className="root_loader">
    <CircularProgress />
  </div>
);

export const showToast = (msg: string, type: string) => {
  switch (type) {
    case "ERROR":
      toast.error(msg, { position: "bottom-right" });
      break;
    case "SUCCESS":
      toast.success(msg, { position: "bottom-right" });
      break;
    default:
      return false;
  }
};
