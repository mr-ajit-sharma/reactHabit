import { Link } from 'react-router-dom'
import './sidenavbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse} from '@fortawesome/free-solid-svg-icons'
const SideNavbar = ({activeNav})=>{
    console.log("Active Nav:", activeNav);
    return(
        <div className="sidebar-container">
            <h2 className='logo-name'>Buddy's habit</h2>

            <ul className="navigation-list">
                <li className={`navigation-items ${activeNav === "dashboard" ? "active-nav": ""}`}>
                    <Link className={`links ${activeNav === "dashboard" ? "active-link": ""}`} to='/'>
                    <FontAwesomeIcon icon={faHouse} />
                        Today</Link>
                </li>

            </ul>
        </div>
    )
}

export default SideNavbar