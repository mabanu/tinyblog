import { Box, Button, Divider, Grid, Typography } from "@mui/joy";
import { useState } from "react";
import { Post } from "./model/Post";
import { ProjectListProps } from "./model/ProjectListProps";
import { PostCard } from "./PostCard";
import PostForm from "./PostForm";

const sections = ['history', 'crime', 'fiction', 'magical', 'love']

function SectionPage({ posts, onSave }: ProjectListProps) {
    const [drop, setDrop] = useState(false);
    const [postBeingEdited, setPostBeingEdited] = useState({});

    const HandleEdit = (post: Post) => { setPostBeingEdited(post) };

    const cancelEditing = () => {
        setPostBeingEdited({});
    }

    return (
        <>
            {sections.map((section) => (
                <Box>
                    {drop &&
                        <Box>
                        <Button variant='plain' onClick={() => setDrop(false)}>
                            <Typography level="body3" fontSize="md" sx={{ p: 2 }} >{section.toUpperCase()}</Typography>

                            </Button>
                            <Grid container spacing={6} sx={{ flexGrow: 1, m: 0 }} justifyContent="center"
                                alignItems="top">
                                {posts.map((post) => (
                                    post.tags?.includes(section) &&
                                    <Grid key={post.id} xs={4} md={3} >
                                        <Box>
                                            {post === postBeingEdited ? (
                                                <PostForm
                                                    post={post}
                                                    onSave={onSave}
                                                    onCancel={cancelEditing} />
                                            ) : (
                                                <PostCard
                                                    post={post}
                                                    onEdit={HandleEdit} />
                                            )}
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    }

                    {!drop &&
                        <Button variant='plain' onClick={() => setDrop(true)}>
                            <Typography level="body3" fontSize="md" sx={{ p: 2 }} >{section.toUpperCase()}</Typography>                            
                        </Button>
                    }
                </Box>
            ))}
        </>
    )
}

export default SectionPage;