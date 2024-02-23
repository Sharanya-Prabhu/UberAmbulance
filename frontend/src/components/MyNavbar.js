import { Link } from 'react-router-dom'
import { faUser} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MyNavbar = () => {
    return (
      <header>
        <nav>
          <div>
            <Link to="/" className='logo'> UberAmbulance</Link>
          </div>
          <ul className="navList">
              <li>
                Overview
              </li>
          </ul>
          <div>
              <FontAwesomeIcon icon={faUser} className='userIcon'/>
          </div>
        </nav>
      </header>
    )
}
export default MyNavbar;