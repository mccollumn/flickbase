import { Navigate, useLocation } from "react-router-dom";

const PreventSignin = (props: {
  users: { auth: boolean };
  children: unknown;
}) => {
  const location = useLocation();

  return (
    <>
      {props.users.auth ? (
        <Navigate to="/dashboard" state={{ from: location }} replace />
      ) : (
        props.children
      )}
    </>
  );
};

export default PreventSignin;
