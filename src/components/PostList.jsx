import PostItem from "./PostItem";

function PostList({ posts, onUpdate, onDelete }) {
  return (
    <div>
      {posts.map((post) => (
        <PostItem
          key={post.id}
          post={post}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default PostList;
