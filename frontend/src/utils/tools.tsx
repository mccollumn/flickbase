import CircularProgress from "@mui/material/CircularProgress";
import { FormikErrors, FormikTouched } from "formik";

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
