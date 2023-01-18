import { Alert, Box, Button, Card, CircularProgress, Divider, Grid, Typography } from "@mui/joy";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Post } from "./model/Post";
import PostDetail from "./PostDetails";
import { tinyBlogAPI } from "./tinyBlogAPI";

function PostPage(props: any) {
    const [loading, setLoading] = useState(false);
    const [post, setPost] = useState<Post | null>(null);
    const [error, setError] = useState<string | null>(null);
    const params = useParams();
    const id = Number(params.id);

    useEffect(() => {
        setLoading(true);
        tinyBlogAPI
            .find(id)
            .then((data) => {
                setPost(data);
                setLoading(false);
            })
            .catch((e) => {
                setError(e);
                setLoading(false);
            });
    }, [id])

    return (
        <Grid container spacing={6} sx={{ flexGrow: 1, m: 0 }} justifyContent="center"
            alignItems="top">
            <Grid>
                <Card
                    variant="soft"
                    size="sm"
                    sx={{
                        width: 500,
                        gap: 1,
                        m: 0,
                        height: '100%'
                    }}
                >
                    <Typography level="h1" sx={{ p: 2 }}>Post Detail</Typography>

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

                    {error && (
                        <Alert>{error}</Alert>
                    )}

                    {post && <PostDetail post={post} />}
                </Card>
            </Grid>
        </Grid>
    );
}

export default PostPage;
