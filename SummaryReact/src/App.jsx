import Post from './components/Post';
import PostList from './components/PostList';

function App() {
  const posts = [
    { author: 'Maximilian', body: 'React.js is awesome!' },
    { author: 'Manuel', body: 'Check out the full course!' },
  ];

  return (
    <main>
      <PostList posts={posts} />
    </main>
  );
}

export default App;
