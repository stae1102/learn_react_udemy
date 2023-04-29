import { useState } from 'react';

import NewPost from './NewPost';
import Post from './Post';
import Modal from './Modal';
import classes from './PostList.module.css';

const PostList = ({ isPosting, onStopPosting }) => {
  const [posts, setPosts] = useState([]);

  const addPostHandler = (postData) => {
    setPosts((prevPosts) => [postData, ...prevPosts]);
  };

  return (
    <>
      {isPosting && (
        <Modal onClose={onStopPosting}>
          <NewPost onCancel={onStopPosting} onAddPost={addPostHandler} />
        </Modal>
      )}
      <ul className={classes.posts}>
        <Post author='Manuel' body='Check out the full course!' />
      </ul>
    </>
  );
};

export default PostList;
