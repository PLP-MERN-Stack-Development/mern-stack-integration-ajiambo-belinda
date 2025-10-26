import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../api/apiService";

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await API.get(`/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!post) return <p className="text-center mt-10">Post not found</p>;

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">{post.title}</h1>
        <p className="text-gray-500 mb-6">
          By <span className="font-semibold">{post.author}</span> on {new Date(post.createdAt).toLocaleDateString()}
        </p>
        <p className="text-gray-700 leading-relaxed mb-6">{post.content}</p>
        <Link
          to="/"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
