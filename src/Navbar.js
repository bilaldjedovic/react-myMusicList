import {NavLink} from 'react-router-dom'


export default function Navbar(){
    return <nav className="navbar navbar-expand-sm">
        <ul  className="navbar-nav">
            <li className="nav-item- m-1">
            <NavLink  type="button"
                    className="btn btn-light btn-outline-info" to="/songs">Songs</NavLink>
            </li>

            <li className="nav-item- m-1">
            <NavLink  type="button"
                    className="btn btn-light btn-outline-info" to="/categories">Categories</NavLink>
            </li>
            <li className="nav-item- m-1">
            <NavLink  type="button"
                    className="btn btn-light btn-outline-info" to="/addSong">Add song</NavLink>
            </li>
            <li className="nav-item- m-1">
            <NavLink  type="button"
                    className="btn btn-light btn-outline-info" to="/addcategory">Add category</NavLink>
            </li>
            
        </ul>
    </nav>
}