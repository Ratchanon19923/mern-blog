import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import PostCard from "../components/PostCard";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/post/getposts");
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);
  return (
    <div>
      <div className=" flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold lg:text-6xl">Welcome to my Blog</h1>
        <p className="text-gray-500 text-xs sm:text-sm">
          Welcome to Fisguxsose – Your Gateway to Insightful Content! Step into
          a world where words come alive, ideas flourish, and knowledge thrives.
          Welcome to Fisguxsose, your digital haven for inspiration,
          information, and entertainment. Whether you're a seasoned enthusiast
          or a curious explorer, here you'll find a diverse array of articles,
          guides, and stories tailored to pique your interest and expand your
          horizons. Dive into our carefully curated content spanning a multitude
          of topics, from technology and science to arts and culture, from
          practical tips to thought-provoking insights. Whatever your passion or
          pursuit, we've got something for you. Join our vibrant community of
          readers and contributors as we embark on a journey of discovery
          together. Feel free to explore, engage, and share your thoughts. Your
          voice matters here. So, welcome aboard! Let's embark on this exciting
          adventure of exploration and enlightenment. Happy reading!"
        </p>
        <Link
          to="/search"
          className="text-xs sm:text-sm text-teal-500 text-bold hover:underline"
        >
          View all posts
        </Link>
      </div>
      <div className="p-3 bg-amber-100 dark:bg-slate-700">
        <CallToAction />
      </div>
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-center"> Recent post</h2>
            <div className="flex flex-wrap gap-4">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to="search"
              className="text-lg text-teal-500 hover:underline text-center"
            >
              View all posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
