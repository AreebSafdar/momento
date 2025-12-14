'use client';

import React, { useState } from 'react';
import {
  Box,
  Stack,
  Typography,
  Switch,
  Button,
  Avatar,
  Divider,
  Paper,
  useMediaQuery,
  TextField,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SecurityIcon from '@mui/icons-material/Security';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Settings() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [profileSettings, setProfileSettings] = useState({
    username: 'john_doe',
    email: 'john@example.com',
    bio: 'Instagram lover',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80',
  });

  const [notifications, setNotifications] = useState({
    pushNotifications: true,
    emailNotifications: false,
    messageNotifications: true,
  });

  const [privacy, setPrivacy] = useState({
    isPrivate: false,
    allowComments: true,
    allowMessages: true,
  });

  const handleProfileChange = (field, value) => {
    setProfileSettings({ ...profileSettings, [field]: value });
  };

  const handleNotificationChange = (field) => {
    setNotifications({ ...notifications, [field]: !notifications[field] });
  };

  const handlePrivacyChange = (field) => {
    setPrivacy({ ...privacy, [field]: !privacy[field] });
  };

  const SettingItem = ({ icon: Icon, title, description, action }) => (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 2,
        mb: 1,
        bgcolor: 'background.paper',
        borderRadius: 1,
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Icon sx={{ color: 'primary.main' }} />
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {description}
          </Typography>
        </Box>
      </Box>
      {action}
    </Box>
  );

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        p: isMobile ? 2 : 4,
        ml: isMobile ? 0 : 30,
        mb: isMobile ? 8 : 0,
      }}
    >
      <Stack spacing={4} sx={{ maxWidth: 600, mx: 'auto' }}>
        {/* Header */}
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
            Settings
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Manage your account and preferences
          </Typography>
        </Box>

        {/* Profile Section */}
        <Paper elevation={0} sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
            <PersonIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Profile
          </Typography>
          <Divider sx={{ mb: 2 }} />

          {/* Avatar Section */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Avatar src={profileSettings.avatar} sx={{ width: 60, height: 60 }} />
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                Profile Picture
              </Typography>
              <Button variant="outlined" size="small">
                Change
              </Button>
            </Box>
          </Box>

          {/* Username */}
          <TextField
            fullWidth
            label="Username"
            value={profileSettings.username}
            onChange={(e) => handleProfileChange('username', e.target.value)}
            variant="outlined"
            size="small"
            sx={{ mb: 2 }}
          />

          {/* Email */}
          <TextField
            fullWidth
            label="Email"
            value={profileSettings.email}
            onChange={(e) => handleProfileChange('email', e.target.value)}
            variant="outlined"
            size="small"
            sx={{ mb: 2 }}
          />

          {/* Bio */}
          <TextField
            fullWidth
            label="Bio"
            value={profileSettings.bio}
            onChange={(e) => handleProfileChange('bio', e.target.value)}
            variant="outlined"
            size="small"
            multiline
            rows={3}
            sx={{ mb: 2 }}
          />

          <Button variant="contained" fullWidth>
            Save Changes
          </Button>
        </Paper>

        {/* Notifications Section */}
        <Paper elevation={0} sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
            <NotificationsIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Notifications
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <SettingItem
            icon={NotificationsIcon}
            title="Push Notifications"
            description="Receive alerts on your device"
            action={
              <Switch
                checked={notifications.pushNotifications}
                onChange={() => handleNotificationChange('pushNotifications')}
              />
            }
          />

          <SettingItem
            icon={NotificationsIcon}
            title="Email Notifications"
            description="Receive updates via email"
            action={
              <Switch
                checked={notifications.emailNotifications}
                onChange={() => handleNotificationChange('emailNotifications')}
              />
            }
          />

          <SettingItem
            icon={NotificationsIcon}
            title="Message Notifications"
            description="Get alerts for direct messages"
            action={
              <Switch
                checked={notifications.messageNotifications}
                onChange={() => handleNotificationChange('messageNotifications')}
              />
            }
          />
        </Paper>

        {/* Privacy Section */}
        <Paper elevation={0} sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
            <SecurityIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Privacy & Security
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <SettingItem
            icon={SecurityIcon}
            title="Private Account"
            description="Only approved followers can see your content"
            action={
              <Switch checked={privacy.isPrivate} onChange={() => handlePrivacyChange('isPrivate')} />
            }
          />

          <SettingItem
            icon={SecurityIcon}
            title="Allow Comments"
            description="Let others comment on your posts"
            action={
              <Switch
                checked={privacy.allowComments}
                onChange={() => handlePrivacyChange('allowComments')}
              />
            }
          />

          <SettingItem
            icon={SecurityIcon}
            title="Allow Direct Messages"
            description="Accept messages from anyone"
            action={
              <Switch
                checked={privacy.allowMessages}
                onChange={() => handlePrivacyChange('allowMessages')}
              />
            }
          />

          <Button variant="outlined" fullWidth sx={{ mt: 2 }}>
            Change Password
          </Button>
        </Paper>

        {/* Account Section */}
        <Paper elevation={0} sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2, border: '1px solid error.main' }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: 'error.main' }}>
            <LogoutIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Account
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Button variant="outlined" fullWidth color="error" sx={{ mb: 1 }}>
            Log Out
          </Button>

          <Button variant="outlined" fullWidth color="error">
            Delete Account
          </Button>
        </Paper>

        {/* Bottom Spacing for Mobile */}
        {isMobile && <Box sx={{ mb: 4 }} />}
      </Stack>
    </Box>
  );
}

// 'use client';

// import React, { useState } from "react";
// import {
//   Box,
//   Avatar,
//   Typography,
//   Grid,
//   TextField,
//   Button,
//   IconButton,
//   List,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Switch,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Divider,
//   Paper,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import SettingsIcon from "@mui/icons-material/Settings";
// import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
// import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
// import LockOpenIcon from "@mui/icons-material/LockOpen";
// import StarBorderIcon from "@mui/icons-material/StarBorder";
// import BlockIcon from "@mui/icons-material/Block";



// export default function EditProfilePage() {
//   const [username, setUsername] = useState("itz.adiiies");
//   const [website, setWebsite] = useState("https://www.tiktok.com/@adiiies8");
//   const [bio, setBio] = useState("");
//   const [showThreadsBadge, setShowThreadsBadge] = useState(false);
//   const [gender, setGender] = useState("female");
//   const [avatarSrc, setAvatarSrc] = useState(
//     "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80"
//   );

//   const onUploadAvatar = (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     const url = URL.createObjectURL(file);
//     setAvatarSrc(url);
//   };

//   const handleSave = () => {
//     // Hook this up to your API
//     console.log({ username, website, bio, showThreadsBadge, gender });
//     alert("Profile saved (demo)");
//   };

//   return (
//     <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.paper", ml:35}}>
//       {/* SIDEBAR */}
//       <Box
//         component={Paper}
//         elevation={0}
//         sx={{ width: 300, p: 3, borderRight: 1, borderColor: "divider" }}
//       >
//                 <img src="/momento-logo.png" alt="Momento Logo" style={{ width: 32, height: 32 }} />
//         <Typography variant="h6" sx={{ fontWeight: "bold" }}>Momento</Typography>
//         </Box>
//         <Typography variant="h6" sx={{ mb: 2 }}>
//           Settings
//         </Typography>

//         <Paper variant="outlined" sx={{ p: 2, mb: 3, borderRadius: 2 }}>
//           <Typography variant="subtitle2" sx={{ display: "flex", gap: 1, alignItems: "center" }}>
//             <img src="https://upload.wikimedia.org/wikipedia/commons/5/58/Instagram-Icon.png" alt="meta" width={18} />
//             Meta
//           </Typography>
//           <Typography variant="body2" sx={{ mt: 1 }}>
//             Accounts Centre
//           </Typography>
//         </Paper>

//         <Typography variant="caption" sx={{ color: "text.secondary" }}>
//           How you use Momento
//         </Typography>

//         <List>
//           <ListItemButton selected sx={{ borderRadius: 1, mt: 1 }}>
//             <ListItemIcon>
//               <PersonOutlineIcon />
//             </ListItemIcon>
//             <ListItemText primary="Edit Profile" />
//           </ListItemButton>

//           <ListItemButton sx={{ borderRadius: 1, mt: 1 }}>
//             <ListItemIcon>
//               <NotificationsNoneIcon />
//             </ListItemIcon>
//             <ListItemText primary="Notifications" />
//           </ListItemButton>

//           <Divider sx={{ my: 2 }} />

//           <Typography variant="caption" sx={{ color: "text.secondary", pl: 1 }}>
//             Who can see your content
//           </Typography>

//           <ListItemButton sx={{ borderRadius: 1, mt: 1 }}>
//             <ListItemIcon>
//               <LockOpenIcon />
//             </ListItemIcon>
//             <ListItemText primary="Account privacy" />
//           </ListItemButton>

//           <ListItemButton sx={{ borderRadius: 1, mt: 1 }}>
//             <ListItemIcon>
//               <StarBorderIcon />
//             </ListItemIcon>
//             <ListItemText primary="Close Friends" />
//           </ListItemButton>

//           <ListItemButton sx={{ borderRadius: 1, mt: 1 }}>
//             <ListItemIcon>
//               <BlockIcon />
//             </ListItemIcon>
//             <ListItemText primary="Blocked" />
//           </ListItemButton>
//         </List>
//       </Box>
//       <Box sx={{ flex: 1, p: { xs: 2, md: 6 } }}>
//         <Typography variant="h5" sx={{ mb: 4, textAlign: "center" }}>
//           Edit Profile
//         </Typography>

//         <Grid container spacing={4} justifyContent="center">
//           <Grid item xs={12} md={10}>
//             <Paper variant="outlined" sx={{ p: 4, borderRadius: 2 }}>
//               <Grid container spacing={3} alignItems="center">
//                 <Grid item>
//                   <Avatar
//                     src={avatarSrc}
//                     sx={{ width: 64, height: 64, borderRadius: 2, mr: 2 }}
//                   />
//                 </Grid>

//                 <Grid item xs>
//                   <Typography sx={{ fontWeight: 700 }}>{username}</Typography>
//                   <Typography variant="body2" sx={{ color: "text.secondary" }}>
//                     Change your profile photo
//                   </Typography>
//                 </Grid>

//                 <Grid item>
//                   <Button variant="contained" component="label">
//                     Change photo
//                     <input hidden accept="image/*" type="file" onChange={onUploadAvatar} />
//                   </Button>
//                 </Grid>
//               </Grid>

//               {/* FORM */}
//               <Box sx={{ mt: 4 }}>
//                 <Grid container spacing={3}>
//                   <Grid item xs={12} md={10}>
//                     <TextField
//                       fullWidth
//                       label="Username"
//                       value={username}
//                       onChange={(e) => setUsername(e.target.value)}
//                     />
//                   </Grid>

//                   <Grid item xs={12} md={10}>
//                     <TextField
//                       fullWidth
//                       label="Website"
//                       value={website}
//                       onChange={(e) => setWebsite(e.target.value)}
//                     />
//                     <Typography variant="caption" sx={{ color: "text.secondary" }}>
//                       Editing your links is only available on mobile. Visit the Momento app and edit your
//                       profile to change the websites in your bio.
//                     </Typography>
//                   </Grid>

//                   <Grid item xs={12} md={10}>
//                     <TextField
//                       fullWidth
//                       multiline
//                       rows={4}
//                       label="Bio"
//                       value={bio}
//                       onChange={(e) => setBio(e.target.value)}
//                       helperText={`${bio.length} / 150`}
//                     />
//                   </Grid>

//                   <Grid item xs={12} md={10}>
//                     <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2, borderRadius: 2, border: 1, borderColor: "divider" }}>
//                       <Typography>Show Moments badge</Typography>
//                       <Switch checked={showThreadsBadge} onChange={(e) => setShowThreadsBadge(e.target.checked)} />
//                     </Box>
//                   </Grid>

//                   <Grid item xs={12} md={10}>
//                     <FormControl fullWidth>
//                       <InputLabel id="gender-label">Gender</InputLabel>
//                       <Select
//                         labelId="gender-label"
//                         value={gender}
//                         label="Gender"
//                         onChange={(e) => setGender(e.target.value)}
//                       >
//                         <MenuItem value="female">Female</MenuItem>
//                         <MenuItem value="male">Male</MenuItem>
//                         <MenuItem value="prefer_not">Prefer not to say</MenuItem>
//                       </Select>
//                     </FormControl>
//                   </Grid>

//                   <Grid item xs={12} md={10} sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
//                     <Button variant="outlined">Cancel</Button>
//                     <Button variant="contained" onClick={handleSave}>Save</Button>
//                   </Grid>
//                 </Grid>
//               </Box>
//             </Paper>
//           </Grid>
//         </Grid>
//       </Box>
//     </Box>
//   );
// }
