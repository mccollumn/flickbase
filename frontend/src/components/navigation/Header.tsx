import { useEffect } from "react";
import { Link } from "react-router-dom";
import SideDrawer from "./SideNavigation";
import { useDispatch, useSelector } from "react-redux";
import { clearNotifications } from "../../store/reducers/notifications";
import { RootState } from "../../store";
import { showToast } from "../../utils/tools";

const Header = () => {
  const users = useSelector((state: RootState) => state.users);
  const notifications = useSelector((state: RootState) => state.notifications);
  const dispatch = useDispatch();

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

  return (
    <>
      <nav className="navbar fixed-top">
        <Link
          to="/"
          className="navbar-brand d-flex align-items-center fredoka_ff"
        >
          Flickbase
        </Link>
        <SideDrawer users={users} />
      </nav>
    </>
  );
};

export default Header;
