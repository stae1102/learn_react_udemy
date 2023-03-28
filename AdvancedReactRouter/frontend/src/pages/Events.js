import { Link } from 'react-router-dom';

const DUMMY_EVENTS = [
  {
    id: 'e1',
    title: 'I Love Kimchi',
  },
  {
    id: 'e2',
    title: `What doesn't kill you make you stronger`,
  },
];

const EventsPage = () => {
  return (
    <>
      <h1>My Events Page!</h1>
      <ul>
        {DUMMY_EVENTS.map((event) => (
          <li key={event.id}>
            <Link to={event.id} relative='route'>
              {event.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default EventsPage;
