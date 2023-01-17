import { Post } from "./model/Post"

interface PostDetailProps {
    post: Post
}

function PostDetail({ post }: PostDetailProps) {
    return (
        <div className='row'>
            <div className='col-sm-6'>
                <div className='card large'>
                    <img
                        className='rounded'
                        src='https://picsum.photos/200/300'
                        alt={post.title}
                    />
                    <section className='section dark'>
                        <h3 className='strong'>
                            <strong>{post.title}</strong>
                        </h3>
                        <p>{post.body}</p>
                        <p>Tags: {post.tags}</p>                        
                    </section>
                </div>
            </div>
        </div>
    )
}

export default PostDetail;