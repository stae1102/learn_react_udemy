import { useParams } from 'react-router-dom';

const EventDetailPage = () => {
  const params = useParams();

  return (
    <>
      <h1>My Event Detail Page!</h1>
      <p>Event ID: {params.eventId}</p>
    </>
  );
};

export default EventDetailPage;

export const loader = async ({ request, params }) => {
  const id = params.eventId;

  const response = await fetch(`http://localhost:8080/events/${id}`);

  if (!response.ok) {
    throw json(
      { message: 'Could not fetch details for selected event.' },
      {
        status: 500,
      }
    );
  }

  return response;
};
