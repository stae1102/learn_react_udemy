import { Outlet } from 'react-router-dom';
import EventsNavigation from '../EventsNavigation';

const EventLayout = () => {
  return (
    <>
      <EventsNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default EventLayout;
