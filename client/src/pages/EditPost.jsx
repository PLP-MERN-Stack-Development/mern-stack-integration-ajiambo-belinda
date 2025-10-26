import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/apiService";

export default function EditPost() {
  const { id } = useParams();               // Get post ID from URL
  const navigate = useNavigate();           // For redirecting after update

  const [title, setTitle] = useState("");   // Post title
  const [content, setContent] = useState(""); // Post content
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState("");      // Error state

  // Fetch post data when component mounts
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await API.get(`/posts/${id}`);
        setTitle(res.data.title);
        setContent(res.data.content);
      } catch (err) {
        setError("Failed to load post");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/posts/${id}`, { title, content });
      navigate(`/posts/${id}`); // Redirect to post detail
    } catch (err) {
      setError("Failed to update post");
      console.log(err);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading post...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Edit Post</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="6"
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>

          {error && <p className="text-red-600 mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
}
