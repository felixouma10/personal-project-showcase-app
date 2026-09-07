import { Link } from "react-router";
import UserAvatar from "../UserAvatar";

function NavBar() {
  return (
    <nav className="mb-10 bg-white shadow">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          to="/"
          className="text-xl font-bold text-blue-600"
        >
          Project Showcase App
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="font-medium hover:text-blue-600"
          >
            Home
          </Link>

          <Link
            to="/projects"
            className="font-medium hover:text-blue-600"
          >
            Projects
          </Link>

          <Link
            to="/projects/new"
            className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
          >
            Add Project
          </Link>

          <UserAvatar />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;