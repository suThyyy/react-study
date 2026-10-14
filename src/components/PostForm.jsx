function PostForm({ title, onTitleChange, onCreate }) {
  return (
    <div>
      <input
        type="text"
        value={title}
        placeholder="Post title"
        onChange={(e) => onTitleChange(e.target.value)}
      />

      <button onClick={onCreate}>Create Post</button>
    </div>
  );
}

export default PostForm;
