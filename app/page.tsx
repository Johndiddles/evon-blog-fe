"use client";
import Link from "next/link";
import { Post } from "./models/post";
import { useEffect, useState } from "react";
import { axiosInstance } from "./utils/axiosInstance";

// const fetchPosts = async () => {
//   const response = await axiosInstance("/get-posts");
//   const data = response?.data;

//   return data ?? [];
// };

export default function Home({}) {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const getPosts = async () => {
      const response = await axiosInstance("/get-posts");
      const data = response?.data;
      setPosts(data);
    };

    getPosts();
  }, []);

  return (
    <main className="flex flex-col items-center justify-between p-24 flex-grow">
      <div className="container">
        <div className="flex justify-between bg-white rounded-lg py-3 px-4 md:py-5 md:px-8">
          <h1>All Posts</h1>

          <Link href="/create-post" className="underline">
            Create New Post
          </Link>
        </div>

        <div className="flex flex-col gap-5 mt-5 md:mt-8 bg-white rounded-lg py-3 px-4 md:py-5 md:px-8">
          {posts?.length > 0 ? (
            posts?.map((post) => (
              <div
                key={post.id}
                className="border-b border-b-[rgba(0,0,0,0.05)] pb-4"
              >
                <Link href={`/post/${post.id}`}>
                  <h3 className="font-bold underline">{post.title}</h3>
                </Link>
                <p>{post.body}</p>
              </div>
            ))
          ) : (
            <div>
              <p className="text-center">No posts at this time</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
