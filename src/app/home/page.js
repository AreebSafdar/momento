"use client";

import React, { useEffect, useState } from "react";
import {
  Stack,
  Typography,
  Avatar,
  Box,
  Paper,
  Card,
  CardHeader,
  Button,
  InputBase,
  Link,
} from "@mui/material";
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import axios from "../axios";
function home() {
  // dummy data
  const [commnt, setCommnt] = useState("");
  const [openCommentPostId, setOpenCommentPostId] = useState(null);
  const [comments, setComments] = useState({});
  const [suggestions, setSuggestions] = useState([]);
  const [follow, setFollower] = useState();
  const [posts, setPosts] = useState([]);
  {/*like post */ }
  const likePost = (id) => {
    console.log("Like post:", id);
  };
  {/*comment post */ }
  const handleShowComment = (id) => {
    setOpenCommentPostId(openCommentPostId === id ? null : id);
  };

  const handleCommentSubmit = (id) => {
    setComments({
      ...comments,
      [id]: [
        ...(comments[id] || []),
        {
          id: Date.now(),
          content: commnt,
          user: { first_name: "You", last_name: "" },
          created_at: new Date().toISOString(),
        },
      ],
    });
    setCommnt("");
  };
  const FetchForyouList = async () => {
    try {
      const response = await axios.get("api/user/users/");
      console.log(response.data);
      setSuggestions(response.data);
    }
    catch (error) {
      console.log("Error fetching For You list", error.message)
    }
  }
  {/*post */ }
  useEffect(() => {
    FetchForyouList();
  }, []);
  const itemData = [
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

  return (
    <Stack
      direction="row"
      spacing={5}
      sx={{ mt: 4, px: 5, fontFamily: "Lato, sans-serif", ml: 55 }}
    >
      {/* Posts Section */}
      <Stack sx={{ flex: 2 }}>
        {posts.map((post) => (
          <Paper
            key={post.id}
            sx={{
              p: "6px 6px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              width: 425,
              borderRadius: 3,
              height: 550,
              mt: 4,
            }}
          >
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: "purple", mt: 1 }}>
                  {post.user.first_name?.[0]}
                </Avatar>
              }
              action={
                <Box sx={{ marginLeft: 30 }}>
                  <MoreHorizOutlinedIcon />
                </Box>
              }
              title={`${post.user.first_name} ${post.user.last_name}`}
              subheader={
                <Typography sx={{ fontSize: 12, color: "gray" }}>
                  {post.created_at}
                </Typography>
              }
            />
            <hr />
            <Typography variant="h5" sx={{ color: "black", mt: 2 }}>
              {post.content}
            </Typography>

            <Box sx={{ display: "flex", gap: 2, mt: 45 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <FavoriteBorderIcon
                  sx={{
                    color: post.is_liked ? "red" : "black",
                    cursor: "pointer",
                  }}
                  onClick={() => likePost(post.id)}
                />
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                <CommentIcon
                  sx={{ cursor: "pointer" }}
                  onClick={() => handleShowComment(post.id)}
                />
                <SendOutlinedIcon sx={{ display: "flex", alignItems: "center" }} />
              </Box>
            </Box>

            {/* Comments */}
            {openCommentPostId === post.id && (
              <Box sx={{ mt: 5, width: "100%" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid #ccc",
                    borderRadius: 2,
                    px: 1,
                    py: 0.5,
                  }}
                >
                  <InputBase
                    placeholder="Comment"
                    value={commnt}
                    onChange={(e) => setCommnt(e.target.value)}
                    sx={{ flex: 1, ml: 1 }}
                  />
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleCommentSubmit(post.id)}
                  >
                    Comment
                  </Button>
                </Box>

                {comments[post.id]?.map((c) => (
                  <Card key={c.id} sx={{ mt: 1, p: 1 }}>
                    <CardHeader
                      avatar={
                        <Avatar sx={{ bgcolor: "black" }}>
                          {c.user.first_name?.[0]}
                        </Avatar>
                      }
                      action={<MoreHorizIcon />}
                      title={`${c.user.first_name} ${c.user.last_name}`}
                      subheader={new Date(c.created_at).toLocaleString()}
                    />
                    <Typography sx={{ ml: 8, mt: 1, fontSize: 15 }}>
                      {c.content}
                    </Typography>
                  </Card>
                ))}
              </Box>
            )}
          </Paper>
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
        {suggestions?.items?.map((user) => (
          <Box
            key={user.id}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mt: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar src={user.profile_picture || "/default.jpg"} sx={{ width: 40, height: 40 }} />
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {user.name || user.username}
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

export default home;