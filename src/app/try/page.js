'use client';

import * as React from 'react';
import {
  Stack,
  Typography,
  Avatar,
  Link as MuiLink,
  Box,
  Link,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Avatar as MuiAvatar,
  IconButton,
} from '@mui/material';
import {
  HomeOutlined,
  Menu,
  WidgetsOutlined,
  Search,
  MessageOutlined,
  FavoriteBorder,
  AddCircleOutline,
  RadioOutlined,
  ExploreOutlined,
  Settings,
  Logout,
  BookmarkBorder,
  Brightness4,
  ReportProblemOutlined,
} from '@mui/icons-material';

const person = { avatar: '/avatar.png' };

export default function Sidebar() {
  const [open, setOpen] = React.useState(false);

  const handleOpenMore = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // extra options shown in "More" dialog
  const moreOptions = [
    { text: 'Settings', icon: <Settings /> },
    { text: 'Saved', icon: <BookmarkBorder /> },
    { text: 'Switch appearance', icon: <Brightness4 /> },
    { text: 'Report a problem', icon: <ReportProblemOutlined /> },
    { text: 'Log out', icon: <Logout />, color: 'red' },
  ];

  return (
    <>
      {/* Sidebar */}
      <Stack sx={{ margin: 0, fontFamily: 'Lato, sans-serif' }}>
        <Stack
          sx={{
            width: 250,
            backgroundColor: 'white',
            position: 'fixed',
            height: '100%',
            overflow: 'auto',
            p: 2,
            boxShadow: 3,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              display: 'block',
              p: 1,
              color: '#f08be4',
              fontFamily: 'fantasy',
            }}
          >
            Momento
          </Typography>

          {/* Sidebar Links */}
          <Link href="/home" underline="none" sx={{ display: 'block', p: 1, color: 'black', mt: 3, fontSize: 15 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
              <HomeOutlined />
              <Typography variant="body1">Home</Typography>
            </Box>
          </Link>

          <Link href="/search" underline="none" sx={{ display: 'block', p: 1, color: 'black' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
              <Search />
              <Typography variant="body1">Search</Typography>
            </Box>
          </Link>

          <Link href="/explore" underline="none" sx={{ display: 'block', p: 1, color: 'black' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
              <ExploreOutlined />
              <Typography variant="body1">Explore</Typography>
            </Box>
          </Link>

          <Link href="/reels" underline="none" sx={{ display: 'block', p: 1, color: 'black' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
              <RadioOutlined />
              <Typography variant="body1">Reels</Typography>
            </Box>
          </Link>

          <Link href="/messages" underline="none" sx={{ display: 'block', p: 1, color: 'black' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
              <MessageOutlined />
              <Typography variant="body1">Messages</Typography>
            </Box>
          </Link>

          <Link href="/notification" underline="none" sx={{ display: 'block', p: 1, color: 'black' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
              <FavoriteBorder />
              <Typography variant="body1">Notifications</Typography>
            </Box>
          </Link>

          <Link href="/create" underline="none" sx={{ display: 'block', p: 1, color: 'black' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
              <AddCircleOutline />
              <Typography variant="body1">Create</Typography>
            </Box>
          </Link>

          <Link href="/profile" underline="none" sx={{ display: 'block', p: 1, color: 'black' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
              <Avatar src={person.avatar} sx={{ width: 25, height: 25 }} />
              <Typography variant="body1">Profile</Typography>
            </Box>
          </Link>

          {/* More button */}
          <Box
            onClick={handleOpenMore}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              mt: 20,
              p: 1,
              color: 'black',
              cursor: 'pointer',
            }}
          >
            <Menu />
            <Typography variant="body1">More</Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
            <WidgetsOutlined />
            <Typography variant="body1">Also from Meta</Typography>
          </Box>
        </Stack>
      </Stack>

      {/* More Dialog */}
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>More Options</DialogTitle>
        <List sx={{ pt: 0 }}>
          {moreOptions.map((option) => (
            <ListItem disablePadding key={option.text}>
              <ListItemButton onClick={handleClose}>
                <ListItemAvatar>
                  <MuiAvatar sx={{ bgcolor: 'transparent', color: option.color || 'black' }}>
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
    </>
  );
}
