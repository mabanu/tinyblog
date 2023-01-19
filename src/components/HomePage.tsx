import { Alert, Box, Button, CircularProgress, Divider, Typography } from "@mui/joy";
import { Fragment, useEffect, useState } from "react";
import { Post } from "./model/Post";
import PostList from "./PostList";
import SectionPage from "./SectionPage";
import { tinyBlogAPI } from "./tinyBlogAPI";

function HomePage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);    

    useEffect(() => {
        async function loadProject() {
            setLoading(true);
            try {
                const data = await tinyBlogAPI.getAll();
                setError('');
                setPosts(data);
            }
            catch (e) {
                if (e instanceof Error) {
                    setError(e.message);
                }
            } finally {
                setLoading(false);
            }
        }

        loadProject();
    }, []);

    const savePost = (post: Post) => {
        tinyBlogAPI
            .put(post)
            .then((updatePost) => {
                let updatePosts = posts.map((p: Post) => {
                    return p.id === post.id ? new Post(updatePost) : p;
                });

                setPosts(updatePosts)
            })
            .catch((e) => {
                if (e instanceof Error) {
                    setError(e.message);
                }
            });
    };

    return (
        <Fragment>
            <Typography level='h1'>Blog</Typography>

            {error && (
                <Alert>{error}</Alert>
            )}

            <SectionPage onSave={savePost} posts={posts} />            

            {loading && (
                <Box sx={{ py: 4 }}>
                    <Divider>
                        <Button
                            variant="solid"
                            size="sm" sx={{ mx: 0.5 }}
                            startDecorator={<CircularProgress variant="solid" thickness={2} />}
                        >
                            Loading...
                        </Button>
                    </Divider>
                </Box>
            )}

        </Fragment>
    );
}

export default HomePage;
