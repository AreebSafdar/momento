"use client";

import React, { useEffect, useState } from "react";
import {
    Avatar,
    Box,
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    CardActions,
    IconButton,
    Typography,
} from "@mui/material";
import {
    MoreHoriz,
    FavoriteBorder,
    ModeCommentOutlined,
    SendOutlined,
    BookmarkBorderRounded,
} from '@mui/icons-material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from '../axios';
import CustomizedDialogs from "../components/postComment";


const momentoPost = ({ post }) => {
    const [openCommentPostId, setOpenCommentPostId] = useState(null);
    const [comment, setComment] = React.useState('');
    const [liked, setLiked] = useState(post.is_liked || false)
    const [likesCount, setLikesCount] = useState(post.likes || 0)
    const [openCommentDialog, setOpenCommentDialog] = useState(false);
    const [commentsCount, setCommentsCount] = useState(post.comments_count || 0);

    const handleAddComment = async () => {
        try {
            const token = localStorage.getItem("token");
            await axios.post(`/api/post/${post.id}/comments/`, { content: commentText }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setComment("");
            fetchComments();

            if (onCommentAdded) onCommentAdded();
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };
    const likePost = async (id) => {
        try {
            const token = localStorage.getItem("token");
            setLiked(!liked);
            setLikesCount((prev) => (liked ? prev - 1 : prev + 1))

            await axios.post(`/api/post/${id}/like/`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            })
        } catch (error) {
            console.error("Error liking post:", error)
        }
    }

    const fetchComments = async () => {
        try {
            const response = await axios.get(`/api/post/${post.id}/comments/`);
            setComment(response.data);
        } catch (error) {
            console.error("Error fetching comments:", error);
        };
    }
    useEffect(() => {
        if (openCommentDialog && post?.id) {
            fetchComments();
        }
    }, [openCommentDialog, post?.id]);

    return (
        <Card
            variant="outlined"
            sx={{
                width: '100%',
                maxWidth: 400,
                borderRadius: (theme) => theme.shape.borderRadius,
                boxShadow: 'none',
                borderColor: '#ddd',
            }}
        >
            {/* Header */}
            <CardHeader
                avatar={
                    <Box
                        sx={{
                            position: 'relative',
                            '&::before': {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0,
                                m: '-2px',
                                borderRadius: '50%',
                                background:
                                    'linear-gradient(45deg, #e841cfff, #e24e89ff, #f093ceff, #f8aee9ff, #ede6ecff)',
                            },
                        }}
                    >
                        <Avatar
                            sx={{
                                p: 0.5,
                                border: '2px solid',
                                borderColor: 'background.paper',
                                position: 'relative',
                                zIndex: 1,
                                color: 'pink',
                                backgroundColor: 'black',
                            }}
                        >
                            {post.user.name?.["https://media.istockphoto.com/id/921427336/vector/initial-hand-drawn-letter-m.jpg?s=612x612&w=0&k=20&c=A3vgYFzdXa3jOHQQhnA3HucOFzTRmRDnlxOGLPl8Qd8="]}
                        </Avatar>
                    </Box>
                }
                action={
                    <IconButton>
                        <MoreHoriz sx={{ color: "black" }} />
                    </IconButton>
                }
                title={`${post.user.username}`}
                subheader={
                    <Typography sx={{ fontSize: 12, color: "gray" }}>..
                        {post.created_ago}
                    </Typography>
                }
            />
            {/* Image */}
            <CardMedia
                component="img"
                src={post?.media?.[0]?.file}
                alt={post.caption || "post"}
                sx={{
                    width: '100%',
                    height: 400,
                    objectFit: 'cover',
                    borderRadius: 0,
                }}
            />
            {/* Icons Row */}
            <CardActions
                disableSpacing
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    px: 1,
                    pt: 1,
                }}
            >
                <Box>
                    <IconButton onClick={() => likePost(post.id)}>
                        {liked ? (
                            <FavoriteIcon sx={{ color: "red" }} />
                        ) : (
                            <FavoriteBorder sx={{ color: "black" }} />
                        )}

                        <Typography sx={{ color: "black", ml: 0.5 }}>{likesCount}</Typography>
                    </IconButton>
                    {/* <IconButton onClick={() => setOpenCommentDialog(true)}> */}
                    <IconButton
                        onClick={() => {
                            fetchComments();
                            setOpenCommentDialog(true);
                        }}
                    >
                        {/* <ModeCommentOutlined onClick={fetchComments} sx={{ color: "black" }} /> */}
                        <ModeCommentOutlined sx={{ color: "black" }} />
                        <Typography sx={{ color: "black", ml: 0.5 }}>{commentsCount}</Typography>
                    </IconButton>
                    <CustomizedDialogs
                        open={openCommentDialog}
                        onClose={() => setOpenCommentDialog(false)}
                        post={post}
                        onCommentAdded={() => setCommentsCount(prev => prev + 1)}
                    />
                    <IconButton>
                        <SendOutlined sx={{ color: "black" }} />
                    </IconButton>
                </Box>
                <IconButton>
                    <BookmarkBorderRounded sx={{ color: "black" }} />
                </IconButton>
            </CardActions>

            {/* Caption */}
            <CardContent sx={{ pt: 0 }}>
                <Typography variant="body2" sx={{ mt: 0.5 }}>
                    <Box component="span" sx={{ fontWeight: 600, mr: 1 }}>
                        {post.user.username}
                    </Box>
                    {post.caption}
                </Typography>
                <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: 'block', mt: 0.5 }}
                >
                    {post.created_ago}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default momentoPost