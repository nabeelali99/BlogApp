// import React, { useContext, useState } from "react";
// import "react-quill/dist/quill.snow.css";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import { Navigate } from "react-router-dom";
// import { Editor } from "../Components/Editor";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export const CreatePost = () => {
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [summary, setSummary] = useState("");
//   const [files, setFiles] = useState("");
//   const [redirect, setRedirect] = useState(false);

//   async function createPost(e) {
//     e.preventDefault();

//     const data = new FormData();
//     data.set("title", title);
//     data.set("summary", summary);
//     data.set("content", content);
//     data.set("file", files[0]);

//     try {
//       const response = await fetch(
//         "https://bloggerz-blogapp-backend.onrender.com/post",
//         {
//           method: "POST",
//           body: data,
//         }
//       );

//       if (response.ok) {
//         setRedirect(true);
//         toast.success("Post created");
//       } else {
//         const errorData = await response.json();
//         toast.error(`Error: ${errorData.message}`);
//       }
//     } catch (error) {
//       console.error("Error creating post:", error);
//       toast.error("Failed to create post. Please try again.");
//     }
//   }

//   if (redirect) {
//     return <Navigate to={"/"} />;
//   }

//   return (
//     <form action="" className="create-post" onSubmit={createPost}>
//       <input
//         required
//         placeholder="Title"
//         type="text"
//         name="title"
//         id="title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//       />
//       <input
//         required
//         placeholder="Summary"
//         type="text"
//         name="summary"
//         id="summary"
//         value={summary}
//         onChange={(e) => setSummary(e.target.value)}
//       />
//       <input
//         required
//         type="file"
//         name="file"
//         id="file"
//         accept=".png, .jpg, .jpeg"
//         onChange={(e) => setFiles(e.target.files)}
//         style={{
//           width: "100%",
//           padding: "10px",
//           border: "1px solid #ccc",
//           borderRadius: "5px",
//           boxSizing: "border-box",
//           resize: "none",
//           overflow: "hidden",
//           overflowY: "auto",
//           whiteSpace: "pre-wrap",
//           wordWrap: "break-word",
//         }}
//       ></input>
//       <Editor value={content} onChange={setContent} />
//       <button
//         type="submit"
//         style={{
//           width: "100%",
//           padding: "10px",
//           border: "none",
//           borderRadius: "5px",
//           cursor: "pointer",
//           fontWeight: "bold",
//           fontSize: "16px",
//           textAlign: "center",
//           boxSizing: "border-box",
//           display: "block",
//           margin: "8px auto",
//           whiteSpace: "nowrap",
//           overflow: "hidden",
//           textOverflow: "ellipsis",
//           maxWidth: "100%",
//           minWidth: "100%",
//           maxHeight: "100%",
//           minHeight: "100%",
//           overflowX: "hidden",
//           overflowY: "auto",
//           wordWrap: "break-word",
//         }}
//       >
//         Create Post
//       </button>
//     </form>
//   );
// };

import React, { useContext, useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Navigate } from "react-router-dom";
import { Editor } from "../Components/Editor";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../Context/UserContext";

export const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [summary, setSummary] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  const { userInfo } = useContext(UserContext);
  const [userProfile, setUserProfile] = useState({});
  useEffect(() => {
    fetch(`http://localhost:4000/profile/${userInfo.id}`, {
      credentials: "include",
    }).then((response) => {
      response.json().then((user) => {
        setUserProfile(user.user);
      });
    });
  }, []);

  async function createPost(e) {
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);

    data.set("userProfile", userProfile._id);

    e.preventDefault();
    const response = await fetch("http://localhost:4000/post", {
      method: "POST",
      body: data,
    });

    if (response.ok) {
      setRedirect(true);
      toast.success("Post created");
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <form action="" className="create-post" onSubmit={createPost}>
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
        Create Post
      </button>
    </form>
  );
};
