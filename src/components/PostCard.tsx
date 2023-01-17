import { Stack, Button, Card, ColorPaletteProp, Divider, Grid, Typography, Chip, CardContent, Box } from "@mui/joy";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Post } from "./model/Post";

interface IPost {
    post: Post;
    onEdit: (post: Post) => void;
}

function RandomColor() {
    const colors: ColorPaletteProp[] = [
        'primary',
        'neutral',
        'danger',
        'info',
        'success',
        'warning',
    ];
    return colors[Math.floor(Math.random() * 6)]
}

export function PostCard(props: IPost) {
    const [color, setColor] = useState<ColorPaletteProp>(RandomColor);
    const { post, onEdit } = props;

    const HandelClick = (postBeingEdited: Post) => { onEdit(postBeingEdited); };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: { md: 'flex-start' },
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 2,
            }}
        >
        <Card variant="soft"
            color={color}
            invertedColors
            sx={{
                display: 'flex',
                alignItems: 'center',
                flexGrow: 1,
                p: 2,
                m: 3,
                borderRadius: { xs: 12, sm: 12 },
                width: 320,
                maxWidth: 400,
                ...(color !== 'warning' && {
                    background: (theme) =>
                        `linear-gradient(to top, ${theme.vars.palette[color][600]}, ${theme.vars.palette[color][500]})`,
                }),
            }}>

            <Divider orientation="horizontal" sx={{ m: 2 }}>
                Title
            </Divider>
            <CardContent>
                <Link to={'/posts/' + post.id}>
                    <Typography level="h1" fontSize="md" sx={{ mb: 0.5 }}>
                        <strong>{post.title}</strong>
                    </Typography>
                    <Divider orientation="horizontal" sx={{ m: 2 }} >
                        Body
                    </Divider>
                    <Typography level="body2" fontSize="md" sx={{ mb: 0.5 }}>
                        {post.body}
                    </Typography>
                    <Divider orientation="horizontal" sx={{ m: 2 }} > End</Divider>
                </Link>

                <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                >

                    {post.tags?.map((tag, index) => (

                        <Chip size="sm"
                            variant="outlined" key={index}>{tag}</Chip>

                    ))}
                </Stack>

                <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-end"
                >
                    <Button variant="outlined" size="sm" onClick={() => HandelClick(post)}
                        sx={{
                            mx: 1
                        }}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="outlined"
                        size="sm"
                        onClick={() => {
                            const colors: ColorPaletteProp[] = [
                                'primary',
                                'neutral',
                                'danger',
                                'info',
                                'success',
                                'warning',
                            ];
                            const nextColor = colors.indexOf(color);
                            setColor(colors[nextColor + 1] ?? colors[0]);
                        }}
                    >
                        Color
                    </Button>
                </Stack>

            </CardContent>
            </Card>
            </Box>

    )
}   