"use client";

import React, { useEffect, useState } from "react";
import {
  Stack,
  Typography,
  Avatar,
  Box,
  Button,
  InputBase,
  Link,
} from "@mui/material";
import axios from "./axios";
import PostCard from "./components/postCard";

function Home() {
  // dummy data
  const [openCommentPostId, setOpenCommentPostId] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = React.useState(false);

  //  const handleOpenMore = () => setOpen(true);
  const handleClose = () => setOpen(false);
  {/* like post */ }
  const likePost = (id) => {
    console.log("Like post:", id);
  };
  {/* comment post */ }
  const handleShowComment = (id) => {
    setOpenCommentPostId(openCommentPostId === id ? null : id);
  };

  const handleCommentSubmit = (id) => {
    try {
      // const response = 
    } catch (error) { }
  };

  const FetchForyouList = async () => {
    try {
      const response = await axios.get("api/user/suggested-users/");
      console.log(response.data);
      setSuggestions(response.data.results);
    }
    catch (error) {
      console.log("Error fetching For You list", error.message)
    }
  }


   {/*post api */ }
  const handlePosts = async () => {
    try {
      let posts = {
        id: 0,
        user: {
          id: 0,
          username: "username",
          name: "name",
          profile_picture: "img",
        },
        created_ago: "created",
        caption: "caption",
        likes: 0,
        comments: 0,
      }
      const response = await axios.get("/api/post/");
      console.log(response);
    } catch (error) {
      console.error("Error fetch on post")
    }
  }

  // get posts
  const fetchPosts = async () => {
    try {
      const response = await axios.get("/api/post/")
      setPosts(response.data.results)
    } catch (error) {
      console.error(error)
    }
  }

  {/*post */ }
  useEffect(() => {
    FetchForyouList();
    fetchPosts();
  }, []);
  const image = [
    {
      img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
      title: "Breakfast",
    }
  ]
  {/*follow button */ }
  const handleFollowButton = async (userId) => {
    try {
      const response = await axios.post("/api/user/follow-request/",
        { followed_id: userId },
      );
      console.log("follow response:", response.data);
    } catch (error) {
      console.error("Error following user:", error.message);
    }
  };
 

  return (
    <Stack
      direction="row"
      spacing={5}
      sx={{ mt: 4, px: 5, fontFamily: "Lato, sans-serif", ml: 55 }}
    >
      {/* Posts Section */}
      <Stack sx={{ flex: 2 }}>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </Stack>
      {/* Side Section */}
      <Stack sx={{ flex: 1, minWidth: 200, p: 2, color: "#262626", marginRight: 20 }}>
        {/* Profile */}
        <Box
          sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar src="/profile.jpg" sx={{ width: 40, height: 40 }} />
            <Box>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                itz.adiiies
              </Typography>
              <Typography variant="body2" sx={{ color: "gray" }}>
                Adiiies
              </Typography>
            </Box>
          </Box>
          <Link href="/" sx={{ color: "#0095f6", fontSize: 14, fontWeight: 600 }}>
            Switch
          </Link>
        </Box>

        {/* for you list */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3, mb: 2 }}>
          <Typography variant="body2"
            sx={{ color: "gray", fontWeight: 600 }}>
            Suggested for you
          </Typography>
          <Link href="/" sx={{ fontSize: 13, fontWeight: 600, color: "black" }}>
            See All
          </Link>
        </Box>
        {/* list map */}
        {suggestions?.map((user) => (
          <Box
            key={user.id}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mt: 1,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Avatar src={user.profile_picture || "/default.jpg"} sx={{ width: 40, height: 40 }} />
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {user.username}
                </Typography>
                <Typography variant="caption" sx={{ fontWeight: 600, color: "gray" }}>
                  {user.id || user.username}.
                </Typography>
                <Typography variant="caption" sx={{ color: "gray" }}>
                  {user.info || "suggested for you"}
                </Typography>
              </Box>
            </Box>
            <Button
              variant="text"
              sx={{
                textTransform: "none",
                fontSize: 13,
                fontWeight: 600,
                color: "#0095f6",
              }}
              onClick={() => handleFollowButton(user.id)}
            >
              Follow
            </Button>
          </Box>
        ))
        }
        {/* Footer Links */}
        <Typography
          variant="caption"
          sx={{
            mt: 4,
            color: "gray",
            lineHeight: 1.6,
            display: "block",
          }}
        >
          About · Help · Press · API · Jobs · Privacy · Terms <br />
          Locations · Language · Meta Verified
        </Typography>
        <Typography variant="caption" sx={{ mt: 2, color: "gray" }}>
          © 2025 INSTAGRAM FROM META
        </Typography>
      </Stack>
    </Stack>
  )
};

export default Home;