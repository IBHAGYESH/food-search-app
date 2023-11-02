import { useLocation, Outlet, useNavigate, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import {
  AppBar,
  Box,
  Drawer,
  Fab,
  Fade,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  useScrollTrigger,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import HomeIcon from "@mui/icons-material/Home";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LogoutIcon from "@mui/icons-material/Logout";
import useTheme from "../hooks/useTheme";

function ScrollTop(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({
        block: "center",
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Fade>
  );
}

/**
 * Renders Layout for all authenticated Pages
 */
export default function AuthLayout(props) {
  const { auth, setAuth } = useAuth();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [themeMode, toggle] = useTheme();
  const toggleSlider = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    localStorage.removeItem("x-app-token");
    localStorage.removeItem("x-user-id");
    setAuth({});
  };

  const toggleTheme = () => {
    toggle();
  };

  const listItems = [
    {
      listIcon: <HomeIcon />,
      listText: "Home",
      route: "/",
    },
    {
      listIcon: <BookmarkIcon />,
      listText: "Bookmarks",
      route: "/bookmarks",
    },
  ];

  const sideList = () => (
    <Box component="div" sx={{ width: 250 }}>
      <List>
        {listItems.map((listItem, index) => (
          <ListItem
            key={index}
            sx={{ width: "100%", textAlign: "center", margin: "0 auto" }}
            onClick={() => {
              navigate(listItem.route);
              toggleSlider();
            }}
          >
            <ListItemButton>
              {listItem.listIcon}
              <ListItemText primary={listItem.listText} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return auth?.id ? (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" id="back-to-top-anchor">
        <Toolbar>
          <IconButton onClick={toggleSlider} color="inherit">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" noWrap>
            Welcome {auth.name}
          </Typography>
          <Drawer open={open} anchor="left" onClose={toggleSlider}>
            {sideList()}
          </Drawer>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton onClick={toggleTheme} color="inherit">
            {themeMode === "light" ? <DarkModeIcon /> : <Brightness4Icon />}
          </IconButton>
          <IconButton onClick={handleLogout} color="inherit">
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Outlet />
      <ScrollTop {...props}>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </Box>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
