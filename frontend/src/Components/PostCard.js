import * as React from "react";
import Button from "@mui/material/Button";
import Delete from "../Components/Delete";
import { Card } from "antd";
import { Link } from "react-router-dom";
const { Meta } = Card;

export default function MediaCard({ _id, title, summary, cover }) {
  return (
    <Card
      style={{
        width: 300,
        margin: "10px",
        cursor: "pointer",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        transition: "all 0.3s ease",

        "&:hover": {
          transform: "scale(1.05)",
          transition: "all 0.3s ease",
          boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)",
        },
      }}
      cover={
        <img
          alt="Post_image"
          src={cover || "https://source.unsplash.com/random"}
          height={320}
        />
      }
      actions={[
        <Link to={`/post/${_id}`}>
          <Button
            key="ellipsis"
            sx={{
              background: "black",
              color: "white",
              ":hover": { background: "white", color: "black" },
            }}
          >
            {" "}
            View{" "}
          </Button>
        </Link>,
        <Link to={`/edit/${_id}`}>
          <Button
            key="ellipsis"
            sx={{
              background: "black",
              color: "white",
              ":hover": { background: "white", color: "black" },
            }}
          >
            {" "}
            Edit{" "}
          </Button>
        </Link>,
        <Delete id={_id} />,
      ]}
    >
      <Meta title={title} description={summary} />
    </Card>
  );
}
