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
        <div>
            <>
                <h1>Post Detail</h1>

                {loading && (
                    <div className='center-page'>
                        <span className='spinner primary'></span>
                        <p>Loading...</p>
                    </div>
                )}

                {error && (
                    <div className='row'>
                        <div className='card large error'>
                            <section>
                                <p>
                                    <span className='icon-alert inverse'></span> {error}
                                </p>
                            </section>
                        </div>
                    </div>
                )}

                {post && <PostDetail post={post} />}
            </>
        </div>
    );
}

export default PostPage;
