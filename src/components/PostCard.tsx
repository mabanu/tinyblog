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

export function PostCard(props: IPost) {
    const [color, setColor] = useState<styles.ColorPaletteProp>('neutral');
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
                m: 0,
                height: '100%'
            }}
                >

                <CardContent>
                    <Typography level="body2" fontSize='lg' sx={{ p: 2 }}>
                        {post.title}
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

                    <Typography level="body3" fontSize="md" sx={{ p: 2 }}>
                        {post.body}
                    </Typography>                    

                    <Stack
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="flex-end"
                    sx={{ py: 2 }}
                    >
                        <Button variant="solid" size="sm" onClick={() => HandelClick(post)}
                            sx={{
                                mx: 1
                            }}
                        >
                            Edit
                        </Button>
                        
                        <Button variant="solid" size="sm" onClick={() => navigate('/posts/' + post.id)}
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