import { Typography } from "@mui/joy";
import { Fragment, useEffect, useState } from "react";
import { Post } from "./model/Post";
import PostList from "./PostList";
import { tinyBlogAPI } from "./tinyBlogAPI";

function PostsPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const [currentPage, setCurrentPage] = useState(1);

    const handleMoreClick = () => {
        setCurrentPage((currentPage) => currentPage + 1);
    };

    useEffect(() => {
        async function loadProject() {
            setLoading(true);
            try {
                const data = await tinyBlogAPI.get(currentPage);
                setError('');

                if (currentPage === 1) {
                    setPosts(data);
                } else {
                    setPosts((posts) => [...posts, ...data]);
                }
            }
            catch (e) {
                if (e instanceof Error) {
                    setError(e.message);
                }
            } finally {
                setLoading(false);
            }
        }

        loadProject();
    }, [currentPage]);

    const savePost = (post: Post) => {
        tinyBlogAPI
            .put(post)
            .then((updatePost) => {
                let updatePosts = posts.map((p: Post) => {
                    return p.id === post.id ? new Post(updatePost) : p;
                });

                setPosts(updatePosts)
            })
            .catch((e) => {
                if (e instanceof Error) {
                    setError(e.message);
                }
            });
    };

    return (
        <Fragment>
            <Typography level='h1'>Blog</Typography>

            {error && (
                <div className='row'>
                    <div className='card large error'>
                        <section>
                            <p>
                                <span className='icon-alert inverse'></span>
                                {error}
                            </p>
                        </section>
                    </div>
                </div>
            )}
            <PostList onSave={savePost} posts={posts} />

            {!loading && !error && (
                <div className='row'>
                    <div className='col-sm-12'>
                        <div className='button-group fluid'>
                            <button className='button defaul' onClick={handleMoreClick}>
                                More...
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {loading && (
                <div className='center-page'>
                    <span className='spinner primary'></span>
                    <p>Loading...</p>
                </div>
            )}

        </Fragment>
    );
}

export default PostsPage;
