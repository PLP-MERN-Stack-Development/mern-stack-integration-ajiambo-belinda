import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 p-4 text-white shadow">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="font-bold text-xl">My Blog App</h1>
        <div className="space-x-6">
          <Link to="/" className="hover:text-gray-200 transition">
            Home
          </Link>
          <Link to="/posts/1" className="hover:text-gray-200 transition">
            Post Detail
          </Link>
          <Link to="/create" className="hover:text-gray-200 transition">
            Create Post
          </Link>
          <Link to="/edit/1" className="hover:text-gray-200 transition">
            Edit Post
          </Link>
        </div>
      </div>
    </nav>
  );
}



