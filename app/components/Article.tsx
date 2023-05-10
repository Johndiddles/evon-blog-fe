import React, { Dispatch, SetStateAction } from "react";
import { useUserContext } from "../context/userAuth";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import moment from "moment";
import { Post } from "../models/post";
import { axiosInstance } from "../utils/axiosInstance";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface propType {
  isEdit: boolean;
  toggleEditState: () => void;
  isSubmitting: boolean;
  setIsSubmitting: Dispatch<SetStateAction<boolean>>;
  post: Post;
  setPost: Dispatch<SetStateAction<Post>>;
  setFetchPostStatus: Dispatch<SetStateAction<string>>;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
}

const Article = ({
  isEdit,
  post,
  setPost,
  toggleEditState,
  setIsSubmitting,
  isSubmitting,
  setFetchPostStatus,
  setIsEdit,
}: propType) => {
  const { id } = useParams();
  const router = useRouter();
  const { isAuth, userDetails } = useUserContext();

  const updatePost = async () => {
    setIsSubmitting(true);
    try {
      const payload = {
        title: post.title,
        body: post.body,
      };

      await axiosInstance.put(`/edit-post/${id}`, payload);
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

  const deletePost = async () => {
    if (window.confirm(`Are you sure you want to delete "${post.title}"`)) {
      try {
        const response = await axiosInstance.delete(`/delete-post/${id}`);
        toast.success(`Deleted ${post.title} Successfully`), router.push("/");
      } catch (error) {
        console.log({ error });
      }
    }
  };

  return (
    <article className="flex flex-col gap-8">
      <header className="flex flex-col gap-2 border-b border-b-gray-100] pb-5">
        <div className="flex items-center gap-5">
          {isEdit ? (
            <div className="flex-grow flex flex-col gap-2">
              <input
                className="bg-gray-100 py-3 px-4 border border-slate-300 outline-slate-500 text-slate-700 text-lg font-bold"
                type="text"
                placeholder="Enter Title..."
                value={post.title}
                onChange={(e) =>
                  setPost((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
              />
            </div>
          ) : (
            <h2 className="text-xl text-slate-800 font-bold ">{post?.title}</h2>
          )}
          {isAuth && post?.author_username === userDetails?.username && (
            <div className="flex gap-5">
              <button onClick={toggleEditState}>
                <FaEdit />
              </button>

              <button onClick={deletePost}>
                <RiDeleteBin6Fill />
              </button>
            </div>
          )}
        </div>
        <div className="text-gray-600 flex gap-5 text-sm">
          <p>
            Written by: <span>{post?.author_username}</span>
          </p>

          <p>
            Created:
            <span>
              {moment(post?.created_at).format("Do MMM, YYYY | hh:mmA")}
            </span>
          </p>
        </div>
      </header>

      {isEdit ? (
        <div className="flex flex-col gap-2 mt-4">
          <textarea
            className="bg-gray-100 py-3 px-4 border border-slate-300 outline-slate-500 text-slate-500 text-sm"
            rows={6}
            placeholder="Write here..."
            value={post.body}
            onChange={(e) =>
              setPost((prev) => ({
                ...prev,
                body: e.target.value,
              }))
            }
          />
        </div>
      ) : (
        <article>{post?.body}</article>
      )}

      {isEdit && (
        <div className="mt-5">
          <button
            className="bg-slate-700 text-gray-100 hover:bg-slate-900 hover:text-gray-50 duration-300 py-2 px-5 rounded font-semibold"
            onClick={(e) => {
              e.preventDefault();
              updatePost();
            }}
          >
            {isSubmitting ? "Publishing..." : "Publish Update"}
          </button>
        </div>
      )}
    </article>
  );
};

export default Article;
