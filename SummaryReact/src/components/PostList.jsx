import { useLoaderData } from 'react-router-dom';

import Post from './Post';
import classes from './PostList.module.css';

const PostList = () => {
  const posts = useLoaderData();

  const addPostHandler = (postData) => {
    fetch('http://localhost:8080/posts', {
      method: 'POST',
      body: JSON.stringify(postData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setPosts((prevPosts) => [postData, ...prevPosts]);
  };

  const postContents = posts.map((post) => (
    <Post key={post.body} author={post.author} body={post.body} />
  ));

  return (
    <>
      {posts.length > 0 && <ul className={classes.posts}>{postContents}</ul>}
      {posts.length === 0 && (
        <div style={{ textAlign: 'center', color: 'white' }}>
          <h2>There are no posts yet.</h2>
          <p>Start adding some!</p>
        </div>
      )}
    </>
  );
};

export default PostList;
