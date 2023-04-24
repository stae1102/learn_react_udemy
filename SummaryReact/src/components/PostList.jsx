import NewPost from './NewPost';
import Post from './Post';
import classes from './PostList.module.css';

const PostList = (props) => {
  const posts = props.posts.map((post) => (
    <Post author={post.author} body={post.body} />
  ));

  return (
    <>
      <NewPost />
      <ul className={classes.posts}>{posts}</ul>
    </>
  );
};

export default PostList;
