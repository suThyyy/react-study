import { useState } from "react";

function SumLike({ likes }) {
  return <div>Sumdsadsasds: {likes}</div>;
}
function PostCard({ heading, getSumLikes }) {
  const [like, setLike] = useState(0);

  function increaseLike() {
    setLike((prev) => prev + 1);
    getSumLikes();
  }

  return (
    <div>
      <h1>{heading}</h1>

      <p>Lorem ipsum dolor sit amet...</p>

      <button onClick={increaseLike}>Like: {like}</button>
    </div>
  );
}

function App() {
  const [likes, setLikes] = useState(0);
  function getSumLikes() {
    setLikes((prev) => prev + 1);
    console.log("getsumlike");
  }
  return (
    <>
      <PostCard getSumLikes={getSumLikes} heading={"Tin moi nhat"} />
      <PostCard getSumLikes={getSumLikes} heading={"Nong hoi"} />
      <PostCard getSumLikes={getSumLikes} heading={"Hay lam"} />
      <SumLike likes={likes} />
    </>
  );
}

export default App;
