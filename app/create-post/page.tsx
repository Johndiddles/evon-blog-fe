"use client";
import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/userAuth";
import { useRouter } from "next/navigation";
// import { useRouter as useNextRouter } from "next/router";
import { axiosInstance } from "../utils/axiosInstance";
import { toast } from "react-toastify";

type blogPost = {
  title: string;
  body: string;
};
const CreatePostPage = () => {
  const router = useRouter();
  // const nextRouter = useNextRouter();

  const { isAuth } = useUserContext();
  const [blogPost, setBlogPost] = useState<blogPost>({
    title: "",
    body: "",
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const publishPost = async (data: blogPost) => {
    setIsSubmitting(true);
    try {
      const response = await axiosInstance.post("/create-post", data);
      if (response.status === 201) {
        router.push("/");
        setIsSubmitting(false);
      }
      setIsSubmitting(false);
    } catch (error: any) {
      toast.error(error?.response?.data?.error);
      setIsSubmitting(false);
    }
  };

  if (!isAuth) {
    return router.push("/login");
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="container bg-white rounded-lg py-4 px-4 md:py-8 md:px-10 flex flex-col gap-5">
        <div className="font-bold text-2xl">Create New Blog Post</div>
        <form action="">
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-sm" htmlFor="">
              Title:
            </label>
            <input
              className="bg-gray-100 py-3 px-4 border border-slate-300 outline-slate-500 text-slate-700 text-lg font-bold"
              type="text"
              placeholder="Enter Title..."
              value={blogPost.title}
              onChange={(e) =>
                setBlogPost((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
            />
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <label className="font-semibold text-sm" htmlFor="">
              Post:
            </label>
            <textarea
              className="bg-gray-100 py-3 px-4 border border-slate-300 outline-slate-500 text-slate-500 text-sm"
              rows={6}
              placeholder="Write here..."
              value={blogPost.body}
              onChange={(e) =>
                setBlogPost((prev) => ({
                  ...prev,
                  body: e.target.value,
                }))
              }
            />
          </div>

          <div className="mt-5">
            <button
              className="bg-slate-700 text-gray-100 hover:bg-slate-900 hover:text-gray-50 duration-300 py-2 px-5 rounded font-semibold"
              onClick={(e) => {
                e.preventDefault();
                publishPost(blogPost);
              }}
            >
              {isSubmitting ? "Publishing..." : "Publish"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default CreatePostPage;
