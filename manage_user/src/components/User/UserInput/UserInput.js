import { useState } from 'react';

import styles from './UserInput.module.css';

import Button from './../../UI/Button/Button';

const UserInput = (props) => {
  const [newUserInfo, setNewUserInfo] = useState({ enteredUsername: '', enteredAge: '' });

  const usernameChangeHandler = (event) => {
    setNewUserInfo((prevState) => ({
      ...prevState,
      enteredUsername: event.target.value,
    }));
  };

  const ageChangeHandler = (event) => {
    setNewUserInfo((prevState) => ({
      ...prevState,
      enteredAge: event.target.value,
    }));
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const newUserData = { username: newUserInfo.enteredUsername, age: newUserInfo.enteredAge };

    props.onAddUser(newUserData);
  };

  return (
    <form onSubmit={submitHandler}>
      <div className={styles['new-user__controls']}>
        <div className={styles['new-user__control']}>
          <label>Username</label>
          <input type='text' value={newUserInfo.username} onChange={usernameChangeHandler} />
        </div>
        <div className={styles['new-user__control']}>
          <label>Age (Years)</label>
          <input type='number' value={newUserInfo.age} onChange={ageChangeHandler} min='1' max='120' step='1' />
        </div>
      </div>
      <Button type='submit'>Add User</Button>
    </form>
  );
};

export default UserInput;
