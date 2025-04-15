import { FormikErrors, FormikTouched } from "formik";
import { toast } from "react-toastify";
import cookie from "react-cookies";

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

export const getTokenCookie = () => {
  return cookie.load("x-access-token");
};

export const removeTokenCookie = () => {
  cookie.remove("x-access-token", { path: "/" });
};

export const getAuthHeader = () => {
  return {
    headers: {
      Authorization: `Bearer ${getTokenCookie()}`,
    },
  };
};
