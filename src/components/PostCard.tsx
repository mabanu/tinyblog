import * as styles from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Post } from "./model/Post";
import Stack from '@mui/joy/Stack';

interface IPost {
    post: Post;
    onEdit: (post: Post) => void;
}

function RandomColor() {
    const colors: styles.ColorPaletteProp[] = [
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
    const [color, setColor] = useState<styles.ColorPaletteProp>(RandomColor);
    const navigate = useNavigate();
    const { post, onEdit } = props;


    const HandelClick = (postBeingEdited: Post) => { onEdit(postBeingEdited); };

    return (

        
            <Card
            variant="soft"
            size="sm"
            sx={{
                flexDirection: { xs: 'row', md: 'column' },
                minWidth: { xs: '100%', md: 'auto' },
                gap: 1,           
            }}
                >

                <CardContent>
                    <Typography level="body2" fontSize='lg' sx={{ p: 2 }}>
                        {post.title}
                    </Typography>

                    <Typography level="body3" fontSize="md" sx={{ p: 2 }}>
                        {post.body}
                    </Typography>

                    <Stack
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        sx={{pl: 2} }
                    >
                        {post.tags?.map((tag, index) => (

                            <Chip size="sm"
                                variant="soft" key={index}>{tag}</Chip>

                        ))}
                    </Stack>

                    <Stack
                        direction="row"
                        justifyContent="flex-end"
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
                                const colors: styles.ColorPaletteProp[] = [
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
                        <Button variant="outlined" size="sm" onClick={() => navigate('/posts/' + post.id)}
                            sx={{
                                mx: 1
                            }}
                        >
                            Go to Post
                        </Button>
                    </Stack>

                </CardContent>
            </Card>
      


    )
}   