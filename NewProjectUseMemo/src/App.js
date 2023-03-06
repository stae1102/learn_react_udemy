import React, { useState, useCallback } from 'react';

import Button from './components/UI/Button/Button';
import './App.css';

function App() {
  const [listTitle, setListTitle] = useState('My List');

  const changeTitleHandler = useCallback(() => {
    setListTitle('New Title');
  }, []);

  return <div className='app'></div>;
}

export default App;
