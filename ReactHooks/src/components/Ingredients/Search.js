import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo((props) => {
  const { onLoadIngredients } = props;
  const [enteredFilter, setEnteredFilter] = useState('');
  const inputRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      if (enteredFilter === inputRef.current.value) {
        const loadedIngredients = [];

        const fetchIngredients = async () => {
          const query =
            enteredFilter.length === 0
              ? ''
              : `?orderBy="title"&equalTo="${enteredFilter}"`;
          const response = await fetch(
            'https://react-http-10279-default-rtdb.firebaseio.com/ingredients.json' +
              query
          );
          const responseData = await response.json();

          for (const key in responseData) {
            loadedIngredients.push({
              id: key,
              title: responseData[key].title,
              amount: responseData[key].amount,
            });
          }

          props.onLoadIngredients(loadedIngredients);
        };
        fetchIngredients();
      }
    }, 500);
  }, [enteredFilter, onLoadIngredients, props, inputRef]);

  return (
    <section className='search'>
      <Card>
        <div className='search-input'>
          <label>Filter by Title</label>
          <input
            ref={inputRef}
            type='text'
            value={enteredFilter}
            onChange={(event) => setEnteredFilter(event.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
