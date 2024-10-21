import './Navbar.css'

//components
import { NavLink, Link } from 'react-router-dom'

//icons
import { BsSearch, BsHouseDoorFill, BsFillPersonFill, BsFillCameraFill } from "react-icons/bs";

const Navbar = () => {
    return <nav id="nav">
        <Link to="/">ReactGram</Link>
        <form id='search-form'>
            <BsSearch />
            <input type="text" name="" id="" placeholder='Pesquisar' />
        </form>
        <ul id="nav__links">
            <li>
                <NavLink to="/">
                    <BsHouseDoorFill></BsHouseDoorFill>
                </NavLink>
            </li>
            <li>
                <NavLink to="/login">
                    Entrar
                </NavLink>
            </li>
            <li>
                <NavLink to="/register">
                    Register
                </NavLink>
            </li>
        </ul>
    </nav>
}

export default Navbar