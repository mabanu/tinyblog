import { Alert, Box, Button, CircularProgress, Divider, Typography } from "@mui/joy";
import { Fragment, useEffect, useState } from "react";
import { Post } from "./model/Post";
import PostList from "./PostList";
import { tinyBlogAPI } from "./tinyBlogAPI";

function PostsPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const [currentPage, setCurrentPage] = useState(1);

    const handleMoreClick = () => {
        setCurrentPage((currentPage) => currentPage + 1);
    };

    useEffect(() => {
        async function loadProject() {
            setLoading(true);
            try {
                const data = await tinyBlogAPI.get(currentPage);
                setError('');

                if (currentPage === 1) {
                    setPosts(data);
                } else {
                    setPosts((posts) => [...posts, ...data]);
                }
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
    }, [currentPage]);

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

            <PostList onSave={savePost} posts={posts} />

            {!loading && !error && (

                <Box sx={{ py: 4 }}>
                    <Divider>
                        <Button variant="solid" size="sm" sx={{ mx: 0.5 }} onClick={handleMoreClick}>
                            More...
                        </Button>
                    </Divider>
                </Box>

            )}

            {loading && (
                <Box sx={{ py: 4 }}>
                    <Divider>
                        <Button
                            variant="solid"
                            size="sm" sx={{ mx: 0.5 }}
                            startDecorator={<CircularProgress variant="solid" thickness={2} />}
                            onClick={handleMoreClick}>
                            Loading...
                        </Button>
                    </Divider>
                </Box>
            )}

        </Fragment>
    );
}

export default PostsPage;
