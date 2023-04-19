import React, { useCallback, useReducer, useState } from 'react';

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

const Ingredients = () => {
  const [userIngredients, dispatchUserIngredients] = useReducer(
    ingredientReducer,
    []
  );

  // const [userIngredients, setUserIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const filteredIngredientsHandler = useCallback((filteredIngredients) => {
    dispatchUserIngredients({ type: 'SET', ingredients: filteredIngredients });
  }, []);

  const addIngredientHandler = async (ingredient) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        'https://react-http-10279-default-rtdb.firebaseio.com/ingredients.json',
        {
          method: 'POST',
          body: JSON.stringify(ingredient),
          headers: { 'Content-Type': 'application/json' },
        }
      );
      setIsLoading(false);
      const responseData = await response.json();
      // setUserIngredients((prevIngredients) => [
      //   ...prevIngredients,
      //   { id: responseData.name, ...ingredient },
      // ]);
      dispatchUserIngredients({
        type: 'ADD',
        ingredient: { id: responseData.name, ...ingredient },
      });
    } catch (error) {
      setError('Something went wrong!');
    }
  };

  const removeIngredientHandler = async (ingredientId) => {
    setIsLoading(true);
    await fetch(
      `https://react-http-10279-default-rtdb.firebaseio.com/ingredients/${ingredientId}.json`,
      {
        method: 'DELETE',
      }
    );
    setIsLoading(false);
    // const updatedIngredients = userIngredients.filter(
    //   (ingredient) => ingredient.id !== ingredientId
    // );
    // setUserIngredients(updatedIngredients);
    dispatchUserIngredients({ type: 'DELETE', id: ingredientId });
  };

  const clearError = () => {
    setError(null);
    setIsLoading(false);
  };

  return (
    <div className='App'>
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
      <IngredientForm
        onAddIngredient={addIngredientHandler}
        loading={isLoading}
      />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList
          ingredients={userIngredients}
          onRemoveItem={removeIngredientHandler}
        />
      </section>
    </div>
  );
};

export default Ingredients;
