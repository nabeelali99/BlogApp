import React from "react";
import ReactQuill from "react-quill";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

export const Editor = ({ value, onChange }) => {
  return (
    <ReactQuill
      theme={"snow"}
      onChange={onChange}
      placeholder="Write something about your post here..."
      name="content"
      id="content"
      style={{
        height: "500px",
        marginTop: "20px",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        boxSizing: "border-box",
        resize: "none",
        overflow: "hidden",
        overflowY: "auto",
        whiteSpace: "pre-wrap",
        wordWrap: "break-word",
        width: "100%",
        maxWidth: "100%",
        minWidth: "100%",
        maxHeight: "100%",
        minHeight: "100%",
        overflowX: "hidden",
      }}
      value={value}
      modules={modules}
      formats={formats}
      required
    ></ReactQuill>
  );
};
