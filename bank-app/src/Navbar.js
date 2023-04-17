import { Link, useMatch, useResolvedPath } from "react-router-dom"

const Navbar = () => {
 return (
  <nav className="navbar">
   <Link to="/home">
    <h1>Consens</h1><h1 className="h1Bank">Bank</h1>
   </Link>
   <ul>
     <CustomLink to="/home">Home</CustomLink>
    <CustomLink to="/about">About</CustomLink>
    <CustomLink to="/login">Login</CustomLink>
   </ul>
  </nav>
 )
}

function CustomLink({ to, children, ...props }) {
 const resolvedPath = useResolvedPath(to)
 const isActive = useMatch({ path: resolvedPath.pathname, end: true })
 return (
  <li className={isActive ? "active" : ""}>
   <Link to={to} {...props}>
    {children}
   </Link>
   </li>
  )
}
 
export default Navbar;