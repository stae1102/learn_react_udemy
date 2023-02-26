import styles from './UserInput.module.css';

const UserInput = (props) => {
  return (
    <form>
      <div className={styles['new-user__controls']}>
        <div className={styles['new-user__control']}>
          <label>Username</label>
          <input type='text' />
        </div>
        <div className={styles['new-user__control']}>
          <label>Age (Years)</label>
          <input type='number' />
        </div>
      </div>
    </form>
  );
};

export default UserInput;
