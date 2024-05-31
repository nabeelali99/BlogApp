import React, { useEffect, useState } from "react";
import { Post } from "../Components/Post";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const HomePage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/post").then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
      });
    });
  }, []);

  if (posts.length === 0) {
    return (
      <div>
        <Skeleton count={35} />
      </div>
    );
  }

  return <>{posts.length > 0 && posts.map((post) => <Post {...post} />)}</>;
};
