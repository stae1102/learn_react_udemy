import { useLoaderData } from 'react-router-dom';

import EventsList from '../components/EventsList';

const EventsPage = () => {
  const data = useLoaderData();
  const events = data.events;

  if (data.isError) {
    return <p>{data.message}</p>;
  }

  return <EventsList events={events} />;
};

export default EventsPage;

export const loader = async () => {
  const response = await fetch('http://localhost:8080/evaents');

  if (!response.ok) {
    throw { message: 'Could not fetch events.' };
  } else {
    return response;
  }
};
