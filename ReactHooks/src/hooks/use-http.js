import { useReducer, useCallback } from 'react';

const initialState = {
  loading: false,
  error: null,
  data: null,
  extra: null,
  identifier: null,
};

const httpReducer = (httpState, action) => {
  switch (action.type) {
    case 'SEND':
      return {
        loading: true,
        error: null,
        data: null,
        extra: null,
        identifier: action.identifier,
      };
    case 'RESPONSE':
      return {
        ...httpState,
        loading: false,
        data: action.responseData,
        extra: action.extra,
      };
    case 'ERROR':
      return { loading: false, error: action.errorMessage };
    case 'CLEAR':
      return initialState;
    default:
      throw new Error('Should not be reached!');
  }
};

const useHttp = () => {
  const [httpState, dispatchHttpState] = useReducer(httpReducer, initialState);

  const clear = useCallback(() => dispatchHttpState({ type: 'CLEAR' }), []);

  const sendRequest = useCallback(
    async (url, method, body, reqExtra, reqIdentifier) => {
      dispatchHttpState({ type: 'SEND', identifier: reqIdentifier });

      try {
        const response = await fetch(url, {
          method,
          body,
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const responseData = await response.json();
        dispatchHttpState({ type: 'RESPONSE', responseData, extra: reqExtra });
      } catch (error) {
        dispatchHttpState({
          type: 'ERROR',
          errorMessage: 'Something went wrong!',
        });
      }
    },
    []
  );

  return {
    isLoading: httpState.isLoading,
    data: httpState.data,
    error: httpState.error,
    sendRequest,
    requestExtra: httpState.extra,
    reqIdentifier: httpState.identifier,
    clear,
  };
};

export default useHttp;
