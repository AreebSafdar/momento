
"use client";

import React, { useState } from "react";
import {
    Dialog,
    IconButton,
    Typography,
    CardMedia,
    Avatar,
    Box,
    InputBase,
    Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import {
    MoreHoriz,
    Face,
    FavoriteBorder,
    ModeCommentOutlined,
    SendOutlined,
    BookmarkBorderRounded,
} from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "../axios";
import { useEffect } from "react";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialog-paper": {
        maxWidth: "900px",
        width: "90%",
        height: "90vh",
        display: "flex",
        overflow: "hidden",
        borderRadius: 12,
    },
}));

// export default function CustomizedDialogs({ open, onClose, post }) {
export default function CustomizedDialogs({ open, onClose, post, onCommentAdded }) {
    const [comment, setComment] = useState("");
    const [liked, setLiked] = useState(post.is_liked || false);
    const [likesCount, setLikesCount] = useState(post.likes_count || 0);
    const [comments, setComments] = useState([]);
    const [replyingTo, setReplyingTo] = useState(null);
    const [replyText, setReplyText] = useState("");

    //reply comment most important
    const handleAddReply = (index) => {
        if (!replyText.trim()) return;

        const newReply = {
            content: replyText,
            user: { username: "you" },
        };

        setComments((prev) =>
            prev.map((comment, i) => {
                if (i === index) {
                    return {
                        ...comment,
                        replies: [...(comment.replies || []), newReply],
                    };
                }
                return comment;
            })
        );

        setReplyText("");
        setReplyingTo(null);
    };
    const likePost = async (id) => {
        try {
            const token = localStorage.getItem("token");
            const newLiked = !liked;
            setLiked(newLiked);
            setLikesCount((prev) => (newLiked ? prev + 1 : prev - 1));

            await axios.post(
                `/api/post/${id}/like/`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
        } catch (error) {
            console.error("Error liking post:", error);
        }
    };

    // add Comment
    const handleAddComment = async (id, commentID = null) => {
        if (!comment.trim()) return;

        try {
            const payload = {
                content: comment,
            }
            if (commentID) {
                payload[reply_to] = commentID
            }
            const response = await axios.post(`/api/post/${id}/comment/`, payload);
            const newComment = {
                // id: Date.now(),
                content: comment,
                created_ago: "just now",
                likes: 0,
                replise: [],
                user: {
                    username: post?.user?.username || "you"
                }
            }
            setComments([
                ...comments,
                newComment
            ]);
            setComment("");
            console.log("comment posted : ", response.data);

            if (onCommentAdded) onCommentAdded();


        } catch (error) {
            console.error("Error fetch on post")
        };

    };

    //Enter Key
    const handleKeyDown = (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            handleAddComment(post.id);
        }
    };

    return (
        <BootstrapDialog open={open} onClose={onClose}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    height: "100%",
                }}
            >
                {/* Left: Image */}
                <Box
                    sx={{
                        flex: 1,
                        backgroundColor: "#000",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                    }}
                >
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        sx={{
                            position: "absolute",
                            right: 10,
                            top: 10,
                            color: "white",
                            background: "rgba(0,0,0,0.5)",
                            "&:hover": { background: "rgba(0,0,0,0.7)" },
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <CardMedia
                        component="img"
                        src={post?.media?.[0]?.file || "/placeholder.jpg"}
                        alt={post?.caption || "Post image"}
                        sx={{
                            height: "100%",
                            width: "100%",
                            objectFit: "contain",
                        }}
                    />
                </Box>
                {/* Right: Comments panel */}
                <Box
                    sx={{
                        flexBasis: 380,
                        display: "flex",
                        flexDirection: "column",
                        bgcolor: "background.paper",
                    }}
                >
                    {/* Header */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            p: 2,
                            borderBottom: "1px solid #eee",
                        }}
                    >
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Avatar>{post?.user?.name ? post.user.name[0] : "U"}</Avatar>
                            <Typography fontWeight={600}>
                                {post?.user?.username || "username"}
                            </Typography>
                        </Box>
                        <IconButton>
                            <MoreHoriz />
                        </IconButton>
                    </Box>

                    {/* Comments Section */}
                    <Box sx={{ flex: 1, overflowY: "auto", p: 2, maxHeight: "60vh" }}>
                        <Typography sx={{ mb: 1, fontSize: 12 }}>
                            <strong>{post?.user?.username || "username"}</strong>{" "}
                            {post?.caption || "Post caption"}
                        </Typography>
                        {comments.map((c, i) => (
                            <Box key={i} sx={{ mb: 1 }}>
                                {/* Comment Header */}
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    <Avatar
                                        sx={{ width: 24, height: 24, fontSize: 13 }}
                                        src={c.avatar || ""}
                                        alt={c.username}
                                    />
                                    <Typography variant="body2" sx={{ fontSize: 12 }}>
                                        <strong>{c.user.username}</strong> {c.content}
                                    </Typography>
                                </Box>

                                {/* Comment Footer */}
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5, ml: 4 }}>
                                    <Typography sx={{ fontSize: 10, color: "gray" }}>
                                        {c.created_ago || "1d"}
                                    </Typography>
                                    {(c.likesCount || c.likes || 0) > 0 && (
                                        <Typography sx={{ fontSize: 10, color: "gray" }}>
                                            {c.likesCount || c.likes} likes
                                        </Typography>
                                    )}
                                    <Typography sx={{ fontSize: 10, color: "gray", cursor: "pointer" }}
                                        onClick={() => setReplyingTo(replyingTo === i ? null : i)}>
                                        Reply
                                    </Typography>
                                        <IconButton sx={{ fontSize: 12, ml: "auto" }} onClick={() => likePost(post.id)}>
                                    {liked ? (
                                        <FavoriteIcon sx={{ color: "red", fontSize: 12}} />
                                    ) : (
                                        <FavoriteBorder sx={{ color: "gray", fontSize: 12}} />
                                    )}
                                </IconButton>
                                </Box>
                                {/*reply input */}
                                {replyingTo === i && (
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, ml: 6, mt: 1 }}>
                                        <InputBase
                                            placeholder="reply comment...."
                                            value={replyText}
                                            onChange={(e) => setReplyText(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter" && !e.shiftKey) {
                                                    e.preventDefault();
                                                    // handleAddComment(post.id, c.id);
                                                    handleAddReply(i);
                                                }
                                            }}
                                            sx={{
                                                flex: 1,
                                                fontSize: 13,
                                                px: 1,
                                                py: 0.5,
                                                border: "1px solid #ddd",
                                                borderRadius: 2,
                                            }} />
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: replyText.trim() ? "#0095f6" : "gray",
                                                fontWeight: 600,
                                                cursor: replyText.trim() ? "pointer" : "default",
                                            }}
                                            onClick={() => handleAddReply(post.id, c.id)}
                                        // onClick={() => handleAddComment(post.id, c.id)}
                                        >
                                            Post
                                        </Typography>
                                    </Box>
                                )}
                                {/* comment replies */}
                                {c.replies?.length > 0 && (
                                    <Box sx={{ ml: 6, mt: 0.5 }}>
                                        {c.replies.map((r, ri) => (
                                            <Box key={ri} sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                                                <Avatar
                                                    sx={{ width: 24, height: 24, fontSize: 13, mr: 1 }}
                                                    src={r.user.avatar || ""}
                                                    alt={r.user.username}
                                                />
                                                <Typography variant="body2" sx={{ fontSize: 12 }}>
                                                    <b>{r.user.username}</b> {r.content}
                                                </Typography>
                                            </Box>
                                        ))}
                                    </Box>
                                )}
                            </Box>
                        ))}
                    </Box>
                    {/* Footer (Likes & Actions) */}
                    <Box sx={{ px: 2, pb: 1 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Box>
                                <IconButton onClick={() => likePost(post.id)}>
                                    {liked ? (
                                        <FavoriteIcon sx={{ color: "red" }} />
                                    ) : (
                                        <FavoriteBorder sx={{ color: "black" }} />
                                    )}
                                </IconButton>
                                <IconButton>
                                    <ModeCommentOutlined sx={{ color: "black" }} />
                                </IconButton>
                                <IconButton>
                                    <SendOutlined sx={{ color: "black" }} />
                                </IconButton>
                            </Box>
                            <IconButton>
                                <BookmarkBorderRounded sx={{ color: "black" }} />
                            </IconButton>
                        </Box>
                        <Typography sx={{ fontSize: 12, color: "gray" }}>{post.created_ago}</Typography>
                    </Box>
                    <Divider />
                    {/* Comment Input */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            p: 1.5,
                            borderTop: "1px solid #eee",
                        }}
                    >
                        <IconButton size="small">
                            <Face fontSize="small" />
                        </IconButton>
                        <InputBase
                            placeholder="Add a comment..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            onKeyDown={handleKeyDown}
                            sx={{ flex: 1, mx: 1, fontSize: 14 }}
                        />
                        <Typography
                            variant="body2"
                            sx={{
                                color: comment.trim() ? "#0095f6" : "gray",
                                fontWeight: 600,
                                cursor: comment.trim() ? "pointer" : "default",
                            }}
                            onClick={() => handleAddComment(post.id)}
                        >
                            Post
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </BootstrapDialog>
    );
}



