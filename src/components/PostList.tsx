import { Box } from "@mui/joy";
import Grid from "@mui/joy/Grid";
import { useState } from "react";
import { Post } from "./model/Post";
import { ProjectListProps } from "./model/ProjectListProps";
import { PostCard } from "./PostCard";
import PostForm from "./PostForm";

function ProjectList({ posts, onSave }: ProjectListProps) {
    const [postBeingEdited, setPostBeingEdited] = useState({});

    const handleEdit = (post: Post) => setPostBeingEdited(post);

    const cancelEditing = () => setPostBeingEdited({});    

    return (
        <Grid
            container spacing={6}
            sx={{ flexGrow: 1, m: 0 }}
            justifyContent="center"
            alignItems="top"
        >
            {posts.map((post) => (
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
                                onEdit={handleEdit} />
                        )}
                    </Box>
                </Grid>
            ))}
        </Grid>
    );
}

export default ProjectList;