import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SideDrawer from "./SideNavigation";
import { useDispatch, useSelector } from "react-redux";
import { clearNotifications } from "../../store/reducers/notifications";
import { signOut } from "../../store/actions/users";
import { RootState, AppDispatch } from "../../store";
import { showToast } from "../../utils/tools";
import { setLayout } from "../../store/reducers/site";

const Header = () => {
  const users = useSelector((state: RootState) => state.users);
  const notifications = useSelector((state: RootState) => state.notifications);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname.split("/");
    if (pathname[1] === "dashboard") {
      dispatch(setLayout("dash_layout"));
    } else {
      dispatch(setLayout(""));
    }
  }, [location.pathname, dispatch]);

  useEffect(() => {
    const { global } = notifications;
    if (notifications && global.error) {
      const msg = global.msg ? global.msg : "An unexpected error occurred";
      showToast("ERROR", msg);
      dispatch(clearNotifications());
    }
    if (notifications && global.success) {
      const msg = global.msg ? global.msg : "Success";
      showToast("SUCCESS", msg);
      dispatch(clearNotifications());
    }
  }, [dispatch, notifications]);

  const signOutUser = () => {
    dispatch(signOut());
    navigate("/");
  };

  return (
    <>
      <nav className="navbar fixed-top">
        <Link
          to="/"
          className="navbar-brand d-flex align-items-center fredoka_ff"
        >
          Flickbase
        </Link>
        <SideDrawer users={users} signOutUser={signOutUser} />
      </nav>
    </>
  );
};

export default Header;
