import React, { useState } from "react";
import "./Login.css"
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login(){
  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const [error, setError] = useState(null)
  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({username, password})
      })
      if(response.ok){
        const data = await response.json()
        localStorage.setItem("token", data.token)
        navigate("/")
        toast.success("Login Successfully!")
      }else{
        toast.error("Login yoki parol noto'g'ri")
      }
    } catch (error) {
      console.error("Xatolik yuz berdi:" , error)
      toast.error("Serverda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.");
    }
  }
  return (
    <div className="login-container">
      <ToastContainer />
      <form className="login" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="login-form">
          <label htmlFor="login">Login</label>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="login-form">
          <label htmlFor="password">Password</label>
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};


