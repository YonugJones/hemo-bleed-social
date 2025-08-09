import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
  return (
    <footer className='text-center py-4 text-sm'>
      &copy; 2025 Peter Kerfoot
      <a className='ml-2' href='https://github.com/YonugJones?tab=repositories'>
        <FontAwesomeIcon icon={faGithub} />
      </a>
    </footer>
  )
}

export default Footer
