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

        let updateValue =  value;      

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
        <form className='input-group vertical' onSubmit={handleSubmit}>
            <label htmlFor='title'> Post Title</label>
            <input
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

            <label htmlFor='body'>Post Body</label>
            <textarea
                name='body'
                placeholder='enter description'
                value={post.body}
                onChange={handleChange}
            ></textarea>
            {errors.body.length > 0 && (
                <div className='card error'>
                    <p>{errors.body}</p>
                </div>
            )}                    

            <div className='input-group'>
                <button className='primary bordered medium'>Save</button>
                <span></span>
                <button type='button' className='secondary bordered medium' onClick={onCancel}>Cancel</button>
            </div>
        </form>
    )
}

export default PostForm;
