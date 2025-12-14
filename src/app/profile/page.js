'use client';

import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Grid,
  Typography,
  Tabs,
  Tab,
  IconButton,
  CardMedia,
} from "@mui/material";

import SettingsIcon from "@mui/icons-material/Settings";
import GridViewIcon from "@mui/icons-material/GridView";
import MovieFilterOutlinedIcon from "@mui/icons-material/MovieFilterOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

import axios from "../axios";

export default function Page() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [value, setValue] = useState(0);
  const [total, setTotal] = useState({});

  const handleChange = (event, newValue) => setValue(newValue);

  const fetchOverview = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`/api/user/overview/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTotal(response.data);
      setUser(response.data.user);
    } catch (error) {
      console.error("Error fetching overview:", error);
    }
  };

  const fetchUserPosts = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/api/post/?me=true", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const results = response.data?.results || response.data;
      setPosts(results);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchOverview();
    fetchUserPosts();
  }, []);
  console.log(user);

  return (
    <Box sx={{ p: 3, maxWidth: 950, mx: "auto", ml: 52 }}>
      {/* PROFILE HEADER */}
      <Grid container spacing={3} alignItems="center">
        <Grid item>
          <Box sx={{ position: "relative", width: 150, height: 150 }}>
            <Avatar
              src={user?.avatar ?? user?.profile_picture ?? "https://media.istockphoto.com/id/921427336/vector/initial-hand-drawn-letter-m.jpg?s=612x612&w=0&k=20&c=A3vgYFzdXa3jOHQQhnA3HucOFzTRmRDnlxOGLPl8Qd8="}
              sx={{
                width: 150,
                height: 150,
                border: "4px solid #f49dd9ff",
              }}
            />
            <IconButton
              size="small"
              sx={{
                position: "absolute",
                right: -6,
                bottom: -6,
                background: "white",
                borderRadius: "50%",
                boxShadow: 1,
              }}
            >
              <AddCircleOutlineIcon color="primary" />
            </IconButton>
          </Box>
        </Grid>

        <Grid item xs>
          <Box sx={{ mt: 1, display: "flex", gap: 2, alignItems: "center" }}>
           <Typography variant="h6" sx={{ fontSize: 22 }}>
              {user?.username?.areeb}
            </Typography>
            <Button
              variant="outlined"
              sx={{
                fontSize: 12,
                backgroundColor: "#f1f1f1",
                color: "black",
                border: "none",
              }}
            >
              Edit Profile
            </Button>

            <Button
              variant="outlined"
              sx={{
                fontSize: 12,
                backgroundColor: "#f1f1f1",
                color: "black",
                border: "none",
              }}
            >
              Share Profile
            </Button>

            <SettingsIcon sx={{ fontSize: 30 }}/>
          </Box>

          {/* Stats Row */}
          <Box sx={{ mt: 2, display: "flex", gap: 4 }}>
            <Typography>
              <b>{total?.posts}</b> Posts
            </Typography>
            <Typography>
              <b>{total?.followers || 0}</b> Followers
            </Typography>
            <Typography>
              <b>{total?.following || 0}</b> Following
            </Typography>
          </Box>

          {/* Bio */}
          <Typography sx={{ mt: 2 }}>
            {user?.full_name} <br />
            {user?.bio}
          </Typography>
        </Grid>
      </Grid>

      {/* STORY HIGHLIGHTS */}
      <Box sx={{ mt: 5, display: "flex", gap: 3, overflowX: "auto" }}>
        {["Travel", "Music", "Life", "Food", "Friends"].map((text, i) => (
          <Box key={i} sx={{ textAlign: "center" }}>
            <Avatar
              sx={{
                width: 75,
                height: 75,
                border: "3px solid #f78bd5ff",
                mx: "auto",
              }}
              src={user?.avatar}
            />
            <Typography variant="caption">{text}</Typography>
          </Box>
        ))}
      </Box>

      {/* TABS */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", mt: 5 }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab icon={<GridViewIcon />} label="POSTS" />
          <Tab icon={<MovieFilterOutlinedIcon />} label="REELS" />
          <Tab icon={<BookmarkBorderOutlinedIcon />} label="SAVED" />
          <Tab icon={<AssignmentIndOutlinedIcon />} label="TAGGED" />
        </Tabs>
      </Box>

      {/* POSTS GRID */}
      <Box sx={{ mt: 4 }}>
        <Grid container spacing={0.5}>
          {posts.length > 0 ? (
            posts.map((post) => {
              const img = post?.media || "";

              return (
                <Grid item xs={4} key={post.id}>
                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      paddingTop: "100%",
                      overflow: "hidden",
                      cursor: "pointer",
                      "&:hover .overlay": { opacity: 1 },
                    }}
                  >
                    {/* IMAGE */}
                    <CardMedia
                      component="img"
                      image={img}
                      alt="Post"
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />

                    {/* HOVER OVERLAY */}
                    <Box
                      className="overlay"
                      sx={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 2,
                        backgroundColor: "rgba(0,0,0,0.4)",
                        color: "white",
                        opacity: 0,
                        transition: "0.3s ease",
                        fontWeight: "bold",
                        fontSize: 18,
                      }}
                    >
                      <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
                        <FavoriteIcon />
                        {post.likes || 0}
                      </Box>

                      <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
                        <ChatBubbleOutlineIcon />
                        {post.comments_count || 0}
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              );
            })
          ) : (
            <Typography sx={{ ml: 3, mt: 2 }}>No posts yet</Typography>
          )}
        </Grid>
      </Box>
    </Box>
  );
}



// {/* // "use client";

// // import React, { useEffect, useState, useMemo } from "react";
// // import {
// //   Avatar,
// //   Box,
// //   Button,
// //   Grid,
// //   Typography,
// //   Tabs,
// //   Tab,
// //   Stack,
// //   IconButton,
// //   Divider,
// //   Container,
// // } from "@mui/material";
// // import SettingsIcon from "@mui/icons-material/Settings";
// // import GridViewIcon from "@mui/icons-material/GridView";
// // import MovieFilterOutlinedIcon from "@mui/icons-material/MovieFilterOutlined";
// // import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
// // import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
// // import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
// // import PostCard from "../../components/PostCard"; 
// // import axios from "../axios"; 

// // export default function ProfilePage() {
// //   const [user, setUser] = useState(null);
// //   const [total, setTotal] = useState({});
// //   const [posts, setPosts] = useState([]);
// //   const [tab, setTab] = useState(0);
// //   const [highlights, setHighlights] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   const handleChangeTab = (e, value) => setTab(value);

// //   const fetchOverview = async () => {
// //     try {
// //       const token = localStorage.getItem("token");
// //       const res = await axios.get("/api/user/overview/", {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });

     
// //       setTotal(res.data ?? {});
// //       const maybeUser = res.data?.user ?? res.data;
// //       if (maybeUser && maybeUser.id && maybeUser.username) {
// //         setUser(maybeUser);
// //       } else if (res.data?.user) {
// //         setUser(res.data.user);
// //       } else {
// //         setUser((prev) => prev);
// //       }

// //       if (res.data?.highlights) setHighlights(res.data.highlights);
// //     } catch (err) {
// //       console.error("fetchOverview error:", err);
// //     }
// //   };

// //   const fetchAllAndFilterPosts = async () => {
// //     try {
// //       setLoading(true);
// //       const token = localStorage.getItem("token");
// //       const res = await axios.get("/api/post/", {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });

// //       const all = res.data?.results ?? res.data ?? [];
// //       const my = user?.id ? all.filter((p) => p?.user?.id === user.id) : [];

// //       setPosts(my);
// //     } catch (err) {
// //       console.error("fetchAllAndFilterPosts error:", err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchOverview();
// //   }, []);

// //   useEffect(() => {
// //     if (user?.id) {
// //       fetchAllAndFilterPosts();
// //     } else {
// //       fetchAllAndFilterPosts();
// //     }
// //   }, [user]);

// //   const refreshPosts = async () => {
// //     await fetchAllAndFilterPosts();
// //     await fetchOverview();
// //   };

// //   const postsGrid = useMemo(() => posts ?? [], [posts]);

// //   return (
// //     <Container maxWidth="lg" sx={{ py: 4 }}>
// //       {/* Header area */}
// //       <Grid container spacing={3} alignItems="center">
// //         <Grid item xs="auto">
// //           <Box sx={{ position: "relative", width: 140, height: 140 }}>
// //             <Avatar
// //               src={user?.avatar ?? user?.profile_picture ?? ""}
// //               sx={{ width: 140, height: 140, border: "4px solid transparent" }}
// //             />
// //             {/* small add story button */}
// //             <IconButton
// //               size="small"
// //               sx={{
// //                 position: "absolute",
// //                 right: -6,
// //                 bottom: -6,
// //                 background: "white",
// //                 borderRadius: "50%",
// //                 boxShadow: 1,
// //               }}
// //               aria-label="add-story"
// //             >
// //               <AddCircleOutlineIcon color="primary" />
// //             </IconButton>
// //           </Box>
// //         </Grid>

// //         <Grid item xs>
// //           <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
// //             <Typography variant="h5" sx={{ fontWeight: 500 }}>
// //               {user?.username ?? "username"}
// //             </Typography>

// //             <Button variant="outlined" size="small" sx={{ textTransform: "none" }}>
// //               Edit profile
// //             </Button>
// //             <Button variant="outlined" size="small" sx={{ textTransform: "none" }}>
// //               Share profile
// //             </Button>

// //             <IconButton>
// //               <SettingsIcon />
// //             </IconButton>
// //           </Box>

// //           <Box sx={{ display: "flex", gap: 4, mt: 2 }}>
// //             <Box>
// //               <Typography sx={{ fontWeight: 700, textAlign: "center" }}>
// //                 {total?.posts ?? posts?.length ?? 0}
// //               </Typography>
// //               <Typography color="text.secondary">Posts</Typography>
// //             </Box>
// //             <Box>
// //               <Typography sx={{ fontWeight: 700, textAlign: "center" }}>
// //                 {total?.followers ?? 0}
// //               </Typography>
// //               <Typography color="text.secondary">Followers</Typography>
// //             </Box>
// //             <Box>
// //               <Typography sx={{ fontWeight: 700, textAlign: "center" }}>
// //                 {total?.following ?? 0}
// //               </Typography>
// //               <Typography color="text.secondary">Following</Typography>
// //             </Box>
// //           </Box>

// //           <Box sx={{ mt: 2 }}>
// //             <Typography sx={{ fontWeight: 600 }}>
// //               {user?.full_name ?? ""}
// //             </Typography>
// //             <Typography color="text.secondary" sx={{ whiteSpace: "pre-line" }}>
// //               {user?.bio ?? "Your bio goes here."}
// //             </Typography>
// //           </Box>
// //         </Grid>
// //       </Grid>

// //       {/* Story highlights */}
// //       <Box sx={{ mt: 3 }}>
// //         <Typography variant="subtitle2" sx={{ mb: 1 }}>
// //           Story Highlights
// //         </Typography>

// //         <Stack direction="row" spacing={1} sx={{ overflowX: "auto", pb: 1 }}>
// //           {(
// //             highlights.length
// //               ? highlights
// //               : [
// //                   { id: "h1", title: "Travel", img: "" },
// //                   { id: "h2", title: "Food", img: "" },
// //                   { id: "h3", title: "Music", img: "" },
// //                   { id: "h4", title: "Friends", img: "" },
// //                 ]
// //           ).map((h) => (
// //             <Box
// //               key={h.id}
// //               sx={{
// //                 width: 72,
// //                 flex: "0 0 auto",
// //                 textAlign: "center",
// //                 color: "text.primary",
// //               }}
// //             >
// //               <Box
// //                 sx={{
// //                   width: 66,
// //                   height: 66,
// //                   borderRadius: "50%",
// //                   background:
// //                     "linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)",
// //                   display: "flex",
// //                   alignItems: "center",
// //                   justifyContent: "center",
// //                   mx: "auto",
// //                 }}
// //               >
// //                 <Avatar
// //                   src={h.img ?? ""}
// //                   sx={{ width: 58, height: 58, border: "3px solid white" }}
// //                 />
// //               </Box>
// //               <Typography variant="caption" sx={{ display: "block", mt: 0.5 }}>
// //                 {h.title}
// //               </Typography>
// //             </Box>
// //           ))}
// //         </Stack>
// //       </Box>

// //       <Divider sx={{ my: 3 }} />

// //       {/* Tabs row */}
// //       <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
// //         <Tabs value={tab} onChange={handleChangeTab} centered>
// //           <Tab
// //             icon={<GridViewIcon />}
// //             iconPosition="start"
// //             label={<Typography sx={{ ml: 1 }}>POSTS</Typography>}
// //           />
// //           <Tab
// //             icon={<MovieFilterOutlinedIcon />}
// //             iconPosition="start"
// //             label={<Typography sx={{ ml: 1 }}>REELS</Typography>}
// //           />
// //           <Tab
// //             icon={<BookmarkBorderOutlinedIcon />}
// //             iconPosition="start"
// //             label={<Typography sx={{ ml: 1 }}>TAGGED</Typography>}
// //           />
// //         </Tabs>
// //       </Box>

// //       <Box sx={{ mt: 3 }}>
// //         {tab === 0 ? (
// //           <Grid container spacing={1}>
// //             {loading ? (
// //               <Typography sx={{ ml: 2 }}>Loading posts...</Typography>
// //             ) : posts?.length > 0 ? (
// //               postsGrid.map((post) => (
// //                 <Grid item xs={12} sm={4} md={4} lg={4} key={post.id}>
// //                   <PostCard post={post} />
// //                 </Grid>
// //               ))
// //             ) : (
// //               <Box sx={{ textAlign: "center", width: "100%", py: 6 }}>
// //                 <Typography sx={{ fontWeight: 600, mb: 1 }}>
// //                   No posts yet
// //                 </Typography>
// //                 <Typography color="text.secondary">
// //                   When you share photos, they'll appear on your profile.
// //                 </Typography>
// //                 <Button
// //                   variant="contained"
// //                   sx={{ mt: 2 }}
// //                   onClick={() => {
                    
// //                     alert("Open your create post flow (implement navigation).");
// //                   }}
// //                 >
// //                   Create Post
// //                 </Button>
// //               </Box>
// //             )}
// //           </Grid>
// //         ) : (
// //           <Box sx={{ py: 6, textAlign: "center" }}>
// //             <Typography color="text.secondary">No content in this tab yet.</Typography>
// //           </Box>
// //         )}
// //       </Box>
// //     </Container>
// //   );
// // }

// // // // "use client";

// // // // import React, { useEffect, useState } from "react";
// // // // import {
// // // //   Avatar,
// // // //   Box,
// // // //   Button,
// // // //   Grid,
// // // //   Typography,
// // // //   Card,
// // // //   CardMedia,
// // // //   Tabs,
// // // //   Tab,
// // // // } from "@mui/material";
// // // // import SettingsIcon from "@mui/icons-material/Settings";
// // // // import GridViewIcon from "@mui/icons-material/GridView";
// // // // import MovieFilterOutlinedIcon from "@mui/icons-material/MovieFilterOutlined";
// // // // import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
// // // // import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
// // // // import axios from "../axios";

// // // // export default function Page() {
// // // //   const [user, setUser] = useState(null);
// // // //   const [posts, setPosts] = useState([]);
// // // //   const [value, setValue] = useState(0);
// // // //   const [total, setTotal] = useState({});

// // // //   const handleChange = (event, newValue) => setValue(newValue);

// // // //   // Fetch profile overview & user info
// // // //   const fetchOverview = async () => {
// // // //     try {
// // // //       const token = localStorage.getItem("token");
// // // //       const response = await axios.get(`/api/user/overview/`, {
// // // //         headers: { Authorization: `Bearer ${token}` },
// // // //       });

// // // //       console.log("Overview:", response.data);

// // // //       setTotal(response.data);
// // // //       setUser(response.data.user); // The logged-in user
// // // //     } catch (error) {
// // // //       console.error("Error fetching overview:", error);
// // // //     }
// // // //   };

// // // //   // Fetch all posts then filter only current user's posts
// // // //   const fetchUserPosts = async () => {
// // // //     try {
// // // //       const token = localStorage.getItem("token");

// // // //       const response = await axios.get("/api/post/", {
// // // //         headers: { Authorization: `Bearer ${token}` },
// // // //       });

// // // //       console.log("All Posts:", response.data);

// // // //       // Filter only the posts uploaded by this user
// // // //       const myPosts = response.data.filter(
// // // //         (post) => post?.user?.id === user?.id
// // // //       );

// // // //       setPosts(myPosts);
// // // //     } catch (error) {
// // // //       console.error("Error fetching posts:", error);
// // // //     }
// // // //   };

// // // //   // Load user overview first
// // // //   useEffect(() => {
// // // //     fetchOverview();
// // // //   }, []);

// // // //   // Load posts when user id is available
// // // //   useEffect(() => {
// // // //     if (user?.id) {
// // // //       fetchUserPosts();
// // // //     }
// // // //   }, [user]);

// // // //   return (
// // // //     <Box sx={{ p: 3, maxWidth: 1000, mx: "auto", ml: 52 }}>
// // // //       {/* Profile Header */}
// // // //       <Grid container spacing={3} alignItems="center">
// // // //         <Grid item>
// // // //           <Avatar
// // // //             src={
// // // //               user?.avatar ||
// // // //               "https://images.unsplash.com/photo-1502657877623-f66bf489d236"
// // // //             }
// // // //             sx={{ width: 130, height: 130 }}
// // // //           />
// // // //         </Grid>

// // // //         <Grid item xs>
// // // //           <Box sx={{ mt: 1, display: "flex", gap: 2 }}>
// // // //             <Typography variant="h6" sx={{ fontSize: 20 }}>
// // // //               {user?.username || "Username"}
// // // //             </Typography>

// // // //             <Button
// // // //               variant="outlined"
// // // //               sx={{
// // // //                 mt: 1,
// // // //                 fontSize: 12,
// // // //                 backgroundColor: "#f1f1f1",
// // // //                 color: "black",
// // // //                 border: "none",
// // // //               }}
// // // //             >
// // // //               Edit Profile
// // // //             </Button>

// // // //             <Button
// // // //               variant="outlined"
// // // //               sx={{
// // // //                 mt: 1,
// // // //                 fontSize: 12,
// // // //                 backgroundColor: "#f1f1f1",
// // // //                 color: "black",
// // // //                 border: "none",
// // // //               }}
// // // //             >
// // // //               View Archive
// // // //             </Button>

// // // //             <SettingsIcon sx={{ mt: 1, fontSize: 33 }} />
// // // //           </Box>

// // // //           <Box sx={{ mt: 1, display: "flex", gap: 3 }}>
// // // //             <Typography>{total?.posts} Posts</Typography>
// // // //             <Typography>{total?.followers || 0} Followers</Typography>
// // // //             <Typography>{total?.following || 0} Following</Typography>
// // // //           </Box>

// // // //           <Typography sx={{ mt: 2 }}>
// // // //             {user?.full_name || user?.username} <br />
// // // //             {user?.bio || "Forget your past, forgive yourself & begin again."}
// // // //           </Typography>
// // // //         </Grid>
// // // //       </Grid>

// // // //       {/* Tabs */}
// // // //       <Box sx={{ borderBottom: 1, borderColor: "divider", mt: 8, ml: 9 }}>
// // // //         <Tabs value={value} onChange={handleChange}>
// // // //           <Tab icon={<GridViewIcon />} aria-label="grid" />
// // // //           <Tab icon={<MovieFilterOutlinedIcon />} aria-label="video" />
// // // //           <Tab icon={<BookmarkBorderOutlinedIcon />} aria-label="save" />
// // // //           <Tab icon={<AssignmentIndOutlinedIcon />} aria-label="person" />
// // // //         </Tabs>
// // // //       </Box>

// // // //       {/* Posts Grid */}
// // // //       <Box sx={{ mt: 4 }}>
// // // //         <Grid container spacing={1}>
// // // //           {posts.length > 0 ? (
// // // //             posts.map((post) => (
// // // //               <Grid item xs={12} sm={8} md={2} key={post.id}>
// // // //                 <Card sx={{ borderRadius: 2, overflow: "hidden" }}>
// // // //                   <CardMedia
// // // //                     component="img"
// // // //                     height="185"
// // // //                     image={post.image || post.img}
// // // //                     alt="Post"
// // // //                   />
// // // //                 </Card>
// // // //               </Grid>
// // // //             ))
// // // //           ) : (
// // // //             <Typography sx={{ ml: 3, mt: 2 }}>
// // // //               No posts yet.
// // // //             </Typography>
// // // //           )}
// // // //         </Grid>
// // // //       </Box>
// // // //     </Box>
// // // //   );
// // // // }


// // // // // "use client";

// // // // // import React, { useEffect, useState } from "react";
// // // // // import {
// // // // //   Avatar,
// // // // //   Box,
// // // // //   Button,
// // // // //   Grid,
// // // // //   Typography,
// // // // //   Card,
// // // // //   CardMedia,
// // // // //   Tabs,
// // // // //   Tab,
// // // // // } from "@mui/material";
// // // // // import SettingsIcon from "@mui/icons-material/Settings";
// // // // // import GridViewIcon from "@mui/icons-material/GridView";
// // // // // import MovieFilterOutlinedIcon from "@mui/icons-material/MovieFilterOutlined";
// // // // // import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
// // // // // import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
// // // // // import axios from "../axios";

// // // // // export default function Page() {
// // // // //   const [user, setUser] = useState(null);
// // // // //   const [posts, setPosts] = useState([]);
// // // // //   const [value, setValue] = useState(0);
// // // // //   const [total, setTotal] = useState({})

// // // // //   const handleChange = (event, newValue) => setValue(newValue);

// // // // //   //Fetch user overview api
// // // // //   const fetchOverview = async () => {
// // // // //     try {
// // // // //       const token = localStorage.getItem("token");
// // // // //       const response = await axios.get(`/api/user/overview/`, {
// // // // //         headers: {
// // // // //           Authorization: `Bearer ${token}`,
// // // // //         },
// // // // //       });
// // // // //       console.log("Overview Data:", response.data);
// // // // //       setTotal(response.data)
// // // // //     } catch (error) {
// // // // //       console.error("Error fetching overview:", error);
// // // // //     }
// // // // //   };

// // // // //   // Load overview on page load
// // // // //   useEffect(() => {
// // // // //     fetchOverview();
// // // // //   }, []);


// // // // //   return (
// // // // //     <Box sx={{ p: 3, maxWidth: 1000, mx: "auto", ml: 52 }}>
// // // // //       {/* Profile Header */}
// // // // //       <Grid container spacing={3} alignItems="center">
// // // // //         <Grid item>
// // // // //           <Avatar
// // // // //             src={user?.avatar || "https://images.unsplash.com/photo-1502657877623-f66bf489d236"}
// // // // //             sx={{ width: 130, height: 130, display: "flex", }}
// // // // //           />
// // // // //         </Grid>
// // // // //         <Grid item xs>
// // // // //           <Box sx={{ mt: 1, display: "flex", gap: 2 }}>
// // // // //             <Typography variant="h6" sx={{ fontSize: 20 }}>
// // // // //               {user?.username || "Areeb"}
// // // // //             </Typography>
// // // // //             <Button
// // // // //               variant="outlined"
// // // // //               sx={{
// // // // //                 mt: 1,
// // // // //                 fontSize: 12,
// // // // //                 backgroundColor: "#f1f1f1",
// // // // //                 color: "black",
// // // // //                 border: "none",
// // // // //               }}
// // // // //             >
// // // // //               Edit Profile
// // // // //             </Button>
// // // // //             <Button
// // // // //               variant="outlined"
// // // // //               sx={{
// // // // //                 mt: 1,
// // // // //                 fontSize: 12,
// // // // //                 backgroundColor: "#f1f1f1",
// // // // //                 color: "black",
// // // // //                 border: "none",
// // // // //               }}
// // // // //             >
// // // // //               View Archive
// // // // //             </Button>
// // // // //             <SettingsIcon sx={{ mt: 1, fontSize: 33 }} />
// // // // //           </Box>

// // // // //           <Box sx={{ mt: 1, display: "flex", gap: 3 }}>
// // // // //             <Typography>
// // // // //               {total?.posts} Posts
// // // // //             </Typography>
// // // // //             <Typography >
// // // // //              {total?.followers || 0} Followers
// // // // //             </Typography>
// // // // //             <Typography>
// // // // //              {total?.following || 0}Following
// // // // //             </Typography>
// // // // //           </Box>

// // // // //           <Typography sx={{ mt: 2 }}>
// // // // //             {user?.full_name || user?.username} <br />
// // // // //             {user?.bio || "Forget your past, forgive yourself & begin again."}
// // // // //           </Typography>
// // // // //         </Grid>
// // // // //       </Grid>

// // // // //       {/* Tabs */}
// // // // //       <Box sx={{ borderBottom: 1, borderColor: "divider", mt: 8, ml: 9 }}>
// // // // //         <Tabs value={value} onChange={handleChange} aria-label="icon tabs">
// // // // //           <Tab icon={<GridViewIcon />} aria-label="grid" />
// // // // //           <Tab icon={<MovieFilterOutlinedIcon sx={{ ml: 19 }} />} aria-label="video" />
// // // // //           <Tab icon={<BookmarkBorderOutlinedIcon sx={{ ml: 19 }} />} aria-label="save" />
// // // // //           <Tab icon={<AssignmentIndOutlinedIcon sx={{ ml: 19 }} />} aria-label="person" />
// // // // //         </Tabs>
// // // // //       </Box>

// // // // //       {/* Posts Grid */}
// // // // //       <Box sx={{ mt: 4 }}>
// // // // //         <Grid container spacing={1}>
// // // // //           {posts.length > 0 ? (
// // // // //             posts.map((post) => (
// // // // //               <Grid item xs={12} sm={8} md={2} key={post.id}>
// // // // //                 <Card sx={{ borderRadius: 2, overflow: "hidden" }}>
// // // // //                   <CardMedia
// // // // //                     component="img"
// // // // //                     height="185"
// // // // //                     image={post.image || post.img}
// // // // //                     alt="Post"
// // // // //                   />
// // // // //                 </Card>
// // // // //               </Grid>
// // // // //             ))
// // // // //           ) : (
// // // // //             <Typography sx={{ ml: 3, mt: 2 }}>No posts yet.</Typography>
// // // // //           )}
// // // // //         </Grid>
// // // // //       </Box>
// // // // //     </Box>
// // // // //   );
// // // // // }


// // // // // "use client";
// // // // // import React from "react";
// // // // // import PropTypes from 'prop-types';
// // // // // import { Avatar, Box, Button, Grid, CustomTabPanel, Typography, Card, CardMedia, Tabs, Tab } from "@mui/material";
// // // // // import SettingsIcon from '@mui/icons-material/Settings';
// // // // // import GridViewIcon from '@mui/icons-material/GridView';
// // // // // import MovieFilterOutlinedIcon from '@mui/icons-material/MovieFilterOutlined';
// // // // // import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
// // // // // import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';

// // // // // export default function Page() {
// // // // //    const fetchOverview = async () => {
// // // // //     try {
// // // // //       const token = localStorage.getItem("token");
// // // // //       const response = await axios.get(`/api/user/overview/`, {
// // // // //         headers: {
// // // // //           Authorization: `Bearer ${token}`,
// // // // //         },
// // // // //       });
// // // // //       console.log("Overview Data:", response.data);

// // // // //       setUser(response.data.user);
// // // // //       setPosts(response.data.posts || []);
// // // // //     } catch (error) {
// // // // //       console.error("Error fetching overview:", error);
// // // // //     }
// // // // //   };
// // // // //     const posts = [
// // // // //         {
// // // // //             id: 1,
// // // // //             img: "https://images.unsplash.com/photo-1527549993586-dff825b37782"
// // // // //         },
// // // // //         {
// // // // //             id: 2,
// // // // //             img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c"
// // // // //         },
// // // // //         {
// // // // //             id: 3,
// // // // //             img: "https://images.unsplash.com/photo-1532614338840-ab30cf10ed36"
// // // // //         },
// // // // //          {
// // // // //             id: 3,
// // // // //             img: "https://images.unsplash.com/photo-1502657877623-f66bf489d236"
// // // // //         },
// // // // //         {
// // // // //             id: 3,
// // // // //             img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c"
// // // // //         },
// // // // //         {
// // // // //             id: 3,
// // // // //             img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c"
// // // // //         },
// // // // //         {
// // // // //             id: 3,
// // // // //             img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c"
// // // // //         }, {
// // // // //             id: 3,
// // // // //             img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c"
// // // // //         }, {
// // // // //             id: 3,
// // // // //             img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c"
// // // // //         },
// // // // //     ];
// // // // //     const person = { avatar: "/avatar.png" };

// // // // //     const [value, setValue] = React.useState(0);

// // // // //     const handleChange = (event, newValue) => {
// // // // //         setValue(newValue);
// // // // //     };
// // // // //     return (
// // // // //         <Box sx={{ p: 3, maxWidth: 900, mx: "auto", ml: 62 }}>
// // // // //             {/* Profile Header */}
// // // // //             <Grid container spacing={3} alignItems="center">
// // // // //                 <Grid item>
// // // // //                     <Avatar
// // // // //                         src={person.avatar}
// // // // //                         sx={{ width: 120, height: 120 }}
// // // // //                     />
// // // // //                 </Grid>
// // // // //                 <Grid item xs>
// // // // //                     <Box sx={{ mt: 1, display: "flex", gap: 2 }}>

// // // // //                         <Typography variant="h6" sx={{ fontSize: 20 }}>
// // // // //                        {post.user.username}
// // // // //                         </Typography>
// // // // //                         <Button variant="outlined" sx={{ mt: 1, fontSize: 12, backgroundColor: '#f1f1f1', color: 'black', border: 'none' }}>
// // // // //                             Edit Profile
// // // // //                         </Button>
// // // // //                         <Button variant="outlined" sx={{ mt: 1, fontSize: 12, fontSize: 12, backgroundColor: '#f1f1f1', color: 'black', border: 'none' }}>
// // // // //                             View Achive
// // // // //                         </Button>
// // // // //                         <SettingsIcon sx={{ mt: 1, fontSize: 33 }} />
// // // // //                     </Box>
// // // // //                     <Box sx={{ mt: 1, display: "flex", gap: 0 }}>
// // // // //                         <Typography>98</Typography>
// // // // //                         <Typography sx={{ color: 'gray' }}>Posts</Typography>
// // // // //                         <Typography sx={{ ml: 3 }}>61</Typography>
// // // // //                         <Typography sx={{ color: 'gray' }}>followers</Typography>
// // // // //                         <Typography sx={{ ml: 3 }}>11</Typography>
// // // // //                         <Typography sx={{ color: 'gray' }}>following</Typography>

// // // // //                     </Box>
// // // // //                     <Typography sx={{ mt: 2 }}>
// // // // //                         <strong>Adiiies</strong> | Nationality: pk <br />
// // // // //                         Forget your past, forgive yourself & being again
// // // // //                     </Typography>
// // // // //                 </Grid>
// // // // //             </Grid>

// // // // //             {/* Posts Grid */}
// // // // //             <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 8, ml: 9 }}>
// // // // //                 <Tabs value={value} onChange={handleChange} aria-label="icon tabs example">
// // // // //                     <Tab icon={< GridViewIcon sx={{}} />} aria-label="grid" />
// // // // //                     <Tab icon={<MovieFilterOutlinedIcon sx={{ ml: 19 }} />} aria-label="video" />
// // // // //                     <Tab icon={<BookmarkBorderOutlinedIcon sx={{ ml: 19 }} />} aria-label="save" />
// // // // //                     <Tab icon={<AssignmentIndOutlinedIcon sx={{ ml: 19 }} />} aria-label="person" />
// // // // //                 </Tabs>
// // // // //             </Box>
// // // // //             <Box sx={{ mt: 4 }}>
// // // // //                 <Grid container spacing={1}>
// // // // //                     {posts.map((post) => (
// // // // //                         <Grid item xs={12} sm={8} md={2} key={post.id}>
// // // // //                             <Card sx={{ borderRadius: 2, overflow: "hidden" }}>
// // // // //                                 <CardMedia
// // // // //                                     component="img"
// // // // //                                     height="185"
// // // // //                                     image={post.img}
// // // // //                                     alt="Post"
// // // // //                                 />
// // // // //                             </Card>
// // // // //                         </Grid>
// // // // //                     ))}
// // // // //                 </Grid>
// // // // //             </Box>
// // // // //         </Box>
// // // // //     );
// // // // // }


// // // // // {
// // // // //   "user": {
// // // // //     "username": "adiiies",
// // // // //     "avatar": "https://example.com/avatar.jpg",
// // // // //     "followers": 61,
// // // // //     "following": 11,
// // // // //     "bio": "Forget your past, forgive yourself & begin again."
// // // // //   },
// // // // //   "posts": [
// // // // //     { "id": 1, "image": "https://example.com/post1.jpg" },
// // // // //     { "id": 2, "image": "https://example.com/post2.jpg" }
// // // // //   ]
// // // // // } */}
