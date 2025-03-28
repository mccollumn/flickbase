import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import { Divider } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DehazeIcon from "@mui/icons-material/Dehaze";
import HomeIcon from "@mui/icons-material/Home";
import MailIcon from "@mui/icons-material/Mail";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import DashboardIcon from "@mui/icons-material/Dashboard";

interface Users {
  auth: boolean;
}

const SideDrawer = ({ users }: { users: Users }) => {
  const [state, setState] = useState(false);

  return (
    <>
      <DehazeIcon className="drawer_btn" onClick={() => setState(true)} />
      <Drawer anchor={"right"} open={state} onClose={() => setState(false)}>
        <Box sx={{ width: 200 }}>
          <List>
            <ListItemButton
              component={RouterLink}
              to="/"
              onClick={() => setState(false)}
            >
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
            <ListItemButton
              component={RouterLink}
              to="/contact"
              onClick={() => setState(false)}
            >
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary="Contact" />
            </ListItemButton>

            {!users.auth ? (
              <ListItemButton
                component={RouterLink}
                to="/auth"
                onClick={() => setState(false)}
              >
                <ListItemIcon>
                  <VpnKeyIcon />
                </ListItemIcon>
                <ListItemText primary="Sign In" />
              </ListItemButton>
            ) : (
              <ListItemButton
                onClick={() => {
                  alert("Sign out");
                }}
              >
                <ListItemIcon>
                  <VpnKeyIcon />
                </ListItemIcon>
                <ListItemText primary="Sign Out" />
              </ListItemButton>
            )}
            <Divider />

            {users.auth ? (
              <ListItemButton
                component={RouterLink}
                to="/dashboard"
                onClick={() => setState(false)}
              >
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            ) : null}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default SideDrawer;
