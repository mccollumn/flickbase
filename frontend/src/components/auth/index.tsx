import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Loader } from "../../utils/tools";

type HandleSubmitProps = { email: string; password: string };

const Auth = () => {
  const [register, setRegister] = useState(false);
  const navigate = useNavigate();
  const users = useSelector((state: any) => state.users);
  const notifications = useSelector((state: any) => state.notifications);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = (values: HandleSubmitProps) => {
    if (register) {
      dispatch({ type: "REGISTER", payload: values });
    } else {
      dispatch({ type: "LOGIN", payload: values });
    }
  };

  return (
    <>
      <div className="auth_container">
        <h1>Authenticate</h1>
        {users.loading ? (
          <Loader />
        ) : (
          <Box
            sx={{
              "& .MuiTextField-root": { width: "100%", marginTop: "20px" },
            }}
            component="form"
            onSubmit={formik.handleSubmit}
          >
            form
          </Box>
        )}
      </div>
    </>
  );
};

export default Auth;
