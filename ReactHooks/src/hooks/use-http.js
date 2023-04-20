import { useReducer, useCallback } from 'react';

const httpReducer = (httpState, action) => {
  switch (action.type) {
    case 'SEND':
      return { loading: true, error: null, data: null };
    case 'RESPONSE':
      return { ...httpState, loading: false, data: action.responseData };
    case 'ERROR':
      return { loading: false, error: action.errorMessage };
    case 'CLEAR':
      return { ...httpState, error: null };
    default:
      throw new Error('Should not be reached!');
  }
};

const useHttp = (url, method, body) => {
  const [httpState, dispatchHttpState] = useReducer(httpReducer, {
    loading: false,
    error: null,
    data: null,
  });

  const sendRequest = useCallback(async () => {
    dispatchHttpState({ type: 'SEND' });

    try {
      const response = await fetch(url, {
        method,
        body,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const responseData = await response.json();
      dispatchHttpState({ type: 'RESPONSE', responseData });
    } catch (error) {
      dispatchHttpState({
        type: 'ERROR',
        errorMessage: 'Something went wrong!',
      });
    }
  }, [url, method, body]);

  return {
    isLoading: httpState.isLoading,
    data: httpState.data,
    error: httpState.error,
    sendRequest,
  };
};

export default useHttp;
