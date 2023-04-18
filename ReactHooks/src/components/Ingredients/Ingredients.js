import React, { useCallback, useEffect, useState } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([]);

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
    const response = await fetch(
      'https://react-http-10279-default-rtdb.firebaseio.com/ingredients.json',
      {
        method: 'POST',
        body: JSON.stringify(ingredient),
        headers: { 'Content-Type': 'application/json' },
      }
    );
    const responseData = await response.json();
    setUserIngredients((prevIngredients) => [
      ...prevIngredients,
      { id: responseData.name, ...ingredient },
    ]);
  };

  const removeIngredientHandler = (ingredientId) => {
    const updatedIngredients = userIngredients.filter(
      (ingredient) => ingredient.id !== ingredientId
    );
    setUserIngredients(updatedIngredients);
  };

  return (
    <div className='App'>
      <IngredientForm onAddIngredient={addIngredientHandler} />

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
