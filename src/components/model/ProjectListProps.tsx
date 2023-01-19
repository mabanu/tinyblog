import { Post } from "./Post";

export interface ProjectListProps {
    posts: Post[];
    onSave: (post: Post) => void;
}