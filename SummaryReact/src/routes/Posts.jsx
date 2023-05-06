import { useState } from 'react';

import PostList from '../components/PostList';
import { Outlet } from 'react-router-dom';

function Posts() {
  return (
    <>
      <Outlet />
      <main>
        <PostList />
      </main>
    </>
  );
}

export default Posts;

export const loader = async () => {
  const response = await fetch('http://localhost:8080/posts');
  const responseData = await response.json();
  return responseData.posts;
};
