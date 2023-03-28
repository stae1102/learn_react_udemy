import { Link } from 'react-router-dom';

import classes from './MainNavigation.module.css';

function MainNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <Link to='/' end>
              Home
            </Link>
          </li>
          <li>
            <Link to='events'>Events</Link>
          </li>
          <li>
            <Link to='events/1'>Event Detail</Link>
          </li>
          <li>
            <Link to='events/new'>Add new Event</Link>
          </li>
          <li>
            <Link to='events/1/edit'>Edit Event</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
