import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await axios.post("/auth/register", { email, password });
      navigate("/login");
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className="w-full flex items-center justify-center h-[80vh]">
      <div className="flex flex-col items-center justify-center space-y-4 w-[80%] md:w-[25%]">
        <h1 className="text-xl font-bold text-left">Sign Up</h1>
        <input
          className="w-full px-4 py-2 border-2 border-black outline-0"
          placeholder="Enter your email"
          type="text"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full px-4 py-2 border-2 border-black outline-0"
          placeholder="Enter your password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleRegister}
          className="w-full px-4 py-4 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black"
        >
          Sign Up
        </button>
        {error && (
          <h3 className="text-red-500 text-sm">Something went wrong!</h3>
        )}
        <div className="flex items-center justify-center space-x-4">
          <p>Already have an Account!</p>
          <p className="text-gray-500 hover:text-black">
            <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
