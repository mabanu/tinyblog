import { useState } from "react";
import { Post } from "./model/Post";
import { PostCard } from "./PostCard";
import PostForm from "./PostForm";

interface ProjectListProps {
    posts: Post[];
    onSave: (post: Post) => void;
}

function ProjectList({ posts, onSave }: ProjectListProps) {
    const [postBeingEdited, setPostBeingEdited] = useState({});

    const HandleEdit = (post: Post) => { setPostBeingEdited(post) };

    const cancelEditing = () => {
        setPostBeingEdited({});
    }

    return (
        <ul className='row'>
            {posts.map((post) => (
                <div key={post.id} className='cols-sm'>
                    {post === postBeingEdited ? (
                        <PostForm
                            post={post}
                            onSave={onSave}
                            onCancel={cancelEditing} />
                    ) : (
                        <PostCard
                            post={post}
                            onEdit={HandleEdit} />
                    )}
                </div>
            ))}
        </ul>
    );
}

export default ProjectList;