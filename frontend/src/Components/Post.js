import React, { useContext, useEffect, useState } from "react";
import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

export const Post = ({
  _id,
  title,
  summary,
  cover,
  createdAt,
  author,
  likes,
  likedBy,
}) => {
  const [Like, setLike] = useState(false);
  const [Likes, setLikes] = useState(likes);
  const { userInfo } = useContext(UserContext);

  useEffect(() => {
    if (userInfo && userInfo.id !== null) {
      setLike(likedBy.includes(userInfo.id));
    }
  }, [likedBy, userInfo]);

  const handleLike = () => {
    setLike(!Like);

    if (Like) {
      setLikes(Likes - 1);
      fetch(
        `https://bloggerz-blogapp-backend.onrender.com/post/${_id}/unlike`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ userId: userInfo.id }),
        }
      ).then(() => {});
    } else {
      setLikes(Likes + 1);
      fetch(`https://bloggerz-blogapp-backend.onrender.com/post/${_id}/like`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ userId: userInfo.id }),
      }).then(() => {});
    }
  };

  return (
    <div className="post">
      <div className="image">
        <Link to={`/post/${_id}`}>
          <img
            src={
              "https://bloggerz-blogapp-backend.onrender.com/" + cover ||
              "https://source.unsplash.com/random"
            }
            alt="Image can't be loaded Because you are using a free hosting service"
          />
        </Link>
      </div>
      <div className="texts">
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
        </Link>
        <p className="info">
          <a href="" className="author">
            {author.username}
          </a>
          <time>{formatISO9075(new Date(createdAt))}</time>
        </p>
        <p className="summary">{summary}</p>
      </div>
      {userInfo !== null && userInfo.id !== null && (
        <div className="actions">
          <svg
            onClick={handleLike}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`size-6 heart-icon ${Like ? "liked" : ""}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>

          <span
            style={{
              marginLeft: "10px",
              color: "#999",
              fontSize: "1.2rem",
            }}
          >
            {Likes !== 0 ? Likes : ""}
          </span>
        </div>
      )}
    </div>
  );
};
