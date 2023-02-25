import { useState } from 'react';

import Card from '../UI/Card';
import ExpensesFilter from './ExpensesFilter';
import ExpenseItem from './ExpenseItem';
import './Expenses.css';

const Expenses = (props) => {
  const [filteredYear, setFilteredYear] = useState(new Date().getFullYear());

  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
  };

  return (
    <div>
      <Card className='expenses'>
        <ExpensesFilter selected={filteredYear} onChangeFilter={filterChangeHandler} />
        {props.items.map((expense) => {
          if (expense.date.getFullYear().toString() === filteredYear) {
            return (
              <ExpenseItem
                key={expense.id}
                onChangeFilter={filterChangeHandler}
                title={expense.title}
                amount={expense.amount}
                date={expense.date}
              />
            );
          }
        })}
      </Card>
    </div>
  );
};

export default Expenses;
