import * as styles from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Post } from "./model/Post";
import Stack from '@mui/joy/Stack';
import { Modal, ModalClose, Sheet } from '@mui/joy';

interface IPost {
    post: Post;
    onEdit: (post: Post) => void;
}

export function PostCard(props: IPost) {
    const [drop, setDrop] = useState(false);
    const navigate = useNavigate();
    const { post, onEdit } = props;
    const [open, setOpen] = useState(false);

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

                {!drop && <Button variant='plain' onClick={() => setDrop(true)}>
                    <Typography level="body3" fontSize="md" sx={{ p: 2 }} >
                        Read post
                    </Typography>
                </Button>
                }

                {drop && <Button variant='plain' onClick={() => setDrop(false)}>
                    <Typography level="body3" fontSize="md" sx={{ p: 2 }} >
                        {post.body}
                    </Typography>
                </Button>
                }

                <Stack
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="flex-end"
                    sx={{ py: 2 }}
                >
                    <Button variant="solid" size="sm" sx={{ mx: 0.5 }}
                        onClick={() => HandelClick(post)}
                    >
                        Edit
                    </Button>
                    <Button variant="solid" size="sm" sx={{ mx: 0.5 }}
                        onClick={() => navigate('/posts/' + post.id)}
                    >
                        Go to Post
                    </Button>
                    <Button variant="solid" size="sm" sx={{ mx: 0.5 }}
                        onClick={() => setOpen(true)}
                    >
                        Guess
                    </Button>
                    <Modal
                        aria-labelledby="modal-title"
                        aria-describedby="modal-desc"
                        open={open}
                        onClose={() => setOpen(false)}
                        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    >
                        <Sheet
                            variant="outlined"
                            sx={{
                                maxWidth: 500,
                                borderRadius: 'md',
                                p: 3,
                                boxShadow: 'lg',
                            }}
                        >
                            <ModalClose
                                variant="outlined"
                                sx={{
                                    top: 'calc(-1/4 * var(--IconButton-size))',
                                    right: 'calc(-1/4 * var(--IconButton-size))',
                                    boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                                    borderRadius: '50%',
                                    bgcolor: 'background.body',
                                }}
                            />
                            <Typography
                                component="h2"
                                id="modal-title"
                                level="h4"
                                textColor="inherit"
                                fontWeight="lg"
                                mb={1}
                            >
                                Reactions and UserId
                            </Typography>
                            <Typography level="body3" fontSize="md" >
                                {post.reactions} and {post.userId}
                            </Typography>
                        </Sheet>
                    </Modal>
                </Stack>
            </CardContent>
        </Card>



    )
}   