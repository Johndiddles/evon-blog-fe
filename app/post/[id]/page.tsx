"use client";
import React, { useEffect, useState } from "react";
import { Post } from "@/app/models/post";
import moment from "moment";
import { axiosInstance } from "@/app/utils/axiosInstance";
import { FaEdit } from "react-icons/fa";
import { useUserContext } from "@/app/context/userAuth";
import Article from "@/app/components/Article";
import { toast } from "react-toastify";

const SinglePostPage = ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const { isAuth, userDetails } = useUserContext();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [fetchPostStatus, setFetchPostStatus] = useState<string>("idle");
  const [post, setPost] = useState<Post>({
    id: Number(params?.id),
    title: "",
    body: "",
    author_username: "",
    created_at: new Date(),
    updated_at: new Date(),
  });

  const toggleEditState = () => setIsEdit((prev) => !prev);

  useEffect(() => {
    const getPosts = async () => {
      setFetchPostStatus("pending");
      try {
        const response = await axiosInstance(`/get-post/${params.id}`);
        setPost((prev) => ({ ...prev, ...response?.data }));
        setFetchPostStatus("success");
      } catch (error) {
        console.log({ error });
        setFetchPostStatus("failed");
      }
    };
    if (fetchPostStatus === "idle") getPosts();
  }, [fetchPostStatus, params]);

  const updatePost = async () => {
    setIsSubmitting(true);
    try {
      const payload = {
        title: post.title,
        body: post.body,
      };

      await axiosInstance.put(`/edit-post/${params.id}`, payload);
      setFetchPostStatus("idle");

      setIsEdit(false);
      setIsSubmitting(false);
      // toast.success("Updated Post Successfully");
    } catch (error: any) {
      console.log({ error });
      setIsSubmitting(false);
      // toast.error(error?.response?.data?.error ?? "");
    }
  };

  return (
    <main className="flex justify-center">
      <div className="container">
        <section className="bg-white rounded-lg py-4 px-5">
          <Article
            isEdit={isEdit}
            post={post}
            setPost={setPost}
            toggleEditState={toggleEditState}
            isSubmitting={isSubmitting}
            setIsSubmitting={setIsSubmitting}
            setFetchPostStatus={setFetchPostStatus}
            setIsEdit={setIsEdit}
          />
        </section>
      </div>
    </main>
  );
};

export default SinglePostPage;
