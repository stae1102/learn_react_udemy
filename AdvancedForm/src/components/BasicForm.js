// import { useInput } from '../hooks/use-input';
import useInput from '../hooks/use-form-input';

const BasicForm = (props) => {
  const {
    value: enteredFirstName,
    hasError: firstNameHasError,
    isValid: firstNameIsValid,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: resetFirstName,
  } = useInput((value) => value.trim() !== '');
  const {
    value: enteredLastName,
    hasError: lastNameHasError,
    isValid: lastNameIsValid,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastName,
  } = useInput((value) => value.trim() !== '');
  const {
    value: enteredEmail,
    hasError: emailHasError,
    isValid: emailIsValid,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput((value) => value.includes('@'));

  const formIsValid = firstNameIsValid && lastNameIsValid && emailIsValid;

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    resetFirstName();
    resetLastName();
    resetEmail();
  };

  const firstNameClasses = firstNameHasError ? 'form-control invalid' : 'form-control';
  const lastNameClasses = lastNameHasError ? 'form-control invalid' : 'form-control';
  const emailClasses = emailHasError ? 'form-control invalid' : 'form-control';

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className='control-group'>
        <div className={firstNameClasses}>
          <label htmlFor='name'>First Name</label>
          <input
            type='text'
            id='name'
            value={enteredFirstName}
            onChange={firstNameChangeHandler}
            onBlur={firstNameBlurHandler}
          />
          {firstNameHasError && <p className='error-text'>First name is needed.</p>}
        </div>
        <div className={lastNameClasses}>
          <label htmlFor='name'>Last Name</label>
          <input
            type='text'
            id='name'
            value={enteredLastName}
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurHandler}
          />
          {lastNameHasError && <p className='error-text'>Last name is needed.</p>}
        </div>
      </div>
      <div className={emailClasses}>
        <label htmlFor='name'>E-Mail Address</label>
        <input type='text' id='name' value={enteredEmail} onChange={emailChangeHandler} onBlur={emailBlurHandler} />
        {emailHasError && <p className='error-text'>Email is needed.</p>}
      </div>
      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
