import { NavLink } from 'react-router-dom';

import { useParams } from 'react-router-dom';

import classes from './MainNavigation.module.css';

function MainNavigation() {
  const params = useParams();

  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to='/'
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to='events'
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Events
            </NavLink>
          </li>
          <li>
            <NavLink
              to='events/1'
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end={params}
            >
              Event Detail
            </NavLink>
          </li>
          <li>
            <NavLink
              to='events/new'
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end='new'
            >
              Add new Event
            </NavLink>
          </li>
          <li>
            <NavLink
              to='events/1/edit'
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end='edit'
            >
              Edit Event
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
