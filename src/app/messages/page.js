"use client";
import React, { useState } from "react";
import {
  Stack,
  Typography,
  Avatar,
  Box,
  InputBase,
} from "@mui/material";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import SearchIcon from "@mui/icons-material/Search";

function Sidebar() {
  // Dummy avatar
  const person = { avatar: "/avatar.png" };

  // Dummy users
  const users = [
    { name: "Adiiies", status: "Active 13h ago" },
    { name: "Sathi", status: "Active 18h ago" },
    { name: "Hanim", status: "Active 4h ago" },
    { name: "Zaniii", status: "Active 8m ago" },
    { name: "SisAaasSs", status: "7 active today" },
    { name: "Shehr Bano", status: "Sher sent an attachment .id" },
    { name: "ItZz syCo", status: "Active 20m ago" },
  ];

  const [search, setSearch] = useState("");

  // Filter users by search
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Stack sx={{ margin: 0, fontFamily: "Lato, sans-serif", ml: 8 }}>
      {/* Sidebar */}
      <Stack
        sx={{
          width: 300,
          backgroundColor: "white",
          position: "fixed",
          height: "100%",
          overflow: "auto",
          p: 2,
          boxShadow: 3,
        }}
      >
        {/* Top header */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 1 }}>
          <Typography variant="h6">
            <b>Itz.adiiies</b>
          </Typography>
          <EditCalendarIcon sx={{ ml: "auto" }} />
        </Box>

        {/* Search bar */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mt: 2,
            px: 1,
            py: 0.5,
            border: "1px solid #ccc",
            borderRadius: 2,
          }}
        >
          <SearchIcon sx={{ color: "gray" }} />
          <InputBase
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ flex: 1 }}
          />
        </Box>

        {/* Profile avatar */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2, ml: 1 }}>
          <Avatar src={person.avatar} sx={{ width: 65, height: 65 }} />
        </Box>
        <Typography
          variant="body2"
          sx={{ color: "gray", fontSize: 12, ml: 2, mt: 1 }}
        >
          Your note
        </Typography>

        {/* Messages header */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
          <Typography variant="body1">
            <b>Messages</b>
          </Typography>
          <Typography
            variant="body1"
            sx={{ ml: "auto", fontSize: 13, color: "gray" }}
          >
            <b>Requests</b>
          </Typography>
        </Box>

        {/* User list */}
        <Stack spacing={2} sx={{ mt: 2 }}>
          {filteredUsers.map((user, index) => (
            <Box
              key={index}
              sx={{ display: "flex", alignItems: "center", gap: 2 }}
            >
              <Avatar src={person.avatar} sx={{ width: 45, height: 45 }} />
              <Box>
                <Typography variant="h6" sx={{ color: "black", fontSize: 14 }}>
                  {user.name}
                </Typography>
                <Typography variant="body2" sx={{ color: "gray", fontSize: 12 }}>
                  {user.status}
                </Typography>
              </Box>
            </Box>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
}

export default Sidebar;


// "use client";
// import React, { useState } from "react";
// import {
//     Stack,
//     Typography,
//     Avatar,
//     Link as MuiLink,
//     Box,
// } from "@mui/material";
// import EditCalendarIcon from '@mui/icons-material/EditCalendar';
// import SearchIcon from "@mui/icons-material/Search";
// function Sidebar() {
//     // dummy data
//     const person = { avatar: "/avatar.png" };

//     return (
//         <Stack sx={{ margin: 0, fontFamily: "Lato, sans-serif", ml: 8 }}>
//             {/* Sidebar */}
//             <Stack
//                 sx={{
//                     width: 300,
//                     backgroundColor: "white",
//                     position: "fixed",
//                     height: "100%",
//                     overflow: "auto",
//                     p: 2,
//                 }}
//             >
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
//                     <Typography variant="h6"> <b>Itz.adiiies</b>  </Typography>
//                     < EditCalendarIcon sx={{ ml: 15 }} />
//                 </Box>
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
//                     < SearchIcon />
//                     <Typography variant="body1">Search</Typography>
//                 </Box>
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1, ml: 1 }}>
//                     <Avatar src={person.avatar} sx={{ width: 65, height: 65 }} />
//                 </Box>
//                 <Typography variant="body1" sx={{ color: 'gray', fontSize: 12, ml: 2 }}>Your note</Typography>

//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
//                     <Typography variant="body1"><b>Messages</b></Typography>
//                     <Typography variant="body1" sx={{ ml: 15, fontSize: 13, color: 'gray' }}><b>Requests</b></Typography>
//                 </Box>
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2, ml: 1 }}>
//                     <Avatar src={person.avatar} sx={{ width: 45, height: 45 }} />
//                     <Typography variant="h6" sx={{ color: 'black', fontSize: 14 }}>Adiiies<br />
//                     <Typography variant="h6" sx={{ color: 'gray', fontSize: 12 }}>Active 13h ago</Typography>
//                     </Typography>
//                 </Box>
//                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2, ml: 1 }}>
//                     <Avatar src={person.avatar} sx={{ width: 45, height: 45 }} />
//                     <Typography variant="h6" sx={{ color: 'black', fontSize: 14 }}>sathi<br />
//                     <Typography variant="h6" sx={{ color: 'gray', fontSize: 12 }}>Active 18h ago</Typography>
//                     </Typography>
//                 </Box>
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2, ml: 1 }}>
//                     <Avatar src={person.avatar} sx={{ width: 45, height: 45 }} />
//                     <Typography variant="h6" sx={{ color: 'black', fontSize: 14 }}>Hanim<br />
//                     <Typography variant="h6" sx={{ color: 'gray', fontSize: 12 }}>Active 4h ago</Typography>
//                     </Typography>
//                 </Box>
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2, ml: 1 }}>
//                     <Avatar src={person.avatar} sx={{ width: 45, height: 45 }} />
//                     <Typography variant="h6" sx={{ color: 'black', fontSize: 14 }}>Zaniii<br />
//                     <Typography variant="h6" sx={{ color: 'gray', fontSize: 12 }}>Active 8m ago</Typography>
//                     </Typography>
//                 </Box>
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2, ml: 1 }}>
//                     <Avatar src={person.avatar} sx={{ width: 45, height: 45 }} />
//                     <Typography variant="h6" sx={{ color: 'black', fontSize: 14 }}>SisAaasSs<br />
//                     <Typography variant="h6" sx={{ color: 'gray', fontSize: 12 }}>7 active today</Typography>
//                     </Typography>
//                 </Box>
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2, ml: 1 }}>
//                     <Avatar src={person.avatar} sx={{ width: 45, height: 45 }} />
//                     <Typography variant="h6" sx={{ color: 'black', fontSize: 14 }}>Shehr Bano<br />
//                     <Typography variant="h6" sx={{ color: 'black', fontSize: 12 }}><b>Sher sent an attachment</b> .id</Typography>
//                     </Typography>
//                 </Box>
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2, ml: 1 }}>
//                     <Avatar src={person.avatar} sx={{ width: 45, height: 45 }} />
//                     <Typography variant="h6" sx={{ color: 'black', fontSize: 15 }}>ItZz syCo<br />
//                     <Typography variant="h6" sx={{ color: 'gray', fontSize: 12 }}>Active 20m ago</Typography>
//                     </Typography>
//                 </Box>






//             </Stack>
            
//         </Stack>
    
//     );
// }

// export default Sidebar;


