// import React, { useEffect, useState } from "react";
// import {
//   Avatar,
//   Box,
//   Button,
//   Grid,
//   Typography,
//   Tabs,
//   Tab,
//   IconButton,
//   Dialog,
//   DialogContent,
//   DialogTitle,
//   Divider,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import PlayArrowIcon from "@mui/icons-material/PlayArrow";
// import GridViewIcon from "@mui/icons-material/GridView";
// import MovieFilterOutlinedIcon from "@mui/icons-material/MovieFilterOutlined";
// import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
// import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
// import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

// // If you want to keep axios fetches, import configured axios
// // import axios from "../axios";

// // ------------------------------------------------------------------
// // ProfilePage (Hybrid responsive - Desktop + Mobile)
// // - 3-column grid ALWAYS (Instagram-like)
// // - Square thumbnails for posts (object-fit: cover)
// // - Tall 9:16 thumbnails for reels
// // - Hover overlay with icons and counts
// // - Reels tab shows a visual badge (play icon)
// // - Modal viewer when clicking a post
// // ------------------------------------------------------------------

// export default function ProfilePage() {
//   // data states (replace with your API calls)
//   const [user, setUser] = useState(null);
//   const [posts, setPosts] = useState([]);
//   const [value, setValue] = useState(0);

//   // Modal viewer state
//   const [open, setOpen] = useState(false);
//   const [activePost, setActivePost] = useState(null);

//   const handleChange = (event, newValue) => setValue(newValue);

//   // -------------------- Demo / Fallback data ----------------------
//   // If you already fetch posts and overview from your backend, keep your fetchOverview() and fetchUserPosts() functions
//   useEffect(() => {
//     // demo user
//     setUser({
//       id: 1,
//       username: "jane.doe",
//       avatar: "https://i.pravatar.cc/300",
//       full_name: "Jane Doe",
//       bio: "Photographer • Traveler • Foodie",
//     });

//     // demo posts (mix of regular and reel)
//     const demo = [];
//     for (let i = 1; i <= 12; i++) {
//       demo.push({
//         id: i,
//         type: i % 4 === 0 ? "reel" : "post", // every 4th is reel
//         image: `https://picsum.photos/seed/${i}/800/800`,
//         // for reels we will use tall image to simulate
//         media: [
//           {
//             file:
//               i % 4 === 0
//                 ? `https://picsum.photos/seed/reel${i}/600/1067`
//                 : `https://picsum.photos/seed/${i}/800/800`,
//           },
//         ],
//         likes: Math.floor(Math.random() * 500),
//         comments_count: Math.floor(Math.random() * 50),
//       });
//     }
//     setPosts(demo);
//   }, []);

//   // -------------------- modal handlers ---------------------------
//   const openPost = (post) => {
//     setActivePost(post);
//     setOpen(true);
//   };

//   const closePost = () => {
//     setActivePost(null);
//     setOpen(false);
//   };

//   // -------------------- helpers ---------------------------------
//   const getPrimaryImage = (post) => {
//     return (
//       post?.media?.[0]?.file || post?.image || post?.img || "https://via.placeholder.com/800"
//     );
//   };

//   // -------------------- UI --------------------------------------
//   return (
//     <Box sx={{ p: { xs: 2, md: 3 }, maxWidth: 1100, mx: "auto" }}>
//       {/* PROFILE HEADER */}
//       <Grid container spacing={2} alignItems="center">
//         <Grid item>
//           <Box sx={{ position: "relative", width: 140, height: 140 }}>
//             <Avatar
//               src={user?.avatar}
//               sx={{ width: 140, height: 140, border: "4px solid #f09433" }}
//             />
//             <IconButton
//               size="small"
//               sx={{ position: "absolute", right: -6, bottom: -6, background: "white" }}
//             >
//               <AddCircleOutlineIcon color="primary" />
//             </IconButton>
//           </Box>
//         </Grid>

//         <Grid item xs>
//           <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
//             <Typography variant="h6" sx={{ fontSize: 22 }}>
//               {user?.username || "username"}
//             </Typography>

//             <Button variant="outlined" sx={{ fontSize: 12, backgroundColor: "#f1f1f1" }}>
//               Edit Profile
//             </Button>

//             <Button variant="outlined" sx={{ fontSize: 12, backgroundColor: "#f1f1f1" }}>
//               Share Profile
//             </Button>
//           </Box>

//           <Box sx={{ mt: 1, display: "flex", gap: 4 }}>
//             <Typography>
//               <b>{posts.length}</b> Posts
//             </Typography>
//             <Typography>
//               <b>1.2k</b> Followers
//             </Typography>
//             <Typography>
//               <b>420</b> Following
//             </Typography>
//           </Box>

//           <Typography sx={{ mt: 1 }}>{user?.full_name}</Typography>
//           <Typography sx={{ color: "text.secondary" }}>{user?.bio}</Typography>
//         </Grid>
//       </Grid>

//       {/* STORY HIGHLIGHTS */}
//       <Box sx={{ mt: 4, display: "flex", gap: 2, overflowX: "auto", py: 1 }}>
//         {Array.from({ length: 8 }).map((_, i) => (
//           <Box key={i} sx={{ textAlign: "center", minWidth: 72 }}>
//             <Avatar
//               src={user?.avatar}
//               sx={{ width: 72, height: 72, border: "3px solid #f09433", mx: "auto" }}
//             />
//             <Typography variant="caption" noWrap>
//               Highlight {i + 1}
//             </Typography>
//           </Box>
//         ))}
//       </Box>

//       {/* TABS */}
//       <Box sx={{ borderBottom: 1, borderColor: "divider", mt: 3 }}>
//         <Tabs value={value} onChange={handleChange} centered>
//           <Tab icon={<GridViewIcon />} label="POSTS" />
//           <Tab icon={<MovieFilterOutlinedIcon />} label="REELS" />
//           <Tab icon={<BookmarkBorderOutlinedIcon />} label="SAVED" />
//           <Tab icon={<AssignmentIndOutlinedIcon />} label="TAGGED" />
//         </Tabs>
//       </Box>

//       {/* GRID (always 3 columns like Instagram web) */}
//       <Box sx={{ mt: 2 }}>
//         <Box
//           sx={{
//             display: "grid",
//             gridTemplateColumns: { xs: "repeat(3, 1fr)", md: "repeat(3, 1fr)" },
//             gap: 4,
//           }}
//         >
//           {posts.length > 0 ? (
//             posts
//               .filter((p) => (value === 1 ? p.type === "reel" : value === 0 ? p.type === "post" : true))
//               .map((post) => {
//                 const img = getPrimaryImage(post);
//                 const isReel = post.type === "reel";

//                 return (
//                   <Box
//                     key={post.id}
//                     onClick={() => openPost(post)}
//                     sx={{
//                       position: "relative",
//                       width: "100%",
//                       paddingBottom: isReel ? "177.78%" : "100%", // 9:16 for reels, square otherwise
//                       overflow: "hidden",
//                       cursor: "pointer",
//                       borderRadius: 0.5,
//                       "&:hover .overlay": { opacity: 1 },
//                     }}
//                   >
//                     <Box
//                       component="img"
//                       src={img}
//                       alt={`post-${post.id}`}
//                       sx={{
//                         position: "absolute",
//                         top: 0,
//                         left: 0,
//                         width: "100%",
//                         height: "100%",
//                         objectFit: "cover",
//                       }}
//                     />

//                     {/* If it's a reel, show a subtle play icon top-right */}
//                     {isReel && (
//                       <Box sx={{ position: "absolute", top: 8, right: 8, background: "rgba(0,0,0,0.45)", borderRadius: "50%", p: 0.4 }}>
//                         <PlayArrowIcon sx={{ fontSize: 18, color: "white" }} />
//                       </Box>
//                     )}

//                     {/* Hover Overlay */}
//                     <Box
//                       className="overlay"
//                       sx={{
//                         position: "absolute",
//                         inset: 0,
//                         opacity: 0,
//                         background: "rgba(0,0,0,0.45)",
//                         color: "white",
//                         display: "flex",
//                         justifyContent: "center",
//                         alignItems: "center",
//                         gap: 2,
//                         transition: "opacity .18s ease-in-out",
//                       }}
//                     >
//                       <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
//                         <FavoriteIcon sx={{ fontSize: 18 }} />
//                         <Typography>{post.likes || 0}</Typography>
//                       </Box>

//                       <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
//                         <ChatBubbleOutlineIcon sx={{ fontSize: 18 }} />
//                         <Typography>{post.comments_count || 0}</Typography>
//                       </Box>
//                     </Box>
//                   </Box>
//                 );
//               })
//           ) : (
//             <Typography sx={{ p: 2 }}>No posts yet.</Typography>
//           )}
//         </Box>
//       </Box>

//       {/* POST VIEWER MODAL (simple Instagram-like modal) */}
//       <Dialog open={open} onClose={closePost} fullWidth maxWidth="md">
//         <DialogTitle sx={{ m: 0, p: 2 }}>
//           <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//             <Typography variant="subtitle1">{user?.username}</Typography>
//             <IconButton onClick={closePost}>
//               <CloseIcon />
//             </IconButton>
//           </Box>
//         </DialogTitle>

//         <DialogContent sx={{ p: 0 }}>
//           {activePost && (
//             <Box sx={{ display: { xs: "block", md: "flex" }, minHeight: 400 }}>
//               {/* media */}
//               <Box sx={{ flex: 1, background: "black" }}>
//                 <Box
//                   component="img"
//                   src={getPrimaryImage(activePost)}
//                   alt="active"
//                   sx={{ width: "100%", height: "100%", objectFit: "contain" }}
//                 />
//               </Box>

//               {/* right panel (likes/comments) */}
//               <Box sx={{ width: { xs: "100%", md: 360 }, p: 2 }}>
//                 <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//                   <Avatar src={user?.avatar} sx={{ width: 40, height: 40 }} />
//                   <Typography>{user?.username}</Typography>
//                 </Box>

//                 <Divider sx={{ my: 2 }} />

//                 <Typography sx={{ fontWeight: 600 }}>{activePost.likes} likes</Typography>

//                 <Box sx={{ mt: 2 }}>
//                   <Typography sx={{ mb: 1, fontWeight: 700 }}>{user?.full_name}</Typography>
//                   <Typography variant="body2">This is a demo caption for this post.</Typography>
//                 </Box>

//                 <Box sx={{ mt: 2 }}>
//                   <Typography sx={{ fontWeight: 600, mb: 1 }}>Comments</Typography>
//                   <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
//                     <Avatar src={user?.avatar} sx={{ width: 32, height: 32 }} />
//                     <Typography variant="body2">Nice photo!</Typography>
//                   </Box>
//                   <Box sx={{ display: "flex", gap: 1 }}>
//                     <Avatar src={user?.avatar} sx={{ width: 32, height: 32 }} />
//                     <Typography variant="body2">Love this!</Typography>
//                   </Box>
//                 </Box>

//                 <Box sx={{ position: "absolute", bottom: 16, left: 16, right: 16 }}>
//                   <Divider sx={{ mb: 1 }} />
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                     <FavoriteIcon />
//                     <ChatBubbleOutlineIcon />
//                     <Box sx={{ flex: 1 }} />
//                     <Typography variant="caption">Add a comment...</Typography>
//                   </Box>
//                 </Box>
//               </Box>
//             </Box>
//           )}
//         </DialogContent>
//       </Dialog>
//     </Box>
//   );
// }



// // "use client";

// // import React, { useEffect, useState } from "react";
// // import {
// //   Avatar,
// //   Box,
// //   Button,
// //   Grid,
// //   Typography,
// //   Card,
// //   CardMedia,
// //   Tabs,
// //   Tab,
// //   Stack,
// //   Paper,
// //   CardHeader,
// //   InputBase,
// //   Link,
// // } from "@mui/material";
// // import SettingsIcon from "@mui/icons-material/Settings";
// // import GridViewIcon from "@mui/icons-material/GridView";
// // import MovieFilterOutlinedIcon from "@mui/icons-material/MovieFilterOutlined";
// // import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
// // import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
// // import axios from "../axios";

// // export default function Page() {
// //   const [user, setUser] = useState(null);
// //   const [posts, setPosts] = useState([]);
// //   const [value, setValue] = useState(0);
// //   const [total, setTotal] = useState({});
// //   const [suggestions, setSuggestions] = useState([]);
// //   const [open, setOpen] = React.useState(false);

// //   const handleChange = (event, newValue) => setValue(newValue);
// //   const handleClose = () => setOpen(false);

// //   //  Fetch user overview (profile stats)
// //   const fetchOverview = async () => {
// //     try {
// //       const token = localStorage.getItem("token");
// //       const response = await axios.get(`/api/user/overview/`, {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       console.log("Overview Data:", response.data);
// //       setTotal(response.data);
// //       setUser(response.data.user || null); //  If backend sends user info
// //     } catch (error) {
// //       console.error("Error fetching overview:", error);
// //     }
// //   };

// //   //  Fetch posts created by logged-in user
// //   const fetchUserPosts = async () => {
// //     try {
// //       const token = localStorage.getItem("token");
// //       const response = await axios.get("/api/user/posts/", {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       console.log("User Posts:", response.data.results);
// //       setPosts(response.data.results);
// //     } catch (error) {
// //       console.error("Error fetching user posts:", error);
// //     }
// //   };

// //   //  Fetch “Suggested for you” list
// //   const FetchForyouList = async () => {
// //     try {
// //       const response = await axios.get("api/user/suggested-users/");
// //       setSuggestions(response.data.results);
// //     } catch (error) {
// //       console.log("Error fetching For You list", error.message);
// //     }
// //   };

// //   //  Follow button logic
// //   const handleFollowButton = async (userId) => {
// //     try {
// //       const token = localStorage.getItem("token");
// //       const response = await axios.post(
// //         "/api/user/follow-request/",
// //         { followed_id: userId },
// //         { headers: { Authorization: `Bearer ${token}` } }
// //       );
// //       console.log("follow response:", response.data);
// //     } catch (error) {
// //       console.error("Error following user:", error.message);
// //     }
// //   };

// //   //  Run all data fetches when page loads
// //   useEffect(() => {
// //     fetchOverview();
// //     fetchUserPosts();
// //     FetchForyouList();
// //   }, []);

// //   return (
// //     <Box sx={{ p: 3, maxWidth: 1000, mx: "auto", ml: 52 }}>
// //       {/* Profile Header */}
// //       <Grid container spacing={3} alignItems="center">
// //         <Grid item>
// //           <Avatar
// //             src={
// //               user?.avatar ||
// //               "https://images.unsplash.com/photo-1502657877623-f66bf489d236"
// //             }
// //             sx={{ width: 130, height: 130, display: "flex" }}
// //           />
// //         </Grid>

// //         <Grid item xs>
// //           <Box sx={{ mt: 1, display: "flex", gap: 2 }}>
// //             <Typography variant="h6" sx={{ fontSize: 20 }}>
// //               {user?.username || "Areeb"}
// //             </Typography>

// //             <Button
// //               variant="outlined"
// //               sx={{
// //                 mt: 1,
// //                 fontSize: 12,
// //                 backgroundColor: "#f1f1f1",
// //                 color: "black",
// //                 border: "none",
// //               }}
// //             >
// //               Edit Profile
// //             </Button>

// //             <Button
// //               variant="outlined"
// //               sx={{
// //                 mt: 1,
// //                 fontSize: 12,
// //                 backgroundColor: "#f1f1f1",
// //                 color: "black",
// //                 border: "none",
// //               }}
// //             >
// //               View Archive
// //             </Button>

// //             <SettingsIcon sx={{ mt: 1, fontSize: 33 }} />
// //           </Box>

// //           <Box sx={{ mt: 1, display: "flex", gap: 3 }}>
// //             <Typography>{total?.posts || 0} Posts</Typography>
// //             <Typography>{total?.followers || 0} Followers</Typography>
// //             <Typography>{total?.following || 0} Following</Typography>
// //           </Box>

// //           <Typography sx={{ mt: 2 }}>
// //             {user?.full_name || user?.username} <br />
// //             {user?.bio || "Forget your past, forgive yourself & begin again."}
// //           </Typography>
// //         </Grid>
// //       </Grid>

// //       {/* Tabs */}
// //       <Box sx={{ borderBottom: 1, borderColor: "divider", mt: 8, ml: 9 }}>
// //         <Tabs value={value} onChange={handleChange} aria-label="icon tabs">
// //           <Tab icon={<GridViewIcon />} aria-label="grid" />
// //           <Tab icon={<MovieFilterOutlinedIcon sx={{ ml: 19 }} />} aria-label="video" />
// //           <Tab icon={<BookmarkBorderOutlinedIcon sx={{ ml: 19 }} />} aria-label="save" />
// //           <Tab icon={<AssignmentIndOutlinedIcon sx={{ ml: 19 }} />} aria-label="person" />
// //         </Tabs>
// //       </Box>

// //       {/* User Posts Grid */}
// //       <Box sx={{ mt: 4 }}>
// //         <Grid container spacing={1}>
// //           {posts.length > 0 ? (
// //             posts.map((post) => (
// //               <Grid item xs={12} sm={8} md={2} key={post.id}>
// //                 <Card sx={{ borderRadius: 2, overflow: "hidden" }}>
// //                   <CardMedia
// //                     component="img"
// //                     height="185"
// //                     image={post.image || post.img}
// //                     alt="Post"
// //                   />
// //                 </Card>
// //               </Grid>
// //             ))
// //           ) : (
// //             <Typography sx={{ ml: 3, mt: 2 }}>No posts yet.</Typography>
// //           )}
// //         </Grid>
// //       </Box>

// //       {/* Right Sidebar */}
// //       <Stack
// //         direction="row"
// //         spacing={5}
// //         sx={{ mt: 4, px: 5, fontFamily: "Lato, sans-serif", ml: 55 }}
// //       >
// //         {/* Posts Section */}
// //         <Stack sx={{ flex: 2 }}>
// //           {posts.map((post) => (
// //             <Card key={post.id} sx={{ mb: 3 }}>
// //               <CardMedia
// //                 component="img"
// //                 image={post.image}
// //                 height="300"
// //                 alt="User post"
// //               />
// //               <Box sx={{ p: 2 }}>
// //                 <Typography variant="body2">{post.caption}</Typography>
// //               </Box>
// //             </Card>
// //           ))}
// //         </Stack>

// //         {/* Suggestions Section */}
// //         <Stack sx={{ flex: 1, minWidth: 200, p: 2, color: "#262626", marginRight: 20 }}>
// //           {/* Profile */}
// //           <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
// //             <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
// //               <Avatar src="/profile.jpg" sx={{ width: 40, height: 40 }} />
// //               <Box>
// //                 <Typography variant="body1" sx={{ fontWeight: "bold" }}>
// //                   {user?.username || "itz.adiiies"}
// //                 </Typography>
// //                 <Typography variant="body2" sx={{ color: "gray" }}>
// //                   {user?.full_name || "Adiiies"}
// //                 </Typography>
// //               </Box>
// //             </Box>
// //             <Link href="/" sx={{ color: "#0095f6", fontSize: 14, fontWeight: 600 }}>
// //               Switch
// //             </Link>
// //           </Box>

// //           {/* Suggested for You */}
// //           <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3, mb: 2 }}>
// //             <Typography variant="body2" sx={{ color: "gray", fontWeight: 600 }}>
// //               Suggested for you
// //             </Typography>
// //             <Link href="/" sx={{ fontSize: 13, fontWeight: 600, color: "black" }}>
// //               See All
// //             </Link>
// //           </Box>

// //           {suggestions?.map((user) => (
// //             <Box
// //               key={user.id}
// //               sx={{
// //                 display: "flex",
// //                 alignItems: "center",
// //                 justifyContent: "space-between",
// //                 mt: 1,
// //               }}
// //             >
// //               <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
// //                 <Avatar
// //                   src={user.profile_picture || "/default.jpg"}
// //                   sx={{ width: 40, height: 40 }}
// //                 />
// //                 <Box>
// //                   <Typography variant="body2" sx={{ fontWeight: 600 }}>
// //                     {user.username}
// //                   </Typography>
// //                   <Typography variant="caption" sx={{ color: "gray" }}>
// //                     {user.info || "suggested for you"}
// //                   </Typography>
// //                 </Box>
// //               </Box>
// //               <Button
// //                 variant="text"
// //                 sx={{
// //                   textTransform: "none",
// //                   fontSize: 13,
// //                   fontWeight: 600,
// //                   color: "#0095f6",
// //                 }}
// //                 onClick={() => handleFollowButton(user.id)}
// //               >
// //                 Follow
// //               </Button>
// //             </Box>
// //           ))}

// //           <Typography
// //             variant="caption"
// //             sx={{
// //               mt: 4,
// //               color: "gray",
// //               lineHeight: 1.6,
// //               display: "block",
// //             }}
// //           >
// //             About · Help · Press · API · Jobs · Privacy · Terms <br />
// //             Locations · Language · Meta Verified
// //           </Typography>
// //           <Typography variant="caption" sx={{ mt: 2, color: "gray" }}>
// //             © 2025 MOMENTO FROM META
// //           </Typography>
// //         </Stack>
// //       </Stack>
// //     </Box>
// //   );
// // }


// // // // "use client";
// // // // import React from "react";
// // // // import PropTypes from 'prop-types';
// // // // import { Avatar, Box, Button, Grid, CustomTabPanel, Typography, Card, CardMedia, Tabs, Tab } from "@mui/material";
// // // // import SettingsIcon from '@mui/icons-material/Settings';
// // // // import GridViewIcon from '@mui/icons-material/GridView';
// // // // import MovieFilterOutlinedIcon from '@mui/icons-material/MovieFilterOutlined';
// // // // import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
// // // // import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';

// // // // export default function Page() {
// // // //    const fetchOverview = async () => {
// // // //     try {
// // // //       const token = localStorage.getItem("token");
// // // //       const response = await axios.get(`/api/user/overview/`, {
// // // //         headers: {
// // // //           Authorization: `Bearer ${token}`,
// // // //         },
// // // //       });
// // // //       console.log("Overview Data:", response.data);

// // // //       setUser(response.data.user);
// // // //       setPosts(response.data.posts || []);
// // // //     } catch (error) {
// // // //       console.error("Error fetching overview:", error);
// // // //     }
// // // //   };
// // // //     const posts = [
// // // //         {
// // // //             id: 1,
// // // //             img: "https://images.unsplash.com/photo-1527549993586-dff825b37782"
// // // //         },
// // // //         {
// // // //             id: 2,
// // // //             img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c"
// // // //         },
// // // //         {
// // // //             id: 3,
// // // //             img: "https://images.unsplash.com/photo-1532614338840-ab30cf10ed36"
// // // //         },
// // // //          {
// // // //             id: 3,
// // // //             img: "https://images.unsplash.com/photo-1502657877623-f66bf489d236"
// // // //         }, 
// // // //         {
// // // //             id: 3,
// // // //             img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c"
// // // //         }, 
// // // //         {
// // // //             id: 3,
// // // //             img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c"
// // // //         },
// // // //         {
// // // //             id: 3,
// // // //             img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c"
// // // //         }, {
// // // //             id: 3,
// // // //             img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c"
// // // //         }, {
// // // //             id: 3,
// // // //             img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c"
// // // //         },
// // // //     ];
// // // //     const person = { avatar: "/avatar.png" };

// // // //     const [value, setValue] = React.useState(0);

// // // //     const handleChange = (event, newValue) => {
// // // //         setValue(newValue);
// // // //     };
// // // //     return (
// // // //         <Box sx={{ p: 3, maxWidth: 900, mx: "auto", ml: 62 }}>
// // // //             {/* Profile Header */}
// // // //             <Grid container spacing={3} alignItems="center">
// // // //                 <Grid item>
// // // //                     <Avatar
// // // //                         src={person.avatar}
// // // //                         sx={{ width: 120, height: 120 }}
// // // //                     />
// // // //                 </Grid>
// // // //                 <Grid item xs>
// // // //                     <Box sx={{ mt: 1, display: "flex", gap: 2 }}>

// // // //                         <Typography variant="h6" sx={{ fontSize: 20 }}>
// // // //                        {post.user.username}
// // // //                         </Typography>
// // // //                         <Button variant="outlined" sx={{ mt: 1, fontSize: 12, backgroundColor: '#f1f1f1', color: 'black', border: 'none' }}>
// // // //                             Edit Profile
// // // //                         </Button>
// // // //                         <Button variant="outlined" sx={{ mt: 1, fontSize: 12, fontSize: 12, backgroundColor: '#f1f1f1', color: 'black', border: 'none' }}>
// // // //                             View Achive
// // // //                         </Button>
// // // //                         <SettingsIcon sx={{ mt: 1, fontSize: 33 }} />
// // // //                     </Box>
// // // //                     <Box sx={{ mt: 1, display: "flex", gap: 0 }}>
// // // //                         <Typography>98</Typography>
// // // //                         <Typography sx={{ color: 'gray' }}>Posts</Typography>
// // // //                         <Typography sx={{ ml: 3 }}>61</Typography>
// // // //                         <Typography sx={{ color: 'gray' }}>followers</Typography>
// // // //                         <Typography sx={{ ml: 3 }}>11</Typography>
// // // //                         <Typography sx={{ color: 'gray' }}>following</Typography>

// // // //                     </Box>
// // // //                     <Typography sx={{ mt: 2 }}>
// // // //                         <strong>Adiiies</strong> | Nationality: pk <br />
// // // //                         Forget your past, forgive yourself & being again
// // // //                     </Typography>
// // // //                 </Grid>
// // // //             </Grid>

// // // //             {/* Posts Grid */}
// // // //             <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 8, ml: 9 }}>
// // // //                 <Tabs value={value} onChange={handleChange} aria-label="icon tabs example">
// // // //                     <Tab icon={< GridViewIcon sx={{}} />} aria-label="grid" />
// // // //                     <Tab icon={<MovieFilterOutlinedIcon sx={{ ml: 19 }} />} aria-label="video" />
// // // //                     <Tab icon={<BookmarkBorderOutlinedIcon sx={{ ml: 19 }} />} aria-label="save" />
// // // //                     <Tab icon={<AssignmentIndOutlinedIcon sx={{ ml: 19 }} />} aria-label="person" />
// // // //                 </Tabs>
// // // //             </Box>
// // // //             <Box sx={{ mt: 4 }}>
// // // //                 <Grid container spacing={1}>
// // // //                     {posts.map((post) => (
// // // //                         <Grid item xs={12} sm={8} md={2} key={post.id}>
// // // //                             <Card sx={{ borderRadius: 2, overflow: "hidden" }}>
// // // //                                 <CardMedia
// // // //                                     component="img"
// // // //                                     height="185"
// // // //                                     image={post.img}
// // // //                                     alt="Post"
// // // //                                 />
// // // //                             </Card>
// // // //                         </Grid>
// // // //                     ))}
// // // //                 </Grid>
// // // //             </Box>
// // // //         </Box>
// // // //     );
// // // // }


// // // // {
// // // //   "user": {
// // // //     "username": "adiiies",
// // // //     "avatar": "https://example.com/avatar.jpg",
// // // //     "followers": 61,
// // // //     "following": 11,
// // // //     "bio": "Forget your past, forgive yourself & begin again."
// // // //   },
// // // //   "posts": [
// // // //     { "id": 1, "image": "https://example.com/post1.jpg" },
// // // //     { "id": 2, "image": "https://example.com/post2.jpg" }
// // // //   ]
// // // // }




// // // // "use client";

// // // // import React, { useState } from "react";
// // // // import { useRouter } from "next/navigation";
// // // // import { useForm } from "react-hook-form";
// // // // import {
// // // //   Button,
// // // //   Box,
// // // //   InputBase,
// // // //   Stack,
// // // //   Typography,
// // // //   Paper,
// // // //   Tooltip,
// // // //   Divider,
// // // //   Link,
// // // //   IconButton,
// // // // } from "@mui/material";
// // // // import { Visibility, VisibilityOff } from "@mui/icons-material";
// // // // import FacebookIcon from "@mui/icons-material/Facebook";
// // // // import axios from "../axios";

// // // // export default function Login() {
// // // //   const router = useRouter();
// // // //   const [showPassword, setShowPassword] = useState(false);

// // // //   const {
// // // //     register,
// // // //     handleSubmit,
// // // //     setError,
// // // //     formState: { errors, isSubmitting },
// // // //   } = useForm();

// // // //   // LOGIN HANDLER
// // // //   const handleLogin = async (data) => {
// // // //     try {
// // // //       const payload = {
// // // //         email: data.email,
// // // //         password: data.password,
// // // //       };

// // // //       // Send login request
// // // //       const response = await axios.post("/api/user/token/", payload);
// // // //       console.log("Login successful", response);

// // // //       // Save tokens
// // // //       const access = response.data.access;
// // // //       const refresh = response.data.refresh;
// // // //       localStorage.setItem("access", access);
// // // //       localStorage.setItem("refresh", refresh);

// // // //       //  Fetch user data after login
// // // //       await fetchUserData(access);

// // // //       // Redirect to home
// // // //       router.push("/home");
// // // //     } catch (error) {
// // // //       console.error(" Login failed:", error);

// // // //       // Handle backend errors gracefully
// // // //       const message = error.response?.data;
// // // //       if (message?.type === "validation_error") {
// // // //         message.errors?.forEach((err) => {
// // // //           setError(err.attr, {
// // // //             type: err.code,
// // // //             message: err.detail,
// // // //           });
// // // //         });
// // // //       } else if (message?.type === "client_error") {
// // // //         setError("password", {
// // // //           type: "validate",
// // // //           message: message.errors?.[0]?.detail || "Invalid credentials",
// // // //         });
// // // //       } else {
// // // //         setError("email", {
// // // //           type: "manual",
// // // //           message: "Unexpected error. Please try again.",
// // // //         });
// // // //       }
// // // //     }
// // // //   };

// // // //   //  FETCH USER DATA (after login)
// // // //   const fetchUserData = async (accessToken) => {
// // // //     try {
// // // //       const response = await axios.get("/api/user/me/", {
// // // //         headers: {
// // // //           Authorization: `Bearer ${accessToken}`,
// // // //         },
// // // //       });
// // // //       console.log(" User data:", response.data);

// // // //       // Save to localStorage or state if needed
// // // //       localStorage.setItem("user", JSON.stringify(response.data));
// // // //     } catch (error) {
// // // //       console.error(" Failed to fetch user:", error);
// // // //     }
// // // //   };

// // // //   // UI
// // // //   return (
// // // //     <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f5f5", p: 4 }}>
// // // //       <Stack spacing={2} sx={{ p: 2, borderRadius: 2, mb: 4 }}>
// // // //         <Stack>
// // // //           <Stack
// // // //             spacing={3}
// // // //             sx={{
// // // //               backgroundColor: "white",
// // // //               borderRadius: 2,
// // // //               maxWidth: 400,
// // // //               margin: "0 auto",
// // // //               p: 5,
// // // //               boxShadow: 3,
// // // //             }}
// // // //           >
// // // //             <Typography
// // // //               variant="h4"
// // // //               sx={{ color: "#f08be4", textAlign: "center" }}
// // // //             >
// // // //               <b>Momento</b>
// // // //             </Typography>

// // // //             {/* Form */}
// // // //             <form onSubmit={handleSubmit(handleLogin)}>
// // // //               {/* Email */}
// // // //               <Tooltip
// // // //                 title={errors.email ? errors.email.message : ""}
// // // //                 followCursor
// // // //               >
// // // //                 <Paper
// // // //                   sx={{
// // // //                     p: "3px 4px",
// // // //                     display: "flex",
// // // //                     alignItems: "center",
// // // //                     mt: 1,
// // // //                   }}
// // // //                 >
// // // //                   <InputBase
// // // //                     sx={{ ml: 1, flex: 1 }}
// // // //                     placeholder="Username or Email"
// // // //                     {...register("email", {
// // // //                       required: "Email is required",
// // // //                     })}
// // // //                   />
// // // //                 </Paper>
// // // //               </Tooltip>
// // // //               {errors.email && (
// // // //                 <Typography sx={{ color: "red", mt: 1 }}>
// // // //                   {errors.email.message}
// // // //                 </Typography>
// // // //               )}

// // // //               {/* Password */}
// // // //               <Tooltip
// // // //                 title={errors.password ? errors.password.message : ""}
// // // //                 followCursor
// // // //               >
// // // //                 <Paper
// // // //                   sx={{
// // // //                     p: "3px 4px",
// // // //                     display: "flex",
// // // //                     alignItems: "center",
// // // //                     mt: 1,
// // // //                   }}
// // // //                 >
// // // //                   <InputBase
// // // //                     sx={{ ml: 1, flex: 1 }}
// // // //                     placeholder="Password"
// // // //                     type={showPassword ? "text" : "password"}
// // // //                     {...register("password", {
// // // //                       required: "Password is required",
// // // //                     })}
// // // //                   />
// // // //                   <IconButton
// // // //                     onClick={() => setShowPassword((prev) => !prev)}
// // // //                     edge="end"
// // // //                     aria-label={
// // // //                       showPassword ? "hide password" : "show password"
// // // //                     }
// // // //                   >
// // // //                     {showPassword ? <VisibilityOff /> : <Visibility />}
// // // //                   </IconButton>
// // // //                 </Paper>
// // // //               </Tooltip>
// // // //               {errors.password && (
// // // //                 <Typography sx={{ color: "red", mt: 1 }}>
// // // //                   {errors.password.message}
// // // //                 </Typography>
// // // //               )}

// // // //               {/* Log in Button */}
// // // //               <Button
// // // //                 variant="contained"
// // // //                 color="primary"
// // // //                 fullWidth
// // // //                 sx={{ mt: 2 }}
// // // //                 type="submit"
// // // //                 disabled={isSubmitting}
// // // //               >
// // // //                 {isSubmitting ? "Submitting..." : "Log in"}
// // // //               </Button>
// // // //               <Divider sx={{ mt: 2 }}>or</Divider>

// // // //               {/* Social Login */}
// // // //               <Button
// // // //                 variant="outlined"
// // // //                 sx={{
// // // //                   color: "#2480f1ff",
// // // //                   fontSize: 15,
// // // //                   mt: 2,
// // // //                   border: "none",
// // // //                 }}
// // // //                 fullWidth
// // // //                 startIcon={<FacebookIcon />}
// // // //               >
// // // //                 Log in with Facebook
// // // //               </Button>

// // // //               <Button
// // // //                 variant="outlined"
// // // //                 sx={{
// // // //                   color: "#050505ff",
// // // //                   fontSize: 13,
// // // //                   border: "none",
// // // //                 }}
// // // //                 fullWidth
// // // //               >
// // // //                 Forgotten password?
// // // //               </Button>
// // // //             </form>
// // // //           </Stack>

// // // //           {/* Bottom Signup Link */}
// // // //           <Stack
// // // //             sx={{
// // // //               backgroundColor: "white",
// // // //               borderRadius: 2,
// // // //               width: 400,
// // // //               margin: "0 auto",
// // // //               boxShadow: 3,
// // // //               p: 3,
// // // //               mt: 3,
// // // //             }}
// // // //           >
// // // //             <Typography
// // // //               variant="body2"
// // // //               sx={{ color: "black", textAlign: "center" }}
// // // //             >
// // // //               Don't have an account?{" "}
// // // //               <Link href="/signup" underline="hover" sx={{ color: "#506febff" }}>
// // // //                 Sign up
// // // //               </Link>
// // // //             </Typography>
// // // //           </Stack>
// // // //         </Stack>
// // // //       </Stack>
// // // //     </Box>
// // // //   );
// // // // }

// // // // // "use client";

// // // // // import React, { useState, useRef, useEffect } from "react";
// // // // // import axios from "axios";
// // // // // import {
// // // // //   Dialog,
// // // // //   DialogContent,
// // // // //   DialogTitle,
// // // // //   DialogActions,
// // // // //   IconButton,
// // // // //   Typography,
// // // // //   Card,
// // // // //   CardContent,
// // // // //   Box,
// // // // //   Avatar,
// // // // //   InputBase,
// // // // //   Divider,
// // // // //   Button,
// // // // // } from "@mui/material";
// // // // // import { styled } from "@mui/material/styles";
// // // // // import CloseIcon from "@mui/icons-material/Close";
// // // // // import PlayArrowIcon from "@mui/icons-material/PlayArrow";
// // // // // import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// // // // // import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
// // // // // import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

// // // // // // ✅ Styled Components
// // // // // const StyledDialog = styled(Dialog)(({ theme }) => ({
// // // // //   "& .MuiDialog-paper": {
// // // // //     width: "100%",
// // // // //     maxWidth: 1000,
// // // // //     height: "85vh",
// // // // //     display: "flex",
// // // // //     flexDirection: "row",
// // // // //     borderRadius: "16px",
// // // // //     overflow: "hidden",
// // // // //   },
// // // // // }));

// // // // // const RightPanel = styled(Box)(({ theme }) => ({
// // // // //   flex: 1,
// // // // //   display: "flex",
// // // // //   flexDirection: "column",
// // // // //   overflowY: "auto",
// // // // //   padding: theme.spacing(2.5),
// // // // // }));

// // // // // const CaptionInput = styled(InputBase)(({ theme }) => ({
// // // // //   width: "100%",
// // // // //   minHeight: 100,
// // // // //   fontSize: 14,
// // // // //   padding: theme.spacing(1),
// // // // //   border: "1px solid #ddd",
// // // // //   borderRadius: 8,
// // // // //   "& textarea": {
// // // // //     resize: "none",
// // // // //   },
// // // // // }));

// // // // // // ✅ Main Component
// // // // // export default function CreateReelDialog({ open, handleClose }) {
// // // // //   const [selectedFile, setSelectedFile] = useState(null);
// // // // //   const [previewURL, setPreviewURL] = useState(null);
// // // // //   const [caption, setCaption] = useState("");
// // // // //   const [loading, setLoading] = useState(false);
// // // // //   const inputRef = useRef(null);

// // // // //   // File Handlers
// // // // //   const handleFileSelect = (e) => {
// // // // //     const file = e.target.files[0];
// // // // //     if (file) {
// // // // //       setSelectedFile(file);
// // // // //       setPreviewURL(URL.createObjectURL(file));
// // // // //     }
// // // // //   };

// // // // //   const handleOpenFileDialog = () => {
// // // // //     inputRef.current?.click();
// // // // //   };

// // // // //   const handleRemoveFile = () => {
// // // // //     setSelectedFile(null);
// // // // //     setPreviewURL(null);
// // // // //     if (inputRef.current) inputRef.current.value = "";
// // // // //   };

// // // // //   // ✅ Create Post API
// // // // //   const handleCreatePost = async () => {
// // // // //     if (!selectedFile) return alert("Please select a file first!");
// // // // //     setLoading(true);

// // // // //     try {
// // // // //       const token = localStorage.getItem("token");

// // // // //       // Prepare FormData
// // // // //       const formData = new FormData();
// // // // //       formData.append("file", selectedFile);
// // // // //       formData.append("caption", caption);

// // // // //       const response = await axios.post("/api/post/", formData, {
// // // // //         headers: {
// // // // //           Authorization: `Bearer ${token}`,
// // // // //           "Content-Type": "multipart/form-data",
// // // // //         },
// // // // //       });

// // // // //       console.log("✅ Post created successfully:", response.data);

// // // // //       // Optionally trigger parent refresh or UI feedback
// // // // //       handleClose();
// // // // //       setSelectedFile(null);
// // // // //       setPreviewURL(null);
// // // // //       setCaption("");
// // // // //     } catch (error) {
// // // // //       console.error("❌ Error creating post:", error);
// // // // //       alert("Failed to create post. Please try again.");
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   // 🖼 Upload Dialog (No File Selected)
// // // // //   if (!previewURL) {
// // // // //     return (
// // // // //       <Dialog onClose={handleClose} open={open} maxWidth="sm" fullWidth>
// // // // //         <DialogTitle sx={{ textAlign: "center", fontWeight: 600 }}>
// // // // //           Create new post
// // // // //         </DialogTitle>
// // // // //         <IconButton
// // // // //           aria-label="close"
// // // // //           onClick={handleClose}
// // // // //           sx={(theme) => ({
// // // // //             position: "absolute",
// // // // //             right: 8,
// // // // //             top: 8,
// // // // //             color: theme.palette.grey[500],
// // // // //           })}
// // // // //         >
// // // // //           <CloseIcon />
// // // // //         </IconButton>

// // // // //         <DialogContent dividers>
// // // // //           <Card sx={{ p: 2, width: "100%" }}>
// // // // //             <CardContent sx={{ textAlign: "center" }}>
// // // // //               <PlayArrowIcon sx={{ mt: 2, fontSize: 100, color: "black" }} />
// // // // //               <Typography variant="body1" sx={{ mt: 2 }}>
// // // // //                 Drag photos and videos here
// // // // //               </Typography>
// // // // //             </CardContent>
// // // // //           </Card>
// // // // //         </DialogContent>

// // // // //         <DialogActions sx={{ justifyContent: "center" }}>
// // // // //           <input
// // // // //             ref={inputRef}
// // // // //             type="file"
// // // // //             accept="image/*,video/*"
// // // // //             hidden
// // // // //             onChange={handleFileSelect}
// // // // //           />
// // // // //           <Button variant="contained" onClick={handleOpenFileDialog}>
// // // // //             Select From Computer
// // // // //           </Button>
// // // // //         </DialogActions>
// // // // //       </Dialog>
// // // // //     );
// // // // //   }

// // // // //   // 📸 Reel Layout (Preview Mode)
// // // // //   return (
// // // // //     <StyledDialog open={open} onClose={handleClose}>
// // // // //       {/* Left Side (Media Preview) */}
// // // // //       <Box
// // // // //         sx={{
// // // // //           flex: 1,
// // // // //           backgroundColor: "#000",
// // // // //           display: "flex",
// // // // //           alignItems: "center",
// // // // //           justifyContent: "center",
// // // // //         }}
// // // // //       >
// // // // //         {selectedFile.type.startsWith("image/") ? (
// // // // //           <img
// // // // //             src={previewURL}
// // // // //             alt="Preview"
// // // // //             style={{
// // // // //               width: "100%",
// // // // //               height: "100%",
// // // // //               objectFit: "contain",
// // // // //               background: "#000",
// // // // //             }}
// // // // //           />
// // // // //         ) : (
// // // // //           <video
// // // // //             src={previewURL}
// // // // //             controls
// // // // //             style={{
// // // // //               width: "100%",
// // // // //               height: "100%",
// // // // //               objectFit: "contain",
// // // // //               background: "#000",
// // // // //             }}
// // // // //           />
// // // // //         )}
// // // // //       </Box>

// // // // //       {/* Right Side (Caption + Settings) */}
// // // // //       <RightPanel>
// // // // //         <Box
// // // // //           sx={{
// // // // //             display: "flex",
// // // // //             justifyContent: "space-between",
// // // // //             alignItems: "center",
// // // // //             mb: 2,
// // // // //           }}
// // // // //         >
// // // // //           <Typography variant="h6" sx={{ fontWeight: 600 }}>
// // // // //             New reel
// // // // //           </Typography>
// // // // //           <Box>
// // // // //             <Button
// // // // //               variant="text"
// // // // //               disabled={loading}
// // // // //               sx={{
// // // // //                 color: "#0095f6",
// // // // //                 textTransform: "none",
// // // // //                 fontWeight: 600,
// // // // //                 mr: 1,
// // // // //               }}
// // // // //               onClick={handleCreatePost}
// // // // //             >
// // // // //               {loading ? "Sharing..." : "Share"}
// // // // //             </Button>
// // // // //             <IconButton size="small" onClick={handleClose}>
// // // // //               <CloseIcon />
// // // // //             </IconButton>
// // // // //           </Box>
// // // // //         </Box>

// // // // //         <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2, mb: 2 }}>
// // // // //           <Avatar src="/profile.jpg" alt="User" />
// // // // //           <Box sx={{ flex: 1 }}>
// // // // //             <Typography
// // // // //               variant="subtitle2"
// // // // //               sx={{ fontWeight: 600, mb: 0.5 }}
// // // // //             >
// // // // //               areeb
// // // // //             </Typography>
// // // // //             <CaptionInput
// // // // //               placeholder="Write a caption..."
// // // // //               multiline
// // // // //               value={caption}
// // // // //               onChange={(e) => setCaption(e.target.value)}
// // // // //             />
// // // // //             <Typography
// // // // //               variant="caption"
// // // // //               sx={{
// // // // //                 display: "block",
// // // // //                 textAlign: "right",
// // // // //                 mt: 0.5,
// // // // //                 color: "#999",
// // // // //               }}
// // // // //             >
// // // // //               {caption.length}/2200
// // // // //             </Typography>
// // // // //           </Box>
// // // // //         </Box>

// // // // //         <Divider sx={{ my: 1 }} />

// // // // //         <OptionRow
// // // // //           icon={<LocationOnOutlinedIcon fontSize="small" />}
// // // // //           text="Add location"
// // // // //         />
// // // // //         <OptionRow
// // // // //           icon={<AddCircleOutlineOutlinedIcon fontSize="small" />}
// // // // //           text="Add collaborators"
// // // // //         />

// // // // //         <Divider sx={{ my: 1 }} />

// // // // //         <ExpandableRow text="Share to" />
// // // // //         <ExpandableRow text="Accessibility" />
// // // // //         <ExpandableRow text="Advanced settings" />
// // // // //       </RightPanel>
// // // // //     </StyledDialog>
// // // // //   );
// // // // // }

// // // // // // Helper Components
// // // // // const OptionRow = ({ icon, text }) => (
// // // // //   <Box
// // // // //     sx={{
// // // // //       display: "flex",
// // // // //       alignItems: "center",
// // // // //       justifyContent: "space-between",
// // // // //       py: 1,
// // // // //       px: 1,
// // // // //       cursor: "pointer",
// // // // //       "&:hover": { backgroundColor: "#fafafa" },
// // // // //     }}
// // // // //   >
// // // // //     <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
// // // // //       {icon}
// // // // //       <Typography variant="body2">{text}</Typography>
// // // // //     </Box>
// // // // //   </Box>
// // // // // );

// // // // // const ExpandableRow = ({ text }) => (
// // // // //   <Box
// // // // //     sx={{
// // // // //       display: "flex",
// // // // //       alignItems: "center",
// // // // //       justifyContent: "space-between",
// // // // //       py: 1,
// // // // //       px: 1,
// // // // //       cursor: "pointer",
// // // // //       "&:hover": { backgroundColor: "#fafafa" },
// // // // //     }}
// // // // //   >
// // // // //     <Typography variant="body2">{text}</Typography>
// // // // //     <ExpandMoreIcon fontSize="small" sx={{ color: "#888" }} />
// // // // //   </Box>
// // // // // );

// // // // // // "use client";

// // // // // // import * as React from "react";
// // // // // // import {
// // // // // //   Button,
// // // // // //   Dialog,
// // // // // //   DialogTitle,
// // // // // //   DialogContent,
// // // // // //   DialogActions,
// // // // // //   IconButton,
// // // // // //   Typography,
// // // // // //   Card,
// // // // // //   CardContent,
// // // // // //   Box,
// // // // // // } from "@mui/material";
// // // // // // import CloseIcon from "@mui/icons-material/Close";
// // // // // // import PlayArrowIcon from "@mui/icons-material/PlayArrow";
// // // // // // import { styled } from "@mui/material/styles";

// // // // // // const BootstrapDialog = styled(Dialog)(({ theme }) => ({
// // // // // //   "& .MuiDialogContent-root": { padding: theme.spacing(2) },
// // // // // //   "& .MuiDialogActions-root": { padding: theme.spacing(1) },
// // // // // // }));

// // // // // // export default function CustomizedDialogs({ open, handleClose }) {
// // // // // //   const [selectedFile, setSelectedFile] = React.useState(null);
// // // // // //   const [previewURL, setPreviewURL] = React.useState(null);
// // // // // //   const inputRef = React.useRef(null);

// // // // // //   const handleFileSelect = (e) => {
// // // // // //     const file = e.target.files[0];
// // // // // //     if (file) {
// // // // // //       setSelectedFile(file);
// // // // // //       setPreviewURL(URL.createObjectURL(file));
// // // // // //     }
// // // // // //   };

// // // // // //   const handleOpenFileDialog = () => {
// // // // // //     if (inputRef.current) inputRef.current.click();
// // // // // //   };

// // // // // //   const handleRemoveFile = () => {
// // // // // //     setSelectedFile(null);
// // // // // //     setPreviewURL(null);
// // // // // //     if (inputRef.current) inputRef.current.value = "";
// // // // // //   };

// // // // // //   const handlePost = () => {
// // // // // //     if (!selectedFile) return;
// // // // // //     // TODO: integrate with upload API
// // // // // //     console.log("Uploading:", selectedFile.name);
// // // // // //     handleClose();
// // // // // //   };

// // // // // //   return (
// // // // // //     <BootstrapDialog onClose={handleClose} open={open} maxWidth="sm" fullWidth>
// // // // // //       <DialogTitle sx={{ m: 0, p: 2, textAlign: "center" }}>
// // // // // //         <b>Create new post</b>
// // // // // //       </DialogTitle>
// // // // // //       <IconButton
// // // // // //         aria-label="close"
// // // // // //         onClick={handleClose}
// // // // // //         sx={(theme) => ({
// // // // // //           position: "absolute",
// // // // // //           right: 8,
// // // // // //           top: 8,
// // // // // //           color: theme.palette.grey[500],
// // // // // //         })}
// // // // // //       >
// // // // // //         <CloseIcon />
// // // // // //       </IconButton>

// // // // // //       <DialogContent dividers>
// // // // // //         {!previewURL ? (
// // // // // //           <Card sx={{ p: 2, width: "100%" }}>
// // // // // //             <CardContent sx={{ textAlign: "center" }}>
// // // // // //               <PlayArrowIcon sx={{ mt: 2, fontSize: 100, color: "black" }} />
// // // // // //               <Typography variant="body1" sx={{ mt: 2 }}>
// // // // // //                 Drag photos and videos here
// // // // // //               </Typography>
// // // // // //             </CardContent>
// // // // // //           </Card>
// // // // // //         ) : (
// // // // // //           <Box
// // // // // //             sx={{
// // // // // //               width: "100%",
// // // // // //               height: 400,
// // // // // //               display: "flex",
// // // // // //               alignItems: "center",
// // // // // //               justifyContent: "center",
// // // // // //               position: "relative",
// // // // // //             }}
// // // // // //           >
// // // // // //             {selectedFile.type.startsWith("image/") ? (
// // // // // //               <img
// // // // // //                 src={previewURL}
// // // // // //                 alt="Preview"
// // // // // //                 style={{
// // // // // //                   maxWidth: "100%",
// // // // // //                   maxHeight: "100%",
// // // // // //                   objectFit: "contain",
// // // // // //                   borderRadius: 8,
// // // // // //                 }}
// // // // // //               />
// // // // // //             ) : (
// // // // // //               <video
// // // // // //                 src={previewURL}
// // // // // //                 controls
// // // // // //                 style={{
// // // // // //                   maxWidth: "100%",
// // // // // //                   maxHeight: "100%",
// // // // // //                   borderRadius: 8,
// // // // // //                 }}
// // // // // //               />
// // // // // //             )}
// // // // // //             <IconButton
// // // // // //               onClick={handleRemoveFile}
// // // // // //               sx={{
// // // // // //                 position: "absolute",
// // // // // //                 top: 8,
// // // // // //                 right: 8,
// // // // // //                 bgcolor: "rgba(0,0,0,0.4)",
// // // // // //                 color: "white",
// // // // // //               }}
// // // // // //             >
// // // // // //               <CloseIcon />
// // // // // //             </IconButton>
// // // // // //           </Box>
// // // // // //         )}
// // // // // //       </DialogContent>

// // // // // //       <DialogActions sx={{ justifyContent: "center" }}>
// // // // // //         <input
// // // // // //           ref={inputRef}
// // // // // //           type="file"
// // // // // //           accept="image/*,video/*"
// // // // // //           hidden
// // // // // //           onChange={handleFileSelect}
// // // // // //         />{!previewURL ? (
// // // // // //           <Button variant="contained" onClick={handleOpenFileDialog}>
// // // // // //             Select From Computer
// // // // // //           </Button>
// // // // // //         ) : (
// // // // // //           <Button variant="contained" color="primary" onClick={handlePost}>
// // // // // //             Post
// // // // // //           </Button>
// // // // // //         )}
// // // // // //       </DialogActions>
// // // // // //     </BootstrapDialog>
// // // // // //   );
// // // // // // }
// // // // // // // "use client";
// // // // // // // import * as React from "react";
// // // // // // // import {
// // // // // // //   Button, Dialog, DialogTitle, DialogContent, DialogActions,
// // // // // // //   IconButton, Typography, Card, CardContent
// // // // // // // } from "@mui/material";
// // // // // // // import CloseIcon from "@mui/icons-material/Close";
// // // // // // // import PlayArrowIcon from "@mui/icons-material/PlayArrow";
// // // // // // // import { styled } from "@mui/material/styles";

// // // // // // // const BootstrapDialog = styled(Dialog)(({ theme }) => ({
// // // // // // //   "& .MuiDialogContent-root": { padding: theme.spacing(2) },
// // // // // // //   "& .MuiDialogActions-root": { padding: theme.spacing(1) },
// // // // // // // }));

// // // // // // // export default function CustomizedDialogs({ open, handleClose }) {
// // // // // // //   return (
// // // // // // //     <BootstrapDialog onClose={handleClose} open={open}>
// // // // // // //       <DialogTitle sx={{ m: 0, p: 2 , ml: 16}}>Create new post</DialogTitle>
// // // // // // //       <IconButton
// // // // // // //         aria-label="close"
// // // // // // //         onClick={handleClose}
// // // // // // //         sx={(theme) => ({
// // // // // // //           position: "absolute",
// // // // // // //           right: 8,
// // // // // // //           top: 8,
// // // // // // //           color: theme.palette.grey[500],
// // // // // // //         })}
// // // // // // //       >
// // // // // // //         <CloseIcon />
// // // // // // //       </IconButton>
// // // // // // //       <DialogContent dividers>
// // // // // // //         <Card sx={{ p: 2 , width:{sm:400, xs: "100%"} }}>
// // // // // // //           <CardContent sx={{ textAlign: "center" }}>
// // // // // // //             <Typography variant="h6" gutterBottom>
// // // // // // //               <b>Create new post</b>
// // // // // // //             </Typography>
// // // // // // //             <hr />
// // // // // // //             <PlayArrowIcon sx={{ mt: 2, fontSize: 100, color: "black" }} />
// // // // // // //             <Typography variant="body1" sx={{ mt: 2 }}>
// // // // // // //               Drag photos and videos here
// // // // // // //             </Typography>
// // // // // // //           </CardContent>
// // // // // // //         </Card>
// // // // // // //       </DialogContent>
// // // // // // //       <DialogActions>
// // // // // // //         <Button variant="contained" onClick={handleClose}>
// // // // // // //           Select From Computer
// // // // // // //         </Button>
// // // // // // //       </DialogActions>
// // // // // // //     </BootstrapDialog>
// // // // // // //   );
// // // // // // // }
// // // // // // // "use client";

// // // // // // // import React, { useState } from "react";
// // // // // // // import {
// // // // // // //     Dialog,
// // // // // // //     IconButton,
// // // // // // //     Typography,
// // // // // // //     CardMedia,
// // // // // // //     Avatar,
// // // // // // //     Box,
// // // // // // //     InputBase,
// // // // // // //     Divider,
// // // // // // // } from "@mui/material";
// // // // // // // import { styled } from "@mui/material/styles";
// // // // // // // import CloseIcon from "@mui/icons-material/Close";
// // // // // // // import {
// // // // // // //     MoreHoriz,
// // // // // // //     Face,
// // // // // // //     FavoriteBorder,
// // // // // // //     ModeCommentOutlined,
// // // // // // //     SendOutlined,
// // // // // // //     BookmarkBorderRounded,
// // // // // // // } from "@mui/icons-material";
// // // // // // // import FavoriteIcon from "@mui/icons-material/Favorite";
// // // // // // // import axios from "../axios";
// // // // // // // import { useEffect } from "react";

// // // // // // // const BootstrapDialog = styled(Dialog)(({ theme }) => ({
// // // // // // //     "& .MuiDialog-paper": {
// // // // // // //         maxWidth: "900px",
// // // // // // //         width: "90%",
// // // // // // //         height: "90vh",
// // // // // // //         display: "flex",
// // // // // // //         overflow: "hidden",
// // // // // // //         borderRadius: 12,
// // // // // // //     },
// // // // // // // }));

// // // // // // // export default function CustomizedDialogs({ open, onClose, post }) {
// // // // // // //     const [comment, setComment] = useState("");
// // // // // // //     const [liked, setLiked] = useState(post.is_liked || false);
// // // // // // //     const [likesCount, setLikesCount] = useState(post.likes_count || 0);
// // // // // // //     const [comments, setComments] = useState([]);
// // // // // // //     const [replyingTo, setReplyingTo] = useState(null);
// // // // // // //     const [replyText, setReplyText] = useState("");

// // // // // // //     //reply comment most important
// // // // // // //     const handleAddReply = (commentID) => {
// // // // // // //   if (!replyText.trim()) return;

// // // // // // //   const newReply = {
// // // // // // //     content: replyText,
// // // // // // //     user: { username: "you" },
// // // // // // //   };

// // // // // // //   setComments((prev) =>
// // // // // // //     prev.map((comment) => {
// // // // // // //       if (comment.id === commentID) {
// // // // // // //         return {
// // // // // // //           ...comment,
// // // // // // //           replies: [...(comment.replies || []), newReply],
// // // // // // //         };
// // // // // // //       }
// // // // // // //       return comment;
// // // // // // //     })
// // // // // // //   );

// // // // // // //   setReplyText("");
// // // // // // //   setReplyingTo(null);
// // // // // // // };
// // // // // // //     const likePost = async (id) => {
// // // // // // //         try {
// // // // // // //             const token = localStorage.getItem("token");
// // // // // // //             const newLiked = !liked;
// // // // // // //             setLiked(newLiked);
// // // // // // //             setLikesCount((prev) => (newLiked ? prev + 1 : prev - 1));

// // // // // // //             await axios.post(
// // // // // // //                 `/api/post/${id}/like/`,
// // // // // // //                 {},
// // // // // // //                 { headers: { Authorization: `Bearer ${token}` } }
// // // // // // //             );
// // // // // // //         } catch (error) {
// // // // // // //             console.error("Error liking post:", error);
// // // // // // //         }
// // // // // // //     };

// // // // // // //     // add Comment
// // // // // // //     const handleAddComment = async (id) => {
// // // // // // //         if (!comment.trim()) return;

// // // // // // //         try {
// // // // // // //             const payload = {
// // // // // // //                 content: comment,
// // // // // // //             }
// // // // // // //             const response = await axios.post(`/api/post/${id}/comment/`, payload);
// // // // // // //             const newComment = {
// // // // // // //                 content: comment,
// // // // // // //                 created_ago: "just now",
// // // // // // //                 likes: 0,
// // // // // // //                 replise:[],
// // // // // // //                 user: {
// // // // // // //                     username: post?.user?.username || "you"
// // // // // // //                 }
// // // // // // //             }
// // // // // // //             setComments([
// // // // // // //                 ...comments,
// // // // // // //                 newComment
// // // // // // //             ]);
// // // // // // //             setComment("");
// // // // // // //             console.log("comment posted : ", response.data);
// // // // // // //         } catch (error) {
// // // // // // //             console.error("Error fetch on post")
// // // // // // //         };

// // // // // // //     };

// // // // // // //     //Enter Key
// // // // // // //     const handleKeyDown = (event) => {
// // // // // // //         if (event.key === "Enter" && !event.shiftKey) {
// // // // // // //             event.preventDefault();
// // // // // // //             handleAddComment(post.id);
// // // // // // //         }
// // // // // // //     };

// // // // // // //     return (
// // // // // // //         <BootstrapDialog open={open} onClose={onClose}>
// // // // // // //             <Box
// // // // // // //                 sx={{
// // // // // // //                     display: "flex",
// // // // // // //                     flexDirection: "row",
// // // // // // //                     width: "100%",
// // // // // // //                     height: "100%",
// // // // // // //                 }}
// // // // // // //             >
// // // // // // //                 {/* Left: Image */}
// // // // // // //                 <Box
// // // // // // //                     sx={{
// // // // // // //                         flex: 1,
// // // // // // //                         backgroundColor: "#000",
// // // // // // //                         display: "flex",
// // // // // // //                         alignItems: "center",
// // // // // // //                         justifyContent: "center",
// // // // // // //                         position: "relative",
// // // // // // //                     }}
// // // // // // //                 >
// // // // // // //                     <IconButton
// // // // // // //                         aria-label="close"
// // // // // // //                         onClick={onClose}
// // // // // // //                         sx={{
// // // // // // //                             position: "absolute",
// // // // // // //                             right: 10,
// // // // // // //                             top: 10,
// // // // // // //                             color: "white",
// // // // // // //                             background: "rgba(0,0,0,0.5)",
// // // // // // //                             "&:hover": { background: "rgba(0,0,0,0.7)" },
// // // // // // //                         }}
// // // // // // //                     >
// // // // // // //                         <CloseIcon />
// // // // // // //                     </IconButton>
// // // // // // //                     <CardMedia
// // // // // // //                         component="img"
// // // // // // //                         src={post?.media?.[0]?.file || "/placeholder.jpg"}
// // // // // // //                         alt={post?.caption || "Post image"}
// // // // // // //                         sx={{
// // // // // // //                             height: "100%",
// // // // // // //                             width: "100%",
// // // // // // //                             objectFit: "contain",
// // // // // // //                         }}
// // // // // // //                     />
// // // // // // //                 </Box>
// // // // // // //                 {/* Right: Comments panel */}
// // // // // // //                 <Box
// // // // // // //                     sx={{
// // // // // // //                         flexBasis: 380,
// // // // // // //                         display: "flex",
// // // // // // //                         flexDirection: "column",
// // // // // // //                         bgcolor: "background.paper",
// // // // // // //                     }}
// // // // // // //                 >
// // // // // // //                     {/* Header */}
// // // // // // //                     <Box
// // // // // // //                         sx={{
// // // // // // //                             display: "flex",
// // // // // // //                             alignItems: "center",
// // // // // // //                             justifyContent: "space-between",
// // // // // // //                             p: 2,
// // // // // // //                             borderBottom: "1px solid #eee",
// // // // // // //                         }}
// // // // // // //                     >
// // // // // // //                         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
// // // // // // //                             <Avatar>{post?.user?.name ? post.user.name[0] : "U"}</Avatar>
// // // // // // //                             <Typography fontWeight={600}>
// // // // // // //                                 {post?.user?.username || "username"}
// // // // // // //                             </Typography>
// // // // // // //                         </Box>
// // // // // // //                         <IconButton>
// // // // // // //                             <MoreHoriz />
// // // // // // //                         </IconButton>
// // // // // // //                     </Box>

// // // // // // //                     {/* Comments Section */}
// // // // // // //                     <Box sx={{ flex: 1, overflowY: "auto", p: 2, maxHeight: "60vh" }}>
// // // // // // //                         <Typography sx={{ mb: 1, fontSize: 12 }}>
// // // // // // //                             <strong>{post?.user?.username || "username"}</strong>{" "}
// // // // // // //                             {post?.caption || "Post caption"}
// // // // // // //                         </Typography>
// // // // // // //                         {comments.map((c, i) => (
// // // // // // //                             <Box key={i} sx={{ mb: 1 }}>
// // // // // // //                                 {/* Comment Header */}
// // // // // // //                                 <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
// // // // // // //                                     <Avatar
// // // // // // //                                         sx={{ width: 24, height: 24, fontSize: 13 }}
// // // // // // //                                         src={c.avatar || ""}
// // // // // // //                                         alt={c.username}
// // // // // // //                                     />
// // // // // // //                                     <Typography variant="body2" sx={{ fontSize: 12 }}>
// // // // // // //                                         <strong>{c.user.username}</strong> {c.content}
// // // // // // //                                     </Typography>
// // // // // // //                                 </Box>

// // // // // // //                                 {/* Comment Footer */}
// // // // // // //                                 <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5, ml: 4 }}>
// // // // // // //                                     <Typography sx={{ fontSize: 10, color: "gray" }}>
// // // // // // //                                         {c.created_ago || "1d"}
// // // // // // //                                     </Typography>
// // // // // // //                                     {(c.likesCount || c.likes || 0) > 0 && (
// // // // // // //                                         <Typography sx={{ fontSize: 10, color: "gray" }}>
// // // // // // //                                             {c.likesCount || c.likes} likes
// // // // // // //                                         </Typography>
// // // // // // //                                     )}
// // // // // // //                                     <Typography sx={{ fontSize: 10, color: "gray", cursor: "pointer" }}
// // // // // // //                                         onClick={() => setReplyingTo(replyingTo === i ? null : i)}>
// // // // // // //                                         Reply
// // // // // // //                                     </Typography>
// // // // // // //                                     <FavoriteBorder sx={{ fontSize: 12, color: "gray", ml: "auto" }} />
// // // // // // //                                 </Box>
// // // // // // //                                 {/*reply input */}
// // // // // // //                                 {replyingTo === i && (
// // // // // // //                                     <Box sx={{ display: "flex", alignItems: "center", gap: 1, ml: 6, mt: 1 }}>
// // // // // // //                                         <InputBase
// // // // // // //                                             placeholder="reply comment...."
// // // // // // //                                             value={replyText}
// // // // // // //                                             onChange={(e) => setReplyText(e.target.value)}
// // // // // // //                                             onKeyDown={(e) => {
// // // // // // //                                                 if (e.key === "Enter" && !e.shiftKey) {
// // // // // // //                                                     e.preventDefault();
// // // // // // //                                                     handleAddReply(c.id);
// // // // // // //                                                 }
// // // // // // //                                             }}
// // // // // // //                                             sx={{
// // // // // // //                                                 flex: 1,
// // // // // // //                                                 fontSize: 13,
// // // // // // //                                                 px: 1,
// // // // // // //                                                 py: 0.5,
// // // // // // //                                                 border: "1px solid #ddd",
// // // // // // //                                                 borderRadius: 2,
// // // // // // //                                             }} />
// // // // // // //                                         <Typography
// // // // // // //                                             variant="body2"
// // // // // // //                                             sx={{
// // // // // // //                                                 color: replyText.trim() ? "#0095f6" : "gray",
// // // // // // //                                                 fontWeight: 600,
// // // // // // //                                                 cursor: replyText.trim() ? "pointer" : "default",
// // // // // // //                                             }}
// // // // // // //                                             onClick={() => handleAddReply(c.id)}
// // // // // // //                                         >
// // // // // // //                                             Post
// // // // // // //                                         </Typography>
// // // // // // //                                     </Box>
// // // // // // //                                 )}
// // // // // // //                                 {/* comment replies */}
// // // // // // //                                 {c.replies?.length > 0 && (
// // // // // // //                                     <Box sx={{ ml: 6, mt: 0.5 }}>
// // // // // // //                                         {c.replies.map((r, ri) => (
// // // // // // //                                             <Box key={ri} sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
// // // // // // //                                                 <Avatar
// // // // // // //                                                     sx={{ width: 24, height: 24, fontSize: 13, mr: 1 }}
// // // // // // //                                                     src={r.user.avatar || ""}
// // // // // // //                                                     alt={r.user.username}
// // // // // // //                                                 />
// // // // // // //                                                 <Typography variant="body2" sx={{ fontSize: 12 }}>
// // // // // // //                                                     <b>{r.user.username}</b> {r.content}
// // // // // // //                                                 </Typography>
// // // // // // //                                             </Box>
// // // // // // //                                         ))}
// // // // // // //                                     </Box>
// // // // // // //                                 )}
// // // // // // //                             </Box>
// // // // // // //                         ))}
// // // // // // //                     </Box>
// // // // // // //                     {/* Footer (Likes & Actions) */}
// // // // // // //                     <Box sx={{ px: 2, pb: 1 }}>
// // // // // // //                         <Box sx={{ display: "flex", justifyContent: "space-between" }}>
// // // // // // //                             <Box>
// // // // // // //                                 <IconButton onClick={() => likePost(post.id)}>
// // // // // // //                                     {liked ? (
// // // // // // //                                         <FavoriteIcon sx={{ color: "red" }} />
// // // // // // //                                     ) : (
// // // // // // //                                         <FavoriteBorder sx={{ color: "black" }} />
// // // // // // //                                     )}
// // // // // // //                                 </IconButton>
// // // // // // //                                 <IconButton>
// // // // // // //                                     <ModeCommentOutlined sx={{ color: "black" }} />
// // // // // // //                                 </IconButton>
// // // // // // //                                 <IconButton>
// // // // // // //                                     <SendOutlined sx={{ color: "black" }} />
// // // // // // //                                 </IconButton>
// // // // // // //                             </Box>
// // // // // // //                             <IconButton>
// // // // // // //                                 <BookmarkBorderRounded sx={{ color: "black" }} />
// // // // // // //                             </IconButton>
// // // // // // //                         </Box>
// // // // // // //                         <Typography sx={{ fontSize: 12, color: "gray" }}>{post.created_ago}</Typography>
// // // // // // //                     </Box>
// // // // // // //                     <Divider />
// // // // // // //                     {/* Comment Input */}
// // // // // // //                     <Box
// // // // // // //                         sx={{
// // // // // // //                             display: "flex",
// // // // // // //                             alignItems: "center",
// // // // // // //                             p: 1.5,
// // // // // // //                             borderTop: "1px solid #eee",
// // // // // // //                         }}
// // // // // // //                     >
// // // // // // //                         <IconButton size="small">
// // // // // // //                             <Face fontSize="small" />
// // // // // // //                         </IconButton>
// // // // // // //                         <InputBase
// // // // // // //                             placeholder="Add a comment..."
// // // // // // //                             value={comment}
// // // // // // //                             onChange={(e) => setComment(e.target.value)}
// // // // // // //                             onKeyDown={handleKeyDown}
// // // // // // //                             sx={{ flex: 1, mx: 1, fontSize: 14 }}
// // // // // // //                         />
// // // // // // //                         <Typography
// // // // // // //                             variant="body2"
// // // // // // //                             sx={{
// // // // // // //                                 color: comment.trim() ? "#0095f6" : "gray",
// // // // // // //                                 fontWeight: 600,
// // // // // // //                                 cursor: comment.trim() ? "pointer" : "default",
// // // // // // //                             }}
// // // // // // //                             onClick={() => handleAddComment(post.id)}
// // // // // // //                         >
// // // // // // //                             Post
// // // // // // //                         </Typography>
// // // // // // //                     </Box>
// // // // // // //                 </Box>
// // // // // // //             </Box>
// // // // // // //         </BootstrapDialog >
// // // // // // //     );
// // // // // // // }








// // // // // // // // "use client";

// // // // // // // // import React, { useState, useEffect } from "react";
// // // // // // // // import {
// // // // // // // //     Dialog,
// // // // // // // //     IconButton,
// // // // // // // //     Typography,
// // // // // // // //     CardMedia,
// // // // // // // //     Avatar,
// // // // // // // //     Box,
// // // // // // // //     InputBase,
// // // // // // // //     Divider,
// // // // // // // // } from "@mui/material";
// // // // // // // // import { styled } from "@mui/material/styles";
// // // // // // // // import CloseIcon from "@mui/icons-material/Close";
// // // // // // // // import {
// // // // // // // //     MoreHoriz,
// // // // // // // //     Face,
// // // // // // // //     FavoriteBorder,
// // // // // // // //     ModeCommentOutlined,
// // // // // // // //     SendOutlined,
// // // // // // // //     BookmarkBorderRounded,
// // // // // // // // } from "@mui/icons-material";
// // // // // // // // import FavoriteIcon from "@mui/icons-material/Favorite";
// // // // // // // // import axios from "../axios";

// // // // // // // // const BootstrapDialog = styled(Dialog)(({ theme }) => ({
// // // // // // // //     "& .MuiDialog-paper": {
// // // // // // // //         maxWidth: "900px",
// // // // // // // //         width: "90%",
// // // // // // // //         height: "90vh",
// // // // // // // //         display: "flex",
// // // // // // // //         overflow: "hidden",
// // // // // // // //         borderRadius: 12,
// // // // // // // //     },
// // // // // // // // }));

// // // // // // // // export default function CustomizedDialogs({ open, onClose, post }) {
// // // // // // // //     const [comment, setComment] = useState("");
// // // // // // // //     const [liked, setLiked] = useState(post.is_liked || false);
// // // // // // // //     const [likesCount, setLikesCount] = useState(post.likes_count || 0);
// // // // // // // //     const [comments, setComments] = useState([]);
// // // // // // // //     const [replyingTo, setReplyingTo] = useState(null);
// // // // // // // //     const [replyText, setReplyText] = useState("");

// // // // // // // //     // Add a reply (fixed — now uses index)
// // // // // // // //     const handleAddReply = (index) => {
// // // // // // // //         if (!replyText.trim()) return;

// // // // // // // //         const newReply = {
// // // // // // // //             content: replyText,
// // // // // // // //             user: { username: "you" },
// // // // // // // //         };

// // // // // // // //         setComments((prev) =>
// // // // // // // //             prev.map((comment, i) => {
// // // // // // // //                 if (i === index) {
// // // // // // // //                     return {
// // // // // // // //                         ...comment,
// // // // // // // //                         replies: [...(comment.replies || []), newReply],
// // // // // // // //                     };
// // // // // // // //                 }
// // // // // // // //                 return comment;
// // // // // // // //             })
// // // // // // // //         );

// // // // // // // //         setReplyText("");
// // // // // // // //         setReplyingTo(null);
// // // // // // // //     };

// // // // // // // //     // Like a post
// // // // // // // //     const likePost = async (id) => {
// // // // // // // //         try {
// // // // // // // //             const token = localStorage.getItem("token");
// // // // // // // //             const newLiked = !liked;
// // // // // // // //             setLiked(newLiked);
// // // // // // // //             setLikesCount((prev) => (newLiked ? prev + 1 : prev - 1));

// // // // // // // //             await axios.post(
// // // // // // // //                 `/api/post/${id}/like/`,
// // // // // // // //                 {},
// // // // // // // //                 { headers: { Authorization: `Bearer ${token}` } }
// // // // // // // //             );
// // // // // // // //         } catch (error) {
// // // // // // // //             console.error("Error liking post:", error);
// // // // // // // //         }
// // // // // // // //     };

// // // // // // // //     // Add a comment
// // // // // // // //     const handleAddComment = async (id) => {
// // // // // // // //         if (!comment.trim()) return;

// // // // // // // //         try {
// // // // // // // //             const payload = { content: comment };
// // // // // // // //             const response = await axios.post(`/api/post/${id}/comment/`, payload);

// // // // // // // //             const newComment = {
// // // // // // // //                 id: Date.now(), // temporary ID
// // // // // // // //                 content: comment,
// // // // // // // //                 created_ago: "just now",
// // // // // // // //                 likes: 0,
// // // // // // // //                 replies: [],
// // // // // // // //                 user: { username: post?.user?.username || "you" },
// // // // // // // //             };

// // // // // // // //             setComments((prev) => [...prev, newComment]);
// // // // // // // //             setComment("");

// // // // // // // //             console.log("Comment posted:", response.data);
// // // // // // // //         } catch (error) {
// // // // // // // //             console.error("Error posting comment:", error);
// // // // // // // //         }
// // // // // // // //     };

// // // // // // // //     // Handle Enter key for comment
// // // // // // // //     const handleKeyDown = (event) => {
// // // // // // // //         if (event.key === "Enter" && !event.shiftKey) {
// // // // // // // //             event.preventDefault();
// // // // // // // //             handleAddComment(post.id);
// // // // // // // //         }
// // // // // // // //     };

// // // // // // // //     return (
// // // // // // // //         <BootstrapDialog open={open} onClose={onClose}>
// // // // // // // //             <Box sx={{ display: "flex", width: "100%", height: "100%" }}>
// // // // // // // //                 {/* Left: Image */}
// // // // // // // //                 <Box
// // // // // // // //                     sx={{
// // // // // // // //                         flex: 1,
// // // // // // // //                         backgroundColor: "#000",
// // // // // // // //                         display: "flex",
// // // // // // // //                         alignItems: "center",
// // // // // // // //                         justifyContent: "center",
// // // // // // // //                         position: "relative",
// // // // // // // //                     }}
// // // // // // // //                 >
// // // // // // // //                     <IconButton
// // // // // // // //                         aria-label="close"
// // // // // // // //                         onClick={onClose}
// // // // // // // //                         sx={{
// // // // // // // //                             position: "absolute",
// // // // // // // //                             right: 10,
// // // // // // // //                             top: 10,
// // // // // // // //                             color: "white",
// // // // // // // //                             background: "rgba(0,0,0,0.5)",
// // // // // // // //                             "&:hover": { background: "rgba(0,0,0,0.7)" },
// // // // // // // //                         }}
// // // // // // // //                     >
// // // // // // // //                         <CloseIcon />
// // // // // // // //                     </IconButton>
// // // // // // // //                     <CardMedia
// // // // // // // //                         component="img"
// // // // // // // //                         src={post?.media?.[0]?.file || "/placeholder.jpg"}
// // // // // // // //                         alt={post?.caption || "Post image"}
// // // // // // // //                         sx={{
// // // // // // // //                             height: "100%",
// // // // // // // //                             width: "100%",
// // // // // // // //                             objectFit: "contain",
// // // // // // // //                         }}
// // // // // // // //                     />
// // // // // // // //                 </Box>

// // // // // // // //                 {/* Right: Comments panel */}
// // // // // // // //                 <Box
// // // // // // // //                     sx={{
// // // // // // // //                         flexBasis: 380,
// // // // // // // //                         display: "flex",
// // // // // // // //                         flexDirection: "column",
// // // // // // // //                         bgcolor: "background.paper",
// // // // // // // //                     }}
// // // // // // // //                 >
// // // // // // // //                     {/* Header */}
// // // // // // // //                     <Box
// // // // // // // //                         sx={{
// // // // // // // //                             display: "flex",
// // // // // // // //                             alignItems: "center",
// // // // // // // //                             justifyContent: "space-between",
// // // // // // // //                             p: 2,
// // // // // // // //                             borderBottom: "1px solid #eee",
// // // // // // // //                         }}
// // // // // // // //                     >
// // // // // // // //                         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
// // // // // // // //                             <Avatar>{post?.user?.name ? post.user.name[0] : "U"}</Avatar>
// // // // // // // //                             <Typography fontWeight={600}>
// // // // // // // //                                 {post?.user?.username || "username"}
// // // // // // // //                             </Typography>
// // // // // // // //                         </Box>
// // // // // // // //                         <IconButton>
// // // // // // // //                             <MoreHoriz />
// // // // // // // //                         </IconButton>
// // // // // // // //                     </Box>

// // // // // // // //                     {/* Comments Section */}
// // // // // // // //                     <Box sx={{ flex: 1, overflowY: "auto", p: 2, maxHeight: "60vh" }}>
// // // // // // // //                         <Typography sx={{ mb: 1, fontSize: 12 }}>
// // // // // // // //                             <strong>{post?.user?.username || "username"}</strong>{" "}
// // // // // // // //                             {post?.caption || "Post caption"}
// // // // // // // //                         </Typography>

// // // // // // // //                         {comments.map((c, i) => (
// // // // // // // //                             <Box key={i} sx={{ mb: 1 }}>
// // // // // // // //                                 {/* Comment Header */}
// // // // // // // //                                 <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
// // // // // // // //                                     <Avatar
// // // // // // // //                                         sx={{ width: 24, height: 24, fontSize: 13 }}
// // // // // // // //                                         src={c.avatar || ""}
// // // // // // // //                                         alt={c.username}
// // // // // // // //                                     />
// // // // // // // //                                     <Typography variant="body2" sx={{ fontSize: 12 }}>
// // // // // // // //                                         <strong>{c.user.username}</strong> {c.content}
// // // // // // // //                                     </Typography>
// // // // // // // //                                 </Box>

// // // // // // // //                                 {/* Comment Footer */}
// // // // // // // //                                 <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5, ml: 4 }}>
// // // // // // // //                                     <Typography sx={{ fontSize: 10, color: "gray" }}>
// // // // // // // //                                         {c.created_ago || "1d"}
// // // // // // // //                                     </Typography>
// // // // // // // //                                     {(c.likesCount || c.likes || 0) > 0 && (
// // // // // // // //                                         <Typography sx={{ fontSize: 10, color: "gray" }}>
// // // // // // // //                                             {c.likesCount || c.likes} likes
// // // // // // // //                                         </Typography>
// // // // // // // //                                     )}
// // // // // // // //                                     <Typography
// // // // // // // //                                         sx={{
// // // // // // // //                                             fontSize: 10,
// // // // // // // //                                             color: "gray",
// // // // // // // //                                             cursor: "pointer",
// // // // // // // //                                         }}
// // // // // // // //                                         onClick={() =>
// // // // // // // //                                             setReplyingTo(replyingTo === i ? null : i)
// // // // // // // //                                         }
// // // // // // // //                                     >
// // // // // // // //                                         Reply
// // // // // // // //                                     </Typography>
// // // // // // // //                                     <FavoriteBorder
// // // // // // // //                                         sx={{ fontSize: 12, color: "gray", ml: "auto" }}
// // // // // // // //                                     />
// // // // // // // //                                 </Box>

// // // // // // // //                                 {/* Reply input */}
// // // // // // // //                                 {replyingTo === i && (
// // // // // // // //                                     <Box
// // // // // // // //                                         sx={{
// // // // // // // //                                             display: "flex",
// // // // // // // //                                             alignItems: "center",
// // // // // // // //                                             gap: 1,
// // // // // // // //                                             ml: 6,
// // // // // // // //                                             mt: 1,
// // // // // // // //                                         }}
// // // // // // // //                                     >
// // // // // // // //                                         <InputBase
// // // // // // // //                                             placeholder="Reply comment..."
// // // // // // // //                                             value={replyText}
// // // // // // // //                                             onChange={(e) =>
// // // // // // // //                                                 setReplyText(e.target.value)
// // // // // // // //                                             }
// // // // // // // //                                             onKeyDown={(e) => {
// // // // // // // //                                                 if (e.key === "Enter" && !e.shiftKey) {
// // // // // // // //                                                     e.preventDefault();
// // // // // // // //                                                     handleAddReply(i);
// // // // // // // //                                                 }
// // // // // // // //                                             }}
// // // // // // // //                                             sx={{
// // // // // // // //                                                 flex: 1,
// // // // // // // //                                                 fontSize: 13,
// // // // // // // //                                                 px: 1,
// // // // // // // //                                                 py: 0.5,
// // // // // // // //                                                 border: "1px solid #ddd",
// // // // // // // //                                                 borderRadius: 2,
// // // // // // // //                                             }}
// // // // // // // //                                         />
// // // // // // // //                                         <Typography
// // // // // // // //                                             variant="body2"
// // // // // // // //                                             sx={{
// // // // // // // //                                                 color: replyText.trim()
// // // // // // // //                                                     ? "#0095f6"
// // // // // // // //                                                     : "gray",
// // // // // // // //                                                 fontWeight: 600,
// // // // // // // //                                                 cursor: replyText.trim()
// // // // // // // //                                                     ? "pointer"
// // // // // // // //                                                     : "default",
// // // // // // // //                                             }}
// // // // // // // //                                             onClick={() => handleAddReply(i)}
// // // // // // // //                                         >
// // // // // // // //                                             Post
// // // // // // // //                                         </Typography>
// // // // // // // //                                     </Box>
// // // // // // // //                                 )}

// // // // // // // //                                 {/* Comment replies */}
// // // // // // // //                                 {c.replies?.length > 0 && (
// // // // // // // //                                     <Box sx={{ ml: 6, mt: 0.5 }}>
// // // // // // // //                                         {c.replies.map((r, ri) => (
// // // // // // // //                                             <Box
// // // // // // // //                                                 key={ri}
// // // // // // // //                                                 sx={{
// // // // // // // //                                                     display: "flex",
// // // // // // // //                                                     alignItems: "center",
// // // // // // // //                                                     mb: 0.5,
// // // // // // // //                                                 }}
// // // // // // // //                                             >
// // // // // // // //                                                 <Avatar
// // // // // // // //                                                     sx={{
// // // // // // // //                                                         width: 24,
// // // // // // // //                                                         height: 24,
// // // // // // // //                                                         fontSize: 13,
// // // // // // // //                                                         mr: 1,
// // // // // // // //                                                     }}
// // // // // // // //                                                     src={r.user.avatar || ""}
// // // // // // // //                                                     alt={r.user.username}
// // // // // // // //                                                 />
// // // // // // // //                                                 <Typography
// // // // // // // //                                                     variant="body2"
// // // // // // // //                                                     sx={{ fontSize: 12 }}
// // // // // // // //                                                 >
// // // // // // // //                                                     <b>{r.user.username}</b> {r.content}
// // // // // // // //                                                 </Typography>
// // // // // // // //                                             </Box>
// // // // // // // //                                         ))}
// // // // // // // //                                     </Box>
// // // // // // // //                                 )}
// // // // // // // //                             </Box>
// // // // // // // //                         ))}
// // // // // // // //                     </Box>

// // // // // // // //                     {/* Footer (Likes & Actions) */}
// // // // // // // //                     <Box sx={{ px: 2, pb: 1 }}>
// // // // // // // //                         <Box sx={{ display: "flex", justifyContent: "space-between" }}>
// // // // // // // //                             <Box>
// // // // // // // //                                 <IconButton onClick={() => likePost(post.id)}>
// // // // // // // //                                     {liked ? (
// // // // // // // //                                         <FavoriteIcon sx={{ color: "red" }} />
// // // // // // // //                                     ) : (
// // // // // // // //                                         <FavoriteBorder sx={{ color: "black" }} />
// // // // // // // //                                     )}
// // // // // // // //                                 </IconButton>
// // // // // // // //                                 <IconButton>
// // // // // // // //                                     <ModeCommentOutlined sx={{ color: "black" }} />
// // // // // // // //                                 </IconButton>
// // // // // // // //                                 <IconButton>
// // // // // // // //                                     <SendOutlined sx={{ color: "black" }} />
// // // // // // // //                                 </IconButton>
// // // // // // // //                             </Box>
// // // // // // // //                             <IconButton>
// // // // // // // //                                 <BookmarkBorderRounded sx={{ color: "black" }} />
// // // // // // // //                             </IconButton>
// // // // // // // //                         </Box>
// // // // // // // //                         <Typography sx={{ fontSize: 12, color: "gray" }}>
// // // // // // // //                             {post.created_ago}
// // // // // // // //                         </Typography>
// // // // // // // //                     </Box>

// // // // // // // //                     <Divider />

// // // // // // // //                     {/* Comment Input */}
// // // // // // // //                     <Box
// // // // // // // //                         sx={{
// // // // // // // //                             display: "flex",
// // // // // // // //                             alignItems: "center",
// // // // // // // //                             p: 1.5,
// // // // // // // //                             borderTop: "1px solid #eee",
// // // // // // // //                         }}
// // // // // // // //                     >
// // // // // // // //                         <IconButton size="small">
// // // // // // // //                             <Face fontSize="small" />
// // // // // // // //                         </IconButton>
// // // // // // // //                         <InputBase
// // // // // // // //                             placeholder="Add a comment..."
// // // // // // // //                             value={comment}
// // // // // // // //                             onChange={(e) => setComment(e.target.value)}
// // // // // // // //                             onKeyDown={handleKeyDown}
// // // // // // // //                             sx={{ flex: 1, mx: 1, fontSize: 14 }}
// // // // // // // //                         />
// // // // // // // //                         <Typography
// // // // // // // //                             variant="body2"
// // // // // // // //                             sx={{
// // // // // // // //                                 color: comment.trim() ? "#0095f6" : "gray",
// // // // // // // //                                 fontWeight: 600,
// // // // // // // //                                 cursor: comment.trim() ? "pointer" : "default",
// // // // // // // //                             }}
// // // // // // // //                             onClick={() => handleAddComment(post.id)}
// // // // // // // //                         >
// // // // // // // //                             Post
// // // // // // // //                         </Typography>
// // // // // // // //                     </Box>
// // // // // // // //                 </Box>
// // // // // // // //             </Box>
// // // // // // // //         </BootstrapDialog>
// // // // // // // //     );
// // // // // // // // }



// // // // // // // // // "use client";

// // // // // // // // // import React, { useState, useEffect } from "react";
// // // // // // // // // import {
// // // // // // // // //   Card,
// // // // // // // // //   CardHeader,
// // // // // // // // //   Avatar,
// // // // // // // // //   Typography,
// // // // // // // // //   Box,
// // // // // // // // //   Button,
// // // // // // // // //   InputBase,
// // // // // // // // //   Stack,
// // // // // // // // // } from "@mui/material";
// // // // // // // // // import FavoriteIcon from "@mui/icons-material/Favorite";
// // // // // // // // // import CommentIcon from "@mui/icons-material/Comment";
// // // // // // // // // import MoreVertIcon from "@mui/icons-material/MoreVert";
// // // // // // // // // import CloseIcon from "@mui/icons-material/Close";
// // // // // // // // // import axios from "axios";

// // // // // // // // // export default function PostList() {
// // // // // // // // //   const [posts, setPosts] = useState([]);
// // // // // // // // //   const [openCommentPostId, setOpenCommentPostId] = useState(null);
// // // // // // // // //   const [comment, setComment] = useState("");
// // // // // // // // //   const [replyInputs, setReplyInputs] = useState({}); // { commentId: "text" }
// // // // // // // // //   const [activeReplyId, setActiveReplyId] = useState(null); // which comment’s reply box is open
// // // // // // // // //   const [comments, setComments] = useState({}); // { postId: [comments...] }

// // // // // // // // //   // Fetch posts
// // // // // // // // //   const getPosts = async () => {
// // // // // // // // //     try {
// // // // // // // // //       const token = localStorage.getItem("token");
// // // // // // // // //       const res = await axios.get("http://192.168.10.6:8000/post/list", {
// // // // // // // // //         headers: { Authorization: `Token ${token}` },
// // // // // // // // //       });
// // // // // // // // //       setPosts(res.data);
// // // // // // // // //     } catch (error) {
// // // // // // // // //       console.error("Error fetching posts:", error);
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   // Fetch comments for one post
// // // // // // // // //   const fetchComments = async (postId) => {
// // // // // // // // //     try {
// // // // // // // // //       const token = localStorage.getItem("token");
// // // // // // // // //       const res = await axios.get(
// // // // // // // // //         `http://192.168.10.6:8000/postcomment/?post=${postId}`,
// // // // // // // // //         { headers: { Authorization: `Token ${token}` } }
// // // // // // // // //       );
// // // // // // // // //       setComments((prev) => ({ ...prev, [postId]: res.data }));
// // // // // // // // //     } catch (error) {
// // // // // // // // //       console.error("Error fetching comments:", error);
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   // Like / Unlike
// // // // // // // // //   const likePost = async (postId, isLiked) => {
// // // // // // // // //     try {
// // // // // // // // //       const token = localStorage.getItem("token");
// // // // // // // // //       if (isLiked) {
// // // // // // // // //         await axios.delete(`http://192.168.10.6:8000/postlike/delete/${postId}`, {
// // // // // // // // //           headers: { Authorization: `Token ${token}` },
// // // // // // // // //         });
// // // // // // // // //       } else {
// // // // // // // // //         await axios.post(
// // // // // // // // //           "http://192.168.10.6:8000/postlike/create",
// // // // // // // // //           { post: postId },
// // // // // // // // //           { headers: { Authorization: `Token ${token}` } }
// // // // // // // // //         );
// // // // // // // // //       }
// // // // // // // // //       await getPosts();
// // // // // // // // //     } catch (error) {
// // // // // // // // //       console.error("Error toggling like:", error);
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   // Post a new comment
// // // // // // // // //   const handleCommentSubmit = async (postId) => {
// // // // // // // // //     try {
// // // // // // // // //       const token = localStorage.getItem("token");
// // // // // // // // //       await axios.post(
// // // // // // // // //         "http://192.168.10.6:8000/postcomment/create",
// // // // // // // // //         { post: postId, content: comment },
// // // // // // // // //         { headers: { Authorization: `Token ${token}` } }
// // // // // // // // //       );
// // // // // // // // //       setComment("");
// // // // // // // // //       fetchComments(postId);
// // // // // // // // //     } catch (error) {
// // // // // // // // //       console.error("Error posting comment:", error);
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   // Post a reply
// // // // // // // // //   const handleReplySubmit = async (postId, parentCommentId) => {
// // // // // // // // //     try {
// // // // // // // // //       const token = localStorage.getItem("token");
// // // // // // // // //       const replyText = replyInputs[parentCommentId];
// // // // // // // // //       if (!replyText) return;

// // // // // // // // //       await axios.post(
// // // // // // // // //         "http://192.168.10.6:8000/postcomment/create",
// // // // // // // // //         { post: postId, content: replyText, parent: parentCommentId },
// // // // // // // // //         { headers: { Authorization: `Token ${token}` } }
// // // // // // // // //       );
// // // // // // // // //       setReplyInputs((prev) => ({ ...prev, [parentCommentId]: "" }));
// // // // // // // // //       setActiveReplyId(null);
// // // // // // // // //       fetchComments(postId);
// // // // // // // // //     } catch (error) {
// // // // // // // // //       console.error("Error posting reply:", error);
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   // Toggle comments section
// // // // // // // // //   const handleShowComment = (postId) => {
// // // // // // // // //     if (openCommentPostId === postId) {
// // // // // // // // //       setOpenCommentPostId(null);
// // // // // // // // //       setActiveReplyId(null);
// // // // // // // // //     } else {
// // // // // // // // //       setOpenCommentPostId(postId);
// // // // // // // // //       fetchComments(postId);
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   useEffect(() => {
// // // // // // // // //     getPosts();
// // // // // // // // //   }, []);

// // // // // // // // //   return (
// // // // // // // // //     <Box sx={{ p: 3 }}>
// // // // // // // // //       {posts.map((post) => (
// // // // // // // // //         <Card key={post.id} sx={{ p: 2, borderRadius: 5, mt: 4, boxShadow: 3 }}>
// // // // // // // // //           <Stack>
// // // // // // // // //             {/* Header */}
// // // // // // // // //             <CardHeader
// // // // // // // // //               avatar={<Avatar sx={{ bgcolor: "purple" }}>{post.user.first_name?.[0]}</Avatar>}
// // // // // // // // //               action={
// // // // // // // // //                 <Box sx={{ ml: 2 }}>
// // // // // // // // //                   <MoreVertIcon />
// // // // // // // // //                   <CloseIcon />
// // // // // // // // //                 </Box>
// // // // // // // // //               }
// // // // // // // // //               title={`${post.user.first_name} ${post.user.last_name}`}
// // // // // // // // //               subheader={
// // // // // // // // //                 <Typography sx={{ fontSize: 12, color: "gray" }}>
// // // // // // // // //                   {new Date(post.created_at).toLocaleString()}
// // // // // // // // //                 </Typography>
// // // // // // // // //               }
// // // // // // // // //             />
// // // // // // // // //             <hr />
// // // // // // // // //             {/* Content */}
// // // // // // // // //             <Typography variant="h6" sx={{ mt: 2 }}>
// // // // // // // // //               {post.content}
// // // // // // // // //             </Typography>

// // // // // // // // //             {/* Like + Comment Buttons */}
// // // // // // // // //             <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
// // // // // // // // //               <Box
// // // // // // // // //                 sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "pointer" }}
// // // // // // // // //                 onClick={() => likePost(post.id, post.is_liked)}
// // // // // // // // //               >
// // // // // // // // //                 <FavoriteIcon sx={{ color: post.is_liked ? "red" : "gray" }} />
// // // // // // // // //                 <Typography>{post.is_liked ? "Unlike" : "Like"}</Typography>
// // // // // // // // //               </Box>
// // // // // // // // //               <Box
// // // // // // // // //                 sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "pointer" }}
// // // // // // // // //                 onClick={() => handleShowComment(post.id)}
// // // // // // // // //               >
// // // // // // // // //                 <CommentIcon />
// // // // // // // // //                 <Typography>Comment</Typography>
// // // // // // // // //               </Box>
// // // // // // // // //             </Box>

// // // // // // // // //             {/* Comments */}
// // // // // // // // //             {openCommentPostId === post.id && (
// // // // // // // // //               <Box sx={{ mt: 2 }}>
// // // // // // // // //                 <InputBase
// // // // // // // // //                   placeholder="Write a comment..."
// // // // // // // // //                   value={comment}
// // // // // // // // //                   onChange={(e) => setComment(e.target.value)}
// // // // // // // // //                   sx={{
// // // // // // // // //                     border: "1px solid #ccc",
// // // // // // // // //                     borderRadius: 2,
// // // // // // // // //                     px: 2,
// // // // // // // // //                     py: 1,
// // // // // // // // //                     width: "100%",
// // // // // // // // //                   }}
// // // // // // // // //                 />
// // // // // // // // //                 <Button
// // // // // // // // //                   variant="contained"
// // // // // // // // //                   size="small"
// // // // // // // // //                   sx={{ mt: 1, backgroundColor: "gray" }}
// // // // // // // // //                   onClick={() => handleCommentSubmit(post.id)}
// // // // // // // // //                 >
// // // // // // // // //                   Post Comment
// // // // // // // // //                 </Button>

// // // // // // // // //                 {/* Show Comments + Replies */}
// // // // // // // // //                 {comments[post.id]?.map((c) => (
// // // // // // // // //                   <Box key={c.id} sx={{ mt: 1, pl: 1 }}>
// // // // // // // // //                     <Typography variant="body2">
// // // // // // // // //                       <b>{c.user.first_name}</b>: {c.content}
// // // // // // // // //                     </Typography>

// // // // // // // // //                     {/* Reply Button */}
// // // // // // // // //                     <Button
// // // // // // // // //                       size="small"
// // // // // // // // //                       sx={{ textTransform: "none", color: "gray" }}
// // // // // // // // //                       onClick={() =>
// // // // // // // // //                         setActiveReplyId(activeReplyId === c.id ? null : c.id)
// // // // // // // // //                       }
// // // // // // // // //                     >
// // // // // // // // //                       Reply
// // // // // // // // //                     </Button>

// // // // // // // // //                     {/* Reply Input */}
// // // // // // // // //                     {activeReplyId === c.id && (
// // // // // // // // //                       <Box sx={{ mt: 1, ml: 3 }}>
// // // // // // // // //                         <InputBase
// // // // // // // // //                           placeholder="Write a reply..."
// // // // // // // // //                           value={replyInputs[c.id] || ""}
// // // // // // // // //                           onChange={(e) =>
// // // // // // // // //                             setReplyInputs((prev) => ({
// // // // // // // // //                               ...prev,
// // // // // // // // //                               [c.id]: e.target.value,
// // // // // // // // //                             }))
// // // // // // // // //                           }
// // // // // // // // //                           sx={{
// // // // // // // // //                             border: "1px solid #ccc",
// // // // // // // // //                             borderRadius: 2,
// // // // // // // // //                             px: 2,
// // // // // // // // //                             py: 1,
// // // // // // // // //                             width: "80%",
// // // // // // // // //                           }}
// // // // // // // // //                         />
// // // // // // // // //                         <Button
// // // // // // // // //                           variant="contained"
// // // // // // // // //                           size="small"
// // // // // // // // //                           sx={{ ml: 1, backgroundColor: "gray" }}
// // // // // // // // //                           onClick={() => handleReplySubmit(post.id, c.id)}
// // // // // // // // //                         >
// // // // // // // // //                           Reply
// // // // // // // // //                         </Button>
// // // // // // // // //                       </Box>
// // // // // // // // //                     )}

// // // // // // // // //                     {/* Render replies */}
// // // // // // // // //                     {c.replies?.map((r) => (
// // // // // // // // //                       <Typography
// // // // // // // // //                         key={r.id}
// // // // // // // // //                         variant="body2"
// // // // // // // // //                         sx={{ mt: 0.5, ml: 4 }}
// // // // // // // // //                       >
// // // // // // // // //                         ↳ <b>{r.user.first_name}</b>: {r.content}
// // // // // // // // //                       </Typography>
// // // // // // // // //                     ))}
// // // // // // // // //                   </Box>
// // // // // // // // //                 ))}
// // // // // // // // //               </Box>
// // // // // // // // //             )}
// // // // // // // // //           </Stack>
// // // // // // // // //         </Card>
// // // // // // // // //       ))}
// // // // // // // // //     </Box>
// // // // // // // // //   );
// // // // // // // // // }



// // // // // // // // // // "use client";

// // // // // // // // // // import React, { useState } from "react";
// // // // // // // // // // import {
// // // // // // // // // //   Avatar,
// // // // // // // // // //   Box,
// // // // // // // // // //   Card,
// // // // // // // // // //   CardHeader,
// // // // // // // // // //   InputBase,
// // // // // // // // // //   CardMedia,
// // // // // // // // // //   CardContent,
// // // // // // // // // //   CardActions,
// // // // // // // // // //   IconButton,
// // // // // // // // // //   Typography,
// // // // // // // // // //   Dialog,
// // // // // // // // // //   DialogTitle,
// // // // // // // // // //   DialogContent,
// // // // // // // // // // } from "@mui/material";
// // // // // // // // // // import {
// // // // // // // // // //   MoreHoriz,
// // // // // // // // // //   FavoriteBorder,
// // // // // // // // // //   ModeCommentOutlined,
// // // // // // // // // //   SendOutlined,
// // // // // // // // // //   Face,
// // // // // // // // // //   BookmarkBorderRounded,
// // // // // // // // // // } from "@mui/icons-material";
// // // // // // // // // // import FavoriteIcon from "@mui/icons-material/Favorite";
// // // // // // // // // // import axios from "../axios";

// // // // // // // // // // const MomentoPost = ({ post }) => {
// // // // // // // // // //   const [liked, setLiked] = useState(post.is_liked || false);
// // // // // // // // // //   const [likesCount, setLikesCount] = useState(post.likes || 0);
// // // // // // // // // //   const [comment, setComment] = useState("");
// // // // // // // // // //   const [openCommentDialog, setOpenCommentDialog] = useState(false);

// // // // // // // // // //   // ✅ Like Post API
// // // // // // // // // //   const likePost = async (id) => {
// // // // // // // // // //     try {
// // // // // // // // // //       const token = localStorage.getItem("token");
// // // // // // // // // //       setLiked(!liked);
// // // // // // // // // //       setLikesCount((prev) => (liked ? prev - 1 : prev + 1));

// // // // // // // // // //       await axios.post(
// // // // // // // // // //         `/api/post/${id}/like/`,
// // // // // // // // // //         {},
// // // // // // // // // //         { headers: { Authorization: `Bearer ${token}` } }
// // // // // // // // // //       );
// // // // // // // // // //     } catch (error) {
// // // // // // // // // //       console.error("Error liking post:", error);
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   return (
// // // // // // // // // //     <Card
// // // // // // // // // //       variant="outlined"
// // // // // // // // // //       sx={{
// // // // // // // // // //         width: "100%",
// // // // // // // // // //         maxWidth: 400,
// // // // // // // // // //         borderRadius: 2,
// // // // // // // // // //         boxShadow: "none",
// // // // // // // // // //         borderColor: "#ddd",
// // // // // // // // // //       }}
// // // // // // // // // //     >
// // // // // // // // // //       {/* Header */}
// // // // // // // // // //       <CardHeader
// // // // // // // // // //         avatar={
// // // // // // // // // //           <Box
// // // // // // // // // //             sx={{
// // // // // // // // // //               position: "relative",
// // // // // // // // // //               "&::before": {
// // // // // // // // // //                 content: '""',
// // // // // // // // // //                 position: "absolute",
// // // // // // // // // //                 top: 0,
// // // // // // // // // //                 left: 0,
// // // // // // // // // //                 bottom: 0,
// // // // // // // // // //                 right: 0,
// // // // // // // // // //                 m: "-2px",
// // // // // // // // // //                 borderRadius: "50%",
// // // // // // // // // //                 background:
// // // // // // // // // //                   "linear-gradient(45deg, #e841cfff, #e24e89ff, #f093ceff, #f8aee9ff, #ede6ecff)",
// // // // // // // // // //               },
// // // // // // // // // //             }}
// // // // // // // // // //           >
// // // // // // // // // //             <Avatar
// // // // // // // // // //               sx={{
// // // // // // // // // //                 p: 0.5,
// // // // // // // // // //                 border: "2px solid",
// // // // // // // // // //                 borderColor: "background.paper",
// // // // // // // // // //                 position: "relative",
// // // // // // // // // //                 zIndex: 1,
// // // // // // // // // //               }}
// // // // // // // // // //             >
// // // // // // // // // //               {post.user.name?.[0]}
// // // // // // // // // //             </Avatar>
// // // // // // // // // //           </Box>
// // // // // // // // // //         }
// // // // // // // // // //         action={
// // // // // // // // // //           <IconButton>
// // // // // // // // // //             <MoreHoriz sx={{ color: "black" }} />
// // // // // // // // // //           </IconButton>
// // // // // // // // // //         }
// // // // // // // // // //         title={post.user.username}
// // // // // // // // // //         subheader={
// // // // // // // // // //           <Typography sx={{ fontSize: 12, color: "gray" }}>
// // // // // // // // // //             {post.created_ago}
// // // // // // // // // //           </Typography>
// // // // // // // // // //         }
// // // // // // // // // //       />

// // // // // // // // // //       {/* Post Image */}
// // // // // // // // // //       <CardMedia
// // // // // // // // // //         component="img"
// // // // // // // // // //         src={post?.media?.[0]?.file}
// // // // // // // // // //         alt={post.caption || "Post image"}
// // // // // // // // // //         sx={{
// // // // // // // // // //           width: "100%",
// // // // // // // // // //           height: 400,
// // // // // // // // // //           objectFit: "cover",
// // // // // // // // // //         }}
// // // // // // // // // //       />

// // // // // // // // // //       {/* Action Icons */}
// // // // // // // // // //       <CardActions
// // // // // // // // // //         disableSpacing
// // // // // // // // // //         sx={{
// // // // // // // // // //           display: "flex",
// // // // // // // // // //           justifyContent: "space-between",
// // // // // // // // // //           px: 1,
// // // // // // // // // //           pt: 1,
// // // // // // // // // //         }}
// // // // // // // // // //       >
// // // // // // // // // //         <Box>
// // // // // // // // // //           <IconButton onClick={() => likePost(post.id)}>
// // // // // // // // // //             {liked ? (
// // // // // // // // // //               <FavoriteIcon sx={{ color: "red" }} />
// // // // // // // // // //             ) : (
// // // // // // // // // //               <FavoriteBorder sx={{ color: "black" }} />
// // // // // // // // // //             )}
// // // // // // // // // //             <Typography sx={{ ml: 0.5 }}>{likesCount}</Typography>
// // // // // // // // // //           </IconButton>

// // // // // // // // // //           <IconButton onClick={() => setOpenCommentDialog(true)}>
// // // // // // // // // //             <ModeCommentOutlined sx={{ color: "black" }} />
// // // // // // // // // //           </IconButton>

// // // // // // // // // //           <IconButton>
// // // // // // // // // //             <SendOutlined sx={{ color: "black" }} />
// // // // // // // // // //           </IconButton>
// // // // // // // // // //         </Box>

// // // // // // // // // //         <IconButton>
// // // // // // // // // //           <BookmarkBorderRounded sx={{ color: "black" }} />
// // // // // // // // // //         </IconButton>
// // // // // // // // // //       </CardActions>

// // // // // // // // // //       {/* Caption */}
// // // // // // // // // //       <CardContent sx={{ pt: 0 }}>
// // // // // // // // // //         <Typography variant="body2" sx={{ mt: 0.5 }}>
// // // // // // // // // //           <Box component="span" sx={{ fontWeight: 600, mr: 1 }}>
// // // // // // // // // //             {post.user.username}
// // // // // // // // // //           </Box>
// // // // // // // // // //           {post.caption}
// // // // // // // // // //         </Typography>
// // // // // // // // // //         <Typography
// // // // // // // // // //           variant="caption"
// // // // // // // // // //           color="text.secondary"
// // // // // // // // // //           sx={{ display: "block", mt: 0.5 }}
// // // // // // // // // //         >
// // // // // // // // // //           {post.created_ago}
// // // // // // // // // //         </Typography>
// // // // // // // // // //       </CardContent>

// // // // // // // // // //       {/* Comment Dialog */}
// // // // // // // // // //       <Dialog
// // // // // // // // // //         open={openCommentDialog}
// // // // // // // // // //         onClose={() => setOpenCommentDialog(false)}
// // // // // // // // // //         fullWidth
// // // // // // // // // //         maxWidth="sm"
// // // // // // // // // //       >
// // // // // // // // // //         <DialogTitle>Comments</DialogTitle>
// // // // // // // // // //         <DialogContent>
// // // // // // // // // //           <Typography sx={{ mb: 2 }}>Add your comment:</Typography>
// // // // // // // // // //           <Box sx={{ display: "flex", alignItems: "center" }}>
// // // // // // // // // //             <IconButton size="small">
// // // // // // // // // //               <Face fontSize="small" />
// // // // // // // // // //             </IconButton>
// // // // // // // // // //             <InputBase
// // // // // // // // // //               placeholder="Write a comment..."
// // // // // // // // // //               value={comment}
// // // // // // // // // //               onChange={(e) => setComment(e.target.value)}
// // // // // // // // // //               sx={{ flex: 1, mx: 1, fontSize: 14 }}
// // // // // // // // // //             />
// // // // // // // // // //             <Typography
// // // // // // // // // //               variant="body2"
// // // // // // // // // //               sx={{
// // // // // // // // // //                 color: comment.trim() ? "#0095f6" : "gray",
// // // // // // // // // //                 fontWeight: 600,
// // // // // // // // // //                 cursor: comment.trim() ? "pointer" : "default",
// // // // // // // // // //               }}
// // // // // // // // // //               onClick={() => {
// // // // // // // // // //                 if (!comment.trim()) return;
// // // // // // // // // //                 console.log("Comment posted:", comment);
// // // // // // // // // //                 setComment("");
// // // // // // // // // //               }}
// // // // // // // // // //             >
// // // // // // // // // //               Post
// // // // // // // // // //             </Typography>
// // // // // // // // // //           </Box>
// // // // // // // // // //         </DialogContent>
// // // // // // // // // //       </Dialog>
// // // // // // // // // //     </Card>
// // // // // // // // // //   );
// // // // // // // // // // };

// // // // // // // // // // export default MomentoPost;
// // // // // // // // // // // "use client";

// // // // // // // // // // // import React, { useState } from "react";
// // // // // // // // // // // import {
// // // // // // // // // // //     Dialog,
// // // // // // // // // // //     IconButton,
// // // // // // // // // // //     Typography,
// // // // // // // // // // //     CardMedia,
// // // // // // // // // // //     Avatar,
// // // // // // // // // // //     Box,
// // // // // // // // // // //     InputBase,
// // // // // // // // // // //     Divider,
// // // // // // // // // // // } from "@mui/material";
// // // // // // // // // // // import { styled } from "@mui/material/styles";
// // // // // // // // // // // import CloseIcon from "@mui/icons-material/Close";
// // // // // // // // // // // import { MoreHoriz, Face } from "@mui/icons-material";

// // // // // // // // // // // const BootstrapDialog = styled(Dialog)(({ theme }) => ({
// // // // // // // // // // //         "& .MuiDialog-paper": {
// // // // // // // // // // //             maxWidth: "900px",
// // // // // // // // // // //             width: "90%",
// // // // // // // // // // //             height: "90vh",
// // // // // // // // // // //             display: "flex",
// // // // // // // // // // //             overflow: "hidden",
// // // // // // // // // // //             borderRadius: 12,
// // // // // // // // // // //         },
// // // // // // // // // // //     }));

// // // // // // // // // // // export default function CustomizedDialogs({ open, onClose, post }) {
// // // // // // // // // // //     const [comment, setComment] = useState("");
// // // // // // // // // // //     const [comments, setComments] = useState([
// // // // // // // // // // //         { username: "ahmad", text: "Nice shot!" },
// // // // // // // // // // //         { username: "fatima", text: "Areeb is genius" },
// // // // // // // // // // //     ]);

// // // // // // // // // // //     const handleAddComment = () => {
// // // // // // // // // // //         if (!comment.trim()) return;
// // // // // // // // // // //         setComments([...comments, { username: "you", text: comment }]);
// // // // // // // // // // //         setComment("");
// // // // // // // // // // //     };

// // // // // // // // // // //     const handleKeyDown = (event) => {
// // // // // // // // // // //         if (event.key === "Enter" && !event.shiftKey) {
// // // // // // // // // // //             event.preventDefault(); // stops new line
// // // // // // // // // // //             handleAddComment();
// // // // // // // // // // //         }
// // // // // // // // // // //         return (
// // // // // // // // // // //             <BootstrapDialog open={open} onClose={onClose}>
// // // // // // // // // // //                 <Box sx={{ display: "flex", flexDirection: "row", width: "100%", height: "100%" }}>
// // // // // // // // // // //                     {/* Left: Image */}
// // // // // // // // // // //                     <Box
// // // // // // // // // // //                         sx={{
// // // // // // // // // // //                             flex: 1,
// // // // // // // // // // //                             backgroundColor: "#000",
// // // // // // // // // // //                             display: "flex",
// // // // // // // // // // //                             alignItems: "center",
// // // // // // // // // // //                             justifyContent: "center",
// // // // // // // // // // //                             position: "relative",
// // // // // // // // // // //                         }}
// // // // // // // // // // //                     >
// // // // // // // // // // //                         <CardMedia
// // // // // // // // // // //                             component="img"
// // // // // // // // // // //                             src={post?.media?.[0]?.file || "/placeholder.jpg"}
// // // // // // // // // // //                             alt={post?.caption || "Post image"}
// // // // // // // // // // //                             sx={{
// // // // // // // // // // //                                 height: "100%",
// // // // // // // // // // //                                 width: "100%",
// // // // // // // // // // //                                 objectFit: "contain",
// // // // // // // // // // //                             }}
// // // // // // // // // // //                         />
// // // // // // // // // // //                         {/* Close button over image */}
// // // // // // // // // // //                         <IconButton
// // // // // // // // // // //                             aria-label="close"
// // // // // // // // // // //                             onClick={onClose}
// // // // // // // // // // //                             sx={{
// // // // // // // // // // //                                 position: "absolute",
// // // // // // // // // // //                                 right: 10,
// // // // // // // // // // //                                 top: 10,
// // // // // // // // // // //                                 color: "white",
// // // // // // // // // // //                                 background: "rgba(0,0,0,0.5)",
// // // // // // // // // // //                                 "&:hover": { background: "rgba(0,0,0,0.7)" },
// // // // // // // // // // //                             }}
// // // // // // // // // // //                         >
// // // // // // // // // // //                             <CloseIcon />
// // // // // // // // // // //                         </IconButton>
// // // // // // // // // // //                     </Box>

// // // // // // // // // // //                     {/* Right: Comments panel */}
// // // // // // // // // // //                     <Box
// // // // // // // // // // //                         sx={{
// // // // // // // // // // //                             flexBasis: 380,
// // // // // // // // // // //                             display: "flex",
// // // // // // // // // // //                             flexDirection: "column",
// // // // // // // // // // //                             bgcolor: "background.paper",
// // // // // // // // // // //                         }}
// // // // // // // // // // //                     >
// // // // // // // // // // //                         {/* Header */}
// // // // // // // // // // //                         <Box
// // // // // // // // // // //                             sx={{
// // // // // // // // // // //                                 display: "flex",
// // // // // // // // // // //                                 alignItems: "center",
// // // // // // // // // // //                                 justifyContent: "space-between",
// // // // // // // // // // //                                 p: 2,
// // // // // // // // // // //                                 borderBottom: "1px solid #eee",
// // // // // // // // // // //                             }}
// // // // // // // // // // //                         >
// // // // // // // // // // //                             <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
// // // // // // // // // // //                                 <Avatar>{post?.user?.name ? post.user.name[0] : "U"}</Avatar>
// // // // // // // // // // //                                 <Typography fontWeight={600}>
// // // // // // // // // // //                                     {post?.user?.username || "username"}
// // // // // // // // // // //                                 </Typography>
// // // // // // // // // // //                             </Box>
// // // // // // // // // // //                             <IconButton>
// // // // // // // // // // //                                 <MoreHoriz />
// // // // // // // // // // //                             </IconButton>
// // // // // // // // // // //                         </Box>

// // // // // // // // // // //                         {/* Comments Section */}
// // // // // // // // // // //                         <Box sx={{ flex: 1, overflowY: "auto", p: 2, maxHeight: "60vh" }}>
// // // // // // // // // // //                             <Typography sx={{ mb: 1 }}>
// // // // // // // // // // //                                 <strong>{post?.user?.username || "username"}</strong>{" "}
// // // // // // // // // // //                                 {post?.caption || "Post caption"}
// // // // // // // // // // //                             </Typography>

// // // // // // // // // // //                             {comments.map((c, i) => (
// // // // // // // // // // //                                 <Typography key={i} sx={{ mb: 0.5 }}>
// // // // // // // // // // //                                     <strong>{c.username}</strong> {c.text}
// // // // // // // // // // //                                 </Typography>
// // // // // // // // // // //                             ))}
// // // // // // // // // // //                         </Box>


// // // // // // // // // // //                         <Divider sx={{ mt: 2 }} />
// // // // // // // // // // //                         {/*comment section */}
// // // // // // // // // // //                         <Box
// // // // // // // // // // //                             sx={{
// // // // // // // // // // //                                 display: "flex",
// // // // // // // // // // //                                 alignItems: "center",
// // // // // // // // // // //                                 p: 1.5,
// // // // // // // // // // //                                 borderTop: "1px solid #eee",
// // // // // // // // // // //                             }}
// // // // // // // // // // //                         >
// // // // // // // // // // //                             <IconButton size="small">
// // // // // // // // // // //                                 <Face fontSize="small" />
// // // // // // // // // // //                             </IconButton>
// // // // // // // // // // //                             <InputBase
// // // // // // // // // // //                                 placeholder="Add a comment..."
// // // // // // // // // // //                                 value={comment}
// // // // // // // // // // //                                 onChange={(e) => setComment(e.target.value)}
// // // // // // // // // // //                                 // onKeyDown={handleKeyDown}
// // // // // // // // // // //                                 sx={{ flex: 1, mx: 1, fontSize: 14 }}
// // // // // // // // // // //                             />
// // // // // // // // // // //                             <Typography
// // // // // // // // // // //                                 variant="body2"
// // // // // // // // // // //                                 sx={{
// // // // // // // // // // //                                     color: comment.trim() ? "#0095f6" : "gray",
// // // // // // // // // // //                                     fontWeight: 600,
// // // // // // // // // // //                                     cursor: comment.trim() ? "pointer" : "default",
// // // // // // // // // // //                                 }}
// // // // // // // // // // //                                 onClick={handleAddComment}
// // // // // // // // // // //                             >
// // // // // // // // // // //                                 Post
// // // // // // // // // // //                             </Typography>
// // // // // // // // // // //                         </Box>
// // // // // // // // // // //                     </Box>
// // // // // // // // // // //                 </Box>
// // // // // // // // // // //             </BootstrapDialog>
// // // // // // // // // // //         );
// // // // // // // // // // //     }}


// // // // // // // // // // // {/*this is vertical page */ }

// // // // // // // // // // // // "use client";

// // // // // // // // // // // // import React, { useState } from "react";
// // // // // // // // // // // // import {
// // // // // // // // // // // //     Dialog,
// // // // // // // // // // // //     DialogTitle,
// // // // // // // // // // // //     DialogContent,
// // // // // // // // // // // //     IconButton,
// // // // // // // // // // // //     Typography,
// // // // // // // // // // // //     CardMedia,
// // // // // // // // // // // //     Avatar,
// // // // // // // // // // // //     Box,
// // // // // // // // // // // //     InputBase,
// // // // // // // // // // // //     Divider,
// // // // // // // // // // // // } from "@mui/material";
// // // // // // // // // // // // import { styled } from "@mui/material/styles";
// // // // // // // // // // // // import CloseIcon from "@mui/icons-material/Close";
// // // // // // // // // // // // import { MoreHoriz, Face } from "@mui/icons-material";

// // // // // // // // // // // // const BootstrapDialog = styled(Dialog)(({ theme }) => ({
// // // // // // // // // // // //     "& .MuiDialog-paper": {
// // // // // // // // // // // //         maxWidth: "900px",
// // // // // // // // // // // //         width: "90%",
// // // // // // // // // // // //         height: "90vh",
// // // // // // // // // // // //         display: "flex",
// // // // // // // // // // // //         overflow: "hidden",
// // // // // // // // // // // //         borderRadius: 12,
// // // // // // // // // // // //     },
// // // // // // // // // // // // }));

// // // // // // // // // // // // export default function CustomizedDialogs({ open, onClose, post }) {
// // // // // // // // // // // //     const [comment, setComment] = useState("");
// // // // // // // // // // // //     const [comments, setComments] = useState([
// // // // // // // // // // // //         { username: "ahmad", text: "Nice shot!" },
// // // // // // // // // // // //         { username: "fatima", text: "Areeb is genius" },
// // // // // // // // // // // //     ]);

// // // // // // // // // // // //     const handleAddComment = () => {
// // // // // // // // // // // //         if (!comment.trim()) return;
// // // // // // // // // // // //         setComments([...comments, { username: "you", text: comment }]);
// // // // // // // // // // // //         setComment("");
// // // // // // // // // // // //     };

// // // // // // // // // // // //     return (
// // // // // // // // // // // //         <BootstrapDialog open={open} onClose={onClose}>
// // // // // // // // // // // //             {/* Image section */}
// // // // // // // // // // // //             <Box
// // // // // // // // // // // //                 sx={{
// // // // // // // // // // // //                     flex: 1,
// // // // // // // // // // // //                     backgroundColor: "#000",
// // // // // // // // // // // //                     display: "flex",
// // // // // // // // // // // //                     alignItems: "center",
// // // // // // // // // // // //                     justifyContent: "center",
// // // // // // // // // // // //                     flexDirection: "row",

// // // // // // // // // // // //                 }}
// // // // // // // // // // // //             >
// // // // // // // // // // // //                 <CardMedia
// // // // // // // // // // // //                     component="img"
// // // // // // // // // // // //                     src={post?.media?.[0]?.file || "/placeholder.jpg"}
// // // // // // // // // // // //                     alt={post?.caption || "Post image"}
// // // // // // // // // // // //                     sx={{
// // // // // // // // // // // //                         height: "100%",
// // // // // // // // // // // //                         width: "100%",
// // // // // // // // // // // //                         objectFit: "contain",

// // // // // // // // // // // //                     }}
// // // // // // // // // // // //                 />
// // // // // // // // // // // //             </Box>

// // // // // // // // // // // //             {/* Right side (details/comments) */}
// // // // // // // // // // // //             <Box
// // // // // // // // // // // //                 sx={{
// // // // // // // // // // // //                     flexBasis: 280,
// // // // // // // // // // // //                     display: "flex",
// // // // // // // // // // // //                     flexDirection: "column",
// // // // // // // // // // // //                     bgcolor: "background.paper",
// // // // // // // // // // // //                 }}
// // // // // // // // // // // //             >
// // // // // // // // // // // //                 {/* Header */}
// // // // // // // // // // // //                 <Box
// // // // // // // // // // // //                     sx={{
// // // // // // // // // // // //                         display: "flex",
// // // // // // // // // // // //                         alignItems: "center",
// // // // // // // // // // // //                         justifyContent: "space-between",
// // // // // // // // // // // //                         p: 2,
// // // // // // // // // // // //                         borderBottom: "1px solid #eee",
// // // // // // // // // // // //                     }}
// // // // // // // // // // // //                 >
// // // // // // // // // // // //                     <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
// // // // // // // // // // // //                         <Avatar>
// // // // // // // // // // // //                             {post?.user?.name ? post.user.name[0] : "U"}
// // // // // // // // // // // //                         </Avatar>
// // // // // // // // // // // //                         <Typography fontWeight={600}>
// // // // // // // // // // // //                             {post?.user?.username || "username"}
// // // // // // // // // // // //                         </Typography>
// // // // // // // // // // // //                     </Box>
// // // // // // // // // // // //                     <IconButton>
// // // // // // // // // // // //                         <MoreHoriz />
// // // // // // // // // // // //                     </IconButton>
// // // // // // // //                  </Box>
// // // // // // //  //                 {/* Comments Section */}
// // // // // // // // // // // //                 <Box sx={{ flex: 1, overflowY: "auto", p: 2 }}>
// // // // // // // // // // // //                     <Typography sx={{ mb: 1 }}>
// // // // // // // // // // // //                         <strong>{post?.user?.username || "username"}</strong>{" "}
// // // // // // // // // // // //                         {post?.caption || "Post caption"}
// // // // // // // // // // // //                     </Typography>

// // // // // // // // // // // //                     {comments.map((c, i) => (
// // // // // // // // // // // //                         <Typography key={i} sx={{ mb: 0.5 }}>
// // // // // // // // // // // //                             <strong>{c.username}</strong> {c.text}
// // // // // // // // // // // //                         </Typography>
// // // // // // // // // // // //                     ))}
// // // // // // // // // // // //                 </Box>

// // // // // // // // // // // //                 <Divider />

// // // // // // // // // // // //                 {/* Comment input */}
// // // // // // // // // // // //                 <Box
// // // // // // // // // // // //                     sx={{
// // // // // // // // // // // //                         display: "flex",
// // // // // // // // // // // //                         alignItems: "center",
// // // // // // // // // // // //                         p: 1.5,
// // // // // // // // // // // //                         borderTop: "1px solid #eee",
// // // // // // // // // // // //                     }}
// // // // // // // // // // // //                 >
// // // // // // // // // // // //                     <IconButton size="small">
// // // // // // // // // // // //                         <Face fontSize="small" />
// // // // // // // // // // // //                     </IconButton>
// // // // // // // // // // // //                     <InputBase
// // // // // // // // // // // //                         placeholder="Add a comment..."
// // // // // // // // // // // //                         value={comment}
// // // // // // // // // // // //                         onChange={(e) => setComment(e.target.value)}
// // // // // // // // // // // //                         sx={{ flex: 1, mx: 1, fontSize: 14 }}
// // // // // // // // // // // //                     />
// // // // // // // // // // // //                     <Typography
// // // // // // // // // // // //                         variant="body2"
// // // // // // // // // // // //                         sx={{
// // // // // // // // // // // //                             color: comment.trim() ? "#0095f6" : "gray",
// // // // // // // // // // // //                             fontWeight: 600,
// // // // // // // // // // // //                             cursor: comment.trim() ? "pointer" : "default",
// // // // // // // // // // // //                         }}
// // // // // // // // // // // //                         onClick={handleAddComment}
// // // // // // // // // // // //                     >
// // // // // // // // // // // //                         Post
// // // // // // // // // // // //                     </Typography>
// // // // // // // // // // // //                 </Box>
// // // // // // // // // // // //             </Box>

// // // // // // // // // // // //             {/* Close button */}
// // // // // // // // // // // //             <IconButton
// // // // // // // // // // // //                 aria-label="close"
// // // // // // // // // // // //                 onClick={onClose}
// // // // // // // // // // // //                 sx={{
// // // // // // // // // // // //                     position: "absolute",
// // // // // // // // // // // //                     right: 10,
// // // // // // // // // // // //                     top: 10,
// // // // // // // // // // // //                     color: "white",
// // // // // // // // // // // //                     background: "rgba(0,0,0,0.5)",
// // // // // // // // // // // //                     "&:hover": { background: "rgba(0,0,0,0.7)" },
// // // // // // // // // // // //                 }}
// // // // // // // // // // // //             >
// // // // // // // // // // // //                 <CloseIcon />
// // // // // // // // // // // //             </IconButton>
// // // // // // // // // // // //         </BootstrapDialog>
// // // // // // // // // // // //     );
// // // // // // // //  }