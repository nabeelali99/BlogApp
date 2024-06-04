import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Editor } from "../Components/Editor";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [summary, setSummary] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetch(`https://bloggerz-blogapp-backend.onrender.com/post/${id}`)
      .then((response) => response.json())
      .then((post) => {
        setTitle(post.title);
        setSummary(post.summary);
        setContent(post.content);
      });
  }, []);

  async function updatePost(e) {
    e.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("id", id);
    if (files?.[0]) {
      data.set("file", files?.[0]);
    }

    const response = await fetch(
      "https://bloggerz-blogapp-backend.onrender.com/post",
      {
        method: "PUT",
        body: data,
      }
    );
    if (response.ok) {
      setRedirect(true);
      toast.success("Post updated");
    }
  }

  if (redirect) {
    return <Navigate to={`/post/${id}`} />;
  }

  return (
    <form action="" className="create-post" onSubmit={updatePost}>
      <input
        required
        placeholder="Title"
        type="text"
        name="title"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        required
        placeholder="Summary"
        type="text"
        name="summary"
        id="summary"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />
      <input
        required
        type="file"
        name="file"
        id="file"
        accept=".png, .jpg, .jpeg"
        onChange={(e) => setFiles(e.target.files)}
        style={{
          width: "100%",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          boxSizing: "border-box",
          resize: "none",
          overflow: "hidden",
          overflowY: "auto",
          whiteSpace: "pre-wrap",
          wordWrap: "break-word",
        }}
      ></input>
      <Editor value={content} onChange={setContent} />
      <button
        type="submit"
        style={{
          width: "100%",
          padding: "10px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "16px",
          textAlign: "center",
          boxSizing: "border-box",
          display: "block",
          margin: "8px auto",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          maxWidth: "100%",
          minWidth: "100%",
          maxHeight: "100%",
          minHeight: "100%",
          overflowX: "hidden",
          overflowY: "auto",
          wordWrap: "break-word",
        }}
      >
        Update Post
      </button>
    </form>
  );
};
