"use client";
import Image from "next/image";
import Link from "next/link";
import { Post } from "./models/post";
import { useEffect, useState } from "react";
import { axiosInstance } from "./utils/axiosInstance";

export const fetchPosts = async () => {
  const response = await axiosInstance("/get-posts");
  const data = response?.data;

  return data ?? [];
};

export default function Home({}) {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const getPosts = async () => {
      const data: Post[] = await fetchPosts();
      setPosts(data);
    };

    getPosts();
  }, []);

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div>
        <h1>All Posts</h1>

        <Link href="/create-post">Create New Post</Link>
      </div>

      <div className="flex flex-col gap-5">
        {posts?.length > 0 ? (
          posts?.map((post) => (
            <div key={post.id}>
              <Link href={`/post/${post.id}`}>
                <h3 className="font-bold underline">{post.title}</h3>
              </Link>
              <p>{post.body}</p>
            </div>
          ))
        ) : (
          <div>
            <p>No posts at this time</p>
            <Link className="mt-4" href="/create-post">
              Create Post
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
