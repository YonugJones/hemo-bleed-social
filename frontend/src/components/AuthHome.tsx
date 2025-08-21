import { Link } from 'react-router-dom'
import { formClass, buttonClass } from '../styles/classNames'

const AuthHome = () => {
  return (
    <div className={formClass}>
      <Link to='/signup'>
        <button className={buttonClass}>Create an account</button>
      </Link>
      <Link to='/login'>
        <button className={buttonClass}>Log in</button>
      </Link>
    </div>
  )
}

export default AuthHome
