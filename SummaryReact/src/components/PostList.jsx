import Post from './Post';
import classes from './PostList.module.css';

const PostList = (props) => {
  const posts = props.posts.map((post) => (
    <Post author={post.author} body={post.body} />
  ));

  return <ul className={classes.posts}>{posts}</ul>;
};

export default PostList;
