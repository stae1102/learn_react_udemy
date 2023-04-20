import React, { useCallback, useReducer, useEffect, useMemo } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';
import useHttp from '../../hooks/use-http';

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

const Ingredients = () => {
  const [userIngredients, dispatchUserIngredients] = useReducer(
    ingredientReducer,
    []
  );
  const { isLoading, error, data, sendRequest, reqExtra, reqIdentifier } =
    useHttp();

  useEffect(() => {
    if (!isLoading && !error && reqIdentifier === 'REMOVE_INGREDIENT') {
      dispatchUserIngredients({ type: 'DELETE', id: reqExtra });
    } else if (!isLoading && !error && reqIdentifier === 'ADD_INGREDIENT') {
      dispatchUserIngredients({
        type: 'ADD',
        ingredient: { id: data.name, ...reqExtra },
      });
    }
  }, [data, reqExtra, reqIdentifier, isLoading, error]);

  const filteredIngredientsHandler = useCallback((filteredIngredients) => {
    dispatchUserIngredients({ type: 'SET', ingredients: filteredIngredients });
  }, []);

  const addIngredientHandler = useCallback(async (ingredient) => {
    sendRequest(
      'https://react-http-10279-default-rtdb.firebaseio.com/ingredients.json',
      'POST',
      JSON.stringify(ingredient),
      ingredient,
      'ADD_INGREDIENT'
    );
  }, []);

  const removeIngredientHandler = useCallback(
    async (ingredientId) => {
      sendRequest(
        `https://react-http-10279-default-rtdb.firebaseio.com/ingredients/${ingredientId}.json`,
        'DELETE',
        null,
        ingredientId,
        'REMOVE_INGREDIENT'
      );
    },
    [sendRequest]
  );

  const clearError = useCallback(() => {}, []);

  const ingredientList = useMemo(() => {
    <IngredientList
      ingredients={userIngredients}
      onRemoveItem={removeIngredientHandler}
    />;
  }, [userIngredients, removeIngredientHandler]);

  return (
    <div className='App'>
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
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
