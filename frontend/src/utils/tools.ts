import { FormikProps } from "formik";
import { toast } from "react-toastify";
import cookie from "react-cookies";

export const errorHelper = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: FormikProps<any>,
  values: string
) => {
  const error = formik.errors[values];
  const touched = formik.touched[values];
  return {
    error: error && touched ? true : false,
    helperText:
      error && touched
        ? typeof error === "string"
          ? error
          : "Invalid value"
        : null,
  };
};

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
