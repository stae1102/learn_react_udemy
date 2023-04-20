import React, { useCallback, useReducer, useState, useMemo } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';

const ingredientReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.ingredients;
    case 'ADD':
      return [...state, action.ingredient];
    case 'DELETE':
      return state.filter((ing) => ing.id !== action.id);
    default:
      throw new Error('Should not get there!');
  }
};

const httpReducer = (httpState, action) => {
  switch (action.type) {
    case 'SEND':
      return { loading: true, error: null };
    case 'RESPONSE':
      return { ...httpState, loading: false };
    case 'ERROR':
      return { loading: false, error: action.errorMessage };
    case 'CLEAR':
      return { ...httpState, error: null };
    default:
      throw new Error('Should not be reached!');
  }
};

const Ingredients = () => {
  const [userIngredients, dispatchUserIngredients] = useReducer(
    ingredientReducer,
    []
  );
  const [httpState, dispatchHttpState] = useReducer(httpReducer, {
    loading: false,
    error: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const filteredIngredientsHandler = useCallback((filteredIngredients) => {
    dispatchUserIngredients({ type: 'SET', ingredients: filteredIngredients });
  }, []);

  const addIngredientHandler = useCallback(async (ingredient) => {
    dispatchHttpState({ type: 'SEND' });
    try {
      const response = await fetch(
        'https://react-http-10279-default-rtdb.firebaseio.com/ingredients.json',
        {
          method: 'POST',
          body: JSON.stringify(ingredient),
          headers: { 'Content-Type': 'application/json' },
        }
      );
      dispatchHttpState({ type: 'RESPONSE' });
      const responseData = await response.json();

      dispatchUserIngredients({
        type: 'ADD',
        ingredient: { id: responseData.name, ...ingredient },
      });
    } catch (error) {
      dispatchHttpState({
        type: 'ERROR',
        errorMessage: 'Something went wrong!',
      });
    }
  }, []);

  const removeIngredientHandler = useCallback(async (ingredientId) => {
    dispatchHttpState({ type: 'SEND' });
    try {
      await fetch(
        `https://react-http-10279-default-rtdb.firebaseio.com/ingredients/${ingredientId}.json`,
        {
          method: 'DELETE',
        }
      );
      dispatchHttpState({ type: 'RESPONSE' });

      dispatchUserIngredients({ type: 'DELETE', id: ingredientId });
    } catch (error) {
      dispatchHttpState({
        type: 'ERROR',
        errorMessage: 'Something went wrong!',
      });
    }
  }, []);

  const clearError = useCallback(() => {
    dispatchHttpState({ type: 'CLEAR' });
  }, []);

  const ingredientList = useMemo(() => {
    <IngredientList
      ingredients={userIngredients}
      onRemoveItem={removeIngredientHandler}
    />;
  }, [userIngredients, removeIngredientHandler]);

  return (
    <div className='App'>
      {httpState.error && (
        <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>
      )}
      <IngredientForm
        onAddIngredient={addIngredientHandler}
        loading={isLoading}
      />
      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        {ingredientList}
      </section>
    </div>
  );
};

export default Ingredients;
