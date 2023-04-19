import React, { useCallback, useEffect, useState } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';

const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const loadedIngredients = [];

    const fetchIngredients = async () => {
      const response = await fetch(
        'https://react-http-10279-default-rtdb.firebaseio.com/ingredients.json'
      );
      const responseData = await response.json();

      for (const key in responseData) {
        loadedIngredients.push({
          id: key,
          title: responseData[key].title,
          amount: responseData[key].amount,
        });
      }

      setUserIngredients(loadedIngredients);
    };

    fetchIngredients();
  }, []);

  const filteredIngredientsHandler = useCallback((filteredIngredients) => {
    setUserIngredients(filteredIngredients);
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
      setUserIngredients((prevIngredients) => [
        ...prevIngredients,
        { id: responseData.name, ...ingredient },
      ]);
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
    const updatedIngredients = userIngredients.filter(
      (ingredient) => ingredient.id !== ingredientId
    );
    setUserIngredients(updatedIngredients);
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
