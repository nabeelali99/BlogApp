import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  async function register(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        fullName,
        email,
        phone,
        age,
      }),
    });
    if (response.status === 200) {
      setAge("");
      setEmail("");
      setFullName("");
      setPhone("");
      setPassword("");
      setUsername("");
      navigate("/login");
      toast.success("Registration successful");
    } else {
      toast.error("Registration failed");
    }
  }

  return (
    <form action="" className="register" onSubmit={register}>
      <h1>Register</h1>
      <input
        type="text"
        name="fullName"
        id="fullName"
        maxLength="20"
        minLength="3"
        required
        autoFocus
        title="Full Name may only contain letters with a length between 3 and 20"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
      <input
        type="text"
        name="email"
        id="email"
        required
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="tel"
        name="phone"
        id="phone"
        minLength="10"
        maxLength="10"
        pattern="[0-9]{10}"
        required
        title="Phone may only contain numbers without country code"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <input
        type="number"
        name="age"
        id="age"
        required
        placeholder="Age"
        title="Age may only contain numbers between 18 and 100"
        min="18"
        max="100"
        step="1"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <input
        type="text"
        name="username"
        id="username"
        maxLength="20"
        minLength="3"
        title="Username should be unique with a length between 3 and 20"
        required
        autoFocus
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <div style={{ display: "flex" }}>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          id="password"
          minLength="8"
          maxLength="20"
          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$"
          title="Password should contain at least one uppercase letter, one lowercase letter, one number and one special character with a length between 8 and 20"
          required
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          style={{ backgroundColor: "white", color: "black", width: "50px" }}
          id="togglePassword"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
      <button type="submit">Register</button>
    </form>
  );
};
