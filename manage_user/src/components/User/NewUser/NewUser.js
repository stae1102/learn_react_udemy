import { useState } from 'react';

import Card from '../../UI/Card/Card';
import UserInput from '../UserInput/UserInput';

const NewUser = (props) => {
  const [enteredUsername, setEnteredUsername] = useState('');

  const AddUserHandler = (enteredUser) => {
    setEnteredUsername(enteredUser);
    console.log(enteredUsername);
  };

  return (
    <Card>
      <UserInput onAddUser={AddUserHandler} />
    </Card>
  );
};

export default NewUser;
