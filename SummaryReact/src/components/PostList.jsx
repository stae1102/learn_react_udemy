import { useState } from 'react';

import NewPost from './NewPost';
import Post from './Post';
import Modal from './Modal';
import classes from './PostList.module.css';

const PostList = ({ isPosting, onStopPosting }) => {
  const [enteredBody, setEnteredBody] = useState('');
  const [enteredAuthor, setEnteredAuthor] = useState('');

  const bodyChangeHandler = (event) => {
    setEnteredBody(event.target.value);
  };

  const authorChangeHandler = (event) => {
    setEnteredAuthor(event.target.value);
  };

  return (
    <>
      {isPosting && (
        <Modal onClose={onStopPosting}>
          <NewPost
            onBodyChange={bodyChangeHandler}
            onAuthorChange={authorChangeHandler}
          />
        </Modal>
      )}
      <ul className={classes.posts}>
        <Post author={enteredAuthor} body={enteredBody} />
      </ul>
    </>
  );
};

export default PostList;
