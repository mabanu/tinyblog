import { Button, Card, FormLabel, Input, Stack, Textarea } from "@mui/joy";
import { SyntheticEvent, useState } from "react";
import { Errors } from "./model/Errors";
import { Post } from "./model/Post";

interface PostFormProps {
    post: Post;
    onSave: (project: Post) => void;
    onCancel: () => void;
}

function PostForm({ post: initialPost, onSave, onCancel }: PostFormProps) {
    const [post, setPost] = useState(initialPost);
    const [errors, setErrors] = useState({
        title: '',
        body: ''
    });

    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        if (!isValid()) return;
        onSave(post);
    };

    const handleChange = (event: any) => {
        const { name, value } = event.target;

        let updateValue = value;

        const change = { [name]: updateValue, };

        let updatedPost: Post;

        setPost((p) => {
            updatedPost = new Post({ ...p, ...change });
            return updatedPost;
        });

        setErrors(() => validate(updatedPost));
    };

    function validate(post: Post) {
        let errors: Errors = {
            title: '',
            body: '',
        };

        if (post.title.length < 3) {
            errors.title = 'Title needs to be at least 3 characters.';
        }

        if (post.body.length === 0) {
            errors.body = 'Body is required';
        }

        return errors;
    }

    function isValid() {
        return (
            errors.title.length === 0 &&
            errors.body.length === 0
        );
    }

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
            <form className='input-group vertical' onSubmit={handleSubmit}>
                <label htmlFor='title'>Title</label>
                <Input
                    type='text'
                    name='title'
                    placeholder='enter title'
                    value={post.title}
                    onChange={handleChange}
                />

                {errors.title.length > 0 && (
                    <div className='card error'>
                        <p>{errors.title}</p>
                    </div>
                )}
                
                <label htmlFor='body'>Post</label>
                <Textarea
                    name='body'
                    placeholder='enter description'
                    value={post.body}
                    onChange={handleChange}
                ></Textarea>

                {errors.body.length > 0 && (
                    <div className='card error'>
                        <p>{errors.body}</p>
                    </div>
                )}

                <Stack
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="flex-end"
                    sx={{ py: 2 }}
                >
                    <Button variant="solid" size="sm" sx={{ mx: 0.5 }} onClick={() => onSave(post)}>Save</Button>
                    <Button variant="solid" size="sm" sx={{ mx: 0.5 }} onClick={onCancel} >Cancel</Button>
                </Stack>
            </form>
        </Card>
    )
}

export default PostForm;
