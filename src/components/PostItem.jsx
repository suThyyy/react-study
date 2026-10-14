function PostItem({ post, onUpdate, onDelete }) {
  return (
    <div>
      <h3>
        {post.id} - {post.title}
      </h3>

      <button onClick={() => onUpdate(post.id)}>Update</button>

      <button onClick={() => onDelete(post.id)}>Delete</button>
    </div>
  );
}

export default PostItem;
