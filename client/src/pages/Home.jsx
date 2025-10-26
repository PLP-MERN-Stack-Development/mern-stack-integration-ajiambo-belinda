import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import API from "../api/apiService";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Fixed fetchPosts function
  const fetchPosts = async () => {
    try {
      const res = await API.get("/posts");
      console.log("API Response:", res.data);

      if (Array.isArray(res.data)) {
        setPosts(res.data);
      } else if (Array.isArray(res.data.data)) {
        setPosts(res.data.data);
      } else if (Array.isArray(res.data.posts)) {
        setPosts(res.data.posts);
      } else {
        // If no posts array is found
        setPosts([]);
        setError(res.data.message || "No posts found");
      }
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError("Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
          All Posts
        </h1>

        {posts.length === 0 ? (
          <p className="text-center text-gray-500">
            {error || "No posts available."}
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post._id || post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


