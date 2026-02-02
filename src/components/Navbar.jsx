import { NavLink } from 'react-router-dom'
import "./Navbar.css"
const Navbar = () => {
  return (
    <nav className='navbar' >
      <h2 className='logo'>Restaurant Admin</h2>

      <div className='nav-links'>
        <NavLink
          to="/menu"
         className='link'
        >
          Menu
        </NavLink>

        <NavLink
          to="/orders"
          className='link'
        >
          Orders
        </NavLink>
      </div>
    </nav>
  )
}


export default Navbar