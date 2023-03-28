import { useParams } from 'react-router-dom';

const EventDetailPage = () => {
  const params = useParams();

  return <h1>My Event {params.eventId} Page!</h1>;
};

export default EventDetailPage;
