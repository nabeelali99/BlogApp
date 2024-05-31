import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";
import PostCard from "../Components/PostCard";

export const ProfilePage = () => {
  const { userInfo } = useContext(UserContext);
  const [userProfile, setUserProfile] = useState({});
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:4000/profile/${userInfo.id}`, {
      credentials: "include",
    }).then((response) => {
      response.json().then((user) => {
        setUserProfile(user.user);
        setPosts(user.posts);
      });
    });
  }, []);

  return (
    <div>
      <div className="profile-page">
        <h2>Welcome, {userProfile.username}</h2>
        <p>Email - {userProfile.email}</p>
        <p>Full Name - {userProfile.fullName}</p>
        <p>Phone - {userProfile.phone}</p>
        <p>Age - {userProfile.age}</p>
        <div>
          <h2
            style={{
              width: "800px",
              borderTop: "1px solid black",
              borderBottom: "1px solid black",
              padding: "10px",
              margin: "10px",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            My Posts
          </h2>
        </div>
      </div>
      <div className="post-card">
        {posts.length > 0 && posts.map((post) => <PostCard {...post} />)}
        {posts.length === 0 && <p>You haven't created any posts yet</p>}
      </div>
    </div>
  );
};
