import { Link } from 'react-router-dom';

const EventsPage = () => {
  return (
    <>
      <h1>My Events Page!</h1>
      <ul>
        <li>
          <Link to='1' relative='route'>
            Event 1
          </Link>
        </li>
        <li>
          <Link to='2' relative='route'>
            Event 2
          </Link>
        </li>
        <li>
          <Link to='3' relative='route'>
            Event 3
          </Link>
        </li>
      </ul>
    </>
  );
};

export default EventsPage;
