import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition bg-white">
      <h2 className="font-bold text-xl mb-2">{post.title}</h2>
      <p className="text-gray-700 mb-4">
        {post.content.length > 100 ? post.content.slice(0, 100) + "..." : post.content}
      </p>
      <Link to={`/posts/${post._id}`} className="text-blue-600 hover:underline">
        Read More
      </Link>
    </div>
  );
}
