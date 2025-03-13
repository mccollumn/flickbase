import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "../../store";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../store/actions/users";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Loader, errorHelper } from "../../utils/tools";

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
      dispatch(registerUser(values));
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
            <TextField
              name="email"
              label="Enter your email"
              variant="outlined"
              {...formik.getFieldProps("email")}
              {...errorHelper(formik, "email")}
            />
            <TextField
              name="password"
              label="Enter your password"
              variant="outlined"
              type="password"
              {...formik.getFieldProps("password")}
              {...errorHelper(formik, "password")}
            />
            <div className="mt-2">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                size="large"
              >
                {register ? "Register" : "Login"}
              </Button>
              <Button
                className="mt-3"
                variant="outlined"
                color="secondary"
                size="small"
                onClick={() => setRegister(!register)}
              >
                Want to {!register ? "Register" : "Login"}
              </Button>
            </div>
          </Box>
        )}
      </div>
    </>
  );
};

export default Auth;
