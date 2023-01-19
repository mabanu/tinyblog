import { Post } from "./Post";

export interface IPost {
    post: Post;
    onEdit: (post: Post) => void;
}