import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBolt,
  faCalendarDay,
  faMessage,
  faBell,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const UserNav = () => {
  return (
    <nav className='w-full px-40 py-4 flex justify-center shadow-md'>
      <ul className='flex gap-5'>
        <li className='group relative'>
          <Link to='/activity' className='link-underline' aria-label='activity'>
            <FontAwesomeIcon icon={faBolt} />
            <span className='tooltip'>Activity</span>
          </Link>
        </li>
        <li className='group relative'>
          <Link to='/calendar' className='link-underline' aria-label='calendar'>
            <FontAwesomeIcon icon={faCalendarDay} />
            <span className='tooltip'>Calendar</span>
          </Link>
        </li>
        <li className='group relative'>
          <Link to='/messages' className='link-underline' aria-label='messages'>
            <FontAwesomeIcon icon={faMessage} />
            <span className='tooltip'>Messages</span>
          </Link>
        </li>
        <li className='group relative'>
          <Link
            to='/notifications'
            className='link-underline'
            aria-label='notifications'
          >
            <FontAwesomeIcon icon={faBell} />
            <span className='tooltip'>Notifications</span>
          </Link>
        </li>
        <li className='group relative'>
          <Link to='/profile' className='link-underline' aria-label='profile'>
            <FontAwesomeIcon icon={faUser} />
            <span className='tooltip'>Profile</span>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default UserNav
