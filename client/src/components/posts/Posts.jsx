import Post from "../post/Post";
import "./posts.css";

export default function Posts({ posts }) {
  return (
    <div className="posts">
      {Array.isArray(posts) && posts.length > 0 ? (
        posts.map((p) => <Post key={p._id || Math.random()} post={p} />)
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
}
