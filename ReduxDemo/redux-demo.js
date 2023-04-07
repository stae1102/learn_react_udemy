import rtx from '@reduxjs/toolkit';
const { configureStore } = rtx;

const counterReducer = (state = { counter: 0 }, action) => {
  if (action.type === 'INCREMENT') {
    return {
      counter: state.counter + 1,
    };
  }

  if (action.type === 'DECREMENT') {
    return {
      counter: state.counter - 1,
    };
  }

  return state;
};

const store = configureStore({
  reducer: counterReducer,
});

const counterSubscriber = () => {
  const latestState = store.getState();
  console.log(latestState);
};

store.subscribe(counterSubscriber);

store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'DECREMENT' });
