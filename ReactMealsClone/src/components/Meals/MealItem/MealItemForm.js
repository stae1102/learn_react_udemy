import classes from './MealItemForm.module.css';

const MealItemForm = (props) => {
  return (
    <form className={classes.form}>
      <label htmlFor='amount' className={classes}>
        Amount
      </label>
      <input />
      <button type='submit'>+ Add</button>
    </form>
  );
};

export default MealItemForm;
