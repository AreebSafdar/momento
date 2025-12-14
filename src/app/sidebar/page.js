'use client';
import * as React from 'react';
import {
  Stack, Typography, Avatar, Link,
   Box, Dialog, DialogTitle, List, ListItem,
  ListItemButton, ListItemAvatar, ListItemText,
   Avatar as MuiAvatar, keyframes, IconButton, useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  HomeOutlined, Menu, WidgetsOutlined,
   Search, MessageOutlined,FavoriteBorder,
    AddCircleOutline, RadioOutlined, ExploreOutlined,
  Settings, Logout, BookmarkBorder, Brightness4, ReportProblemOutlined,
} from '@mui/icons-material';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import {
  openMoreDialog,
  closeMoreDialog,
  openCreateDialog,
  closeCreateDialog,
} from '../../redux/uiSlice';
import CustomizedDialogs from '../components/CustomizedDialogs';
import { toggleTheme } from '@/redux/uiSlice';
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

export default function Sidebar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { moreDialogOpen, createDialogOpen } = useSelector(state => state.ui);
  
  const themeMode = useSelector(state => state.ui.theme);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  React.useEffect(() => {
    console.log(moreDialogOpen, createDialogOpen)
  }, [])

  const navigationItems = [
    { name: "Home", path: "/", icon: <HomeOutlined /> },
    { name: "Search", path: "/search", icon: <Search /> },
    { name: "Explore", path: "/explore", icon: <ExploreOutlined /> },
    { name: "Reels", path: "/reels", icon: <RadioOutlined /> },
    { name: "Messages", path: "/messages", icon: <MessageOutlined /> },
    { name: "Notifications", path: "/notification", icon: <FavoriteBorder /> },
    { name: "Create", path: null, icon: <AddCircleOutline />, action:() => dispatch(openCreateDialog())},
    { name: "Profile", path: "/profile", icon: <Avatar sx={{color: 'pink',backgroundColor: 'black',}}/> },
  ];

  const moreOptions = [
    { text: 'Settings', path:"/setting", icon: <Settings/>},
    { text: 'Saved', icon: <BookmarkBorder/>},
    { text: "Switch appearance",
  action: () => {
    console.log("Sidebar: dispatching toggleTheme()");
    dispatch(toggleTheme());
    console.log("Sidebar: dispatched toggleTheme()");
  },
  icon: <Brightness4 /> },
    // { text: 'Switch appearance', action: () => dispatch(toggleTheme()), icon: <Brightness4 /> },
    { text: 'Report a problem', icon: <ReportProblemOutlined /> },
    { text: 'Log out', icon: <Logout />, color: 'red' },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      {!isMobile ? (
        <Stack
          sx={{
            width: 250,
           color:"text.primary",
            position: 'fixed',
            height: '100%',
            overflow: 'auto',
            p: 2,
            boxShadow: 3,
            fontFamily: 'Lato, sans-serif',
          }}
        >
          {/* Logo */}

      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          textTransform: "uppercase",
          background: "linear-gradient(90deg, #e841cf, #f093ce)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontFamily: "Impact",
        }}
      >
        <img src="https://media.istockphoto.com/id/921427336/vector/initial-hand-drawn-letter-m.
        jpg?s=612x612&w=0&k=20&c=A3vgYFzdXa3jOHQQhnA3HucOFzTRmRDnlxOGLPl8Qd8=" alt="meta" width={28} />
        Momento
        </Typography>

        {/* Navigation */}
        {navigationItems.map(({ name, path, icon, action }, index) => (
          <Link
            key={index}
            underline="none"
            onClick={() => (action ? action() : router.push(path))}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              color: "text.primary",
              p: 1.5,
              borderRadius: 2,
              "&:hover": { backgroundColor: "action.hover", color: "primary.main" },
              cursor: "pointer",
            }}
          >
            {icon}
            <Typography variant="body2" fontWeight={500}>
              {name}
            </Typography>
          </Link>
        ))}

        {/* More */}
        <Box
          onClick={() => dispatch(openMoreDialog())}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            mt: 20,
            p: 1,
            color: "text.primary",
            cursor: 'pointer',
          }}
        >
          <Menu />
          <Typography variant="body1">More</Typography>
        </Box>
        <Link key="/try">
         <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            mt: 1,
            p: 1,
            color: "text.primary",
            cursor: 'pointer',
          }}
        >
          <WidgetsOutlinedIcon />
          <Typography variant="body1">Also From Meta</Typography>
        </Box>
        </Link>
        </Stack>
      ) : null}
  
      {/* Mobile Bottom Bar */}
      {isMobile ? (
        <Box
          sx={{
            position: 'fixed',
            left: 0,
            right: 0,
            bottom: 0,
            height: 64,
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            bgcolor: 'background.paper',
            boxShadow: 3,
            zIndex: 1300,
          }}
        >
          {navigationItems.map(({ name, path, icon, action }, idx) => (
            <IconButton
              key={idx}
              onClick={() => (action ? action() : router.push(path))}
              size="large"
              color="inherit"
              aria-label={name}
            >
              {icon}
            </IconButton>
          ))}
          <IconButton onClick={() => dispatch(openMoreDialog())} color="inherit">
            <Menu />
          </IconButton>
        </Box>
      ) : null}

      {/* More Dialog */}
      <Dialog onClose={() => dispatch(closeMoreDialog())} open={moreDialogOpen}>
        <DialogTitle>Create</DialogTitle>
        <List sx={{ pt: 0 }}>
          {moreOptions.map((option) => (
            <ListItem disablePadding key={option.text}>
              <ListItemButton
            onClick={() => {
              console.log(option)
              if (option.action){
                 option.action();   
              dispatch(closeMoreDialog())
              } else {
                router.push(option.path)
              }
            }}
          >
              {/* <ListItemButton onClick={() => dispatch(closeMoreDialog())}> */}
                <ListItemAvatar>
                  <MuiAvatar
                  sx={{
                    bgcolor: "transparent",
                    color: option.color || "inherit",
                    "&:hover": {
                      color: themeMode === "light" ? "#ff9800" : "#fff176",
                      transition: "color 0.3s ease",
                    },
                  }}
                >
                  {option.icon}
                </MuiAvatar>

                </ListItemAvatar>
                <ListItemText
                  primary={option.text}
                  primaryTypographyProps={{
                    sx: { color: option.color || 'black', fontWeight: option.color ? 'bold' : 'normal' },
                  }}

                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Dialog>
      {/* Create Dialog */}
      <CustomizedDialogs
        open={createDialogOpen}
        handleClose={() => dispatch(closeCreateDialog())}
      />
    </>
  );
}


