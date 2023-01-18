import { AspectRatio, Box, CardContent, Chip, Stack, Typography } from "@mui/joy"
import { Post } from "./model/Post"

interface PostDetailProps {
    post: Post
}

function PostDetail({ post }: PostDetailProps) {
    return (

        <CardContent>
            <AspectRatio sx={{ my: 2 }}>
                <img
                    className='rounded'
                    src='https://picsum.photos/300/200'
                    alt={post.title}
                />
            </AspectRatio>

            <Typography level="body2" fontSize='lg' sx={{ p: 2 }}>
                {post.title}
            </Typography>
            <Typography level="body3" fontSize='lg' sx={{ p: 2 }}>
                {post.body}
            </Typography>
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                {post.tags?.map((tag, index) => (
                    <Box sx={{ px: 0.5 }} key={index}>
                        <Chip size="sm"
                            variant="outlined" >{tag}</Chip>
                    </Box>
                ))}
            </Stack>

        </CardContent>

    )
}

export default PostDetail;