import { Link, Outlet } from "react-router-dom"
import "./root.css"

function root() {
  return (
    <div className="root">
        <div className="navbar">
            <Link className="navLink" to="/">Vote</Link>
            <span className="navLink">|</span>
            <Link className="navLink" to="/results">Results</Link>
        </div>

        <Outlet />

    </div>
  )
}

export default root