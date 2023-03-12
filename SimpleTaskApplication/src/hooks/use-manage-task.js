import { useState } from 'react';

const useManageTask = (method = 'GET', taskHandler) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  if (method === 'GET') {
    throw new Error('GET method not supported!');
  }

  if (method === 'POST' && !taskHandler) {
    throw new Error('taskHandler not provided!');
  }

  const enterTaskHandler = async (taskText) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://react-http-10279-default-rtdb.firebaseio.com/tasks.json', {
        method: 'POST',
        body: JSON.stringify({ text: taskText }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Request failed!');
      }

      const data = await response.json();

      const generatedId = data.name; // firebase-specific => "name" contains generated id
      const createdTask = { id: generatedId, text: taskText };

      taskHandler(createdTask);
    } catch (err) {
      setError(err.message || 'Something went wrong!');
    }
    setIsLoading(false);
  };

  return [isLoading, error, enterTaskHandler];
};

export default useManageTask;
