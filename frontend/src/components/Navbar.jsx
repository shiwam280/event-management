import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { userContext } from "../context/UserContext";
import axios from "axios";

const Navbar = () => {
  const [prompt, setPrompt] = useState("");
  const navigate = useNavigate();
  const path = useLocation().pathname;

  const { user, setUser } = useContext(userContext);

  const handleLogout = async () => {
    try {
      const res = await axios.get("/auth/logout");
      setUser(null);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
      <h1 className="text-lg md:text-xl font-extrabold">
        <Link to="/">Events</Link>
      </h1>
      {path == "/" && (
        <div className="flex border shadow-sm w-1/3 px-4 py-2 rounded-2xl items-center space-x-0">
          <div
            className="cursor-pointer hover:bg-gray-200 p-2 rounded-full"
            onClick={() =>
              navigate(prompt ? "?search=" + prompt : navigate("/"))
            }
          >
            <BsSearch />
          </div>
          <div className="border-l border-gray-400"></div>
          <input
            type="text"
            className="outline-none px-2"
            placeholder="Search for an event"
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>
      )}
      <div className="hidden md:flex items-center justify-center space-x-2 md:space-x-4">
        {user ? (
          <>
            <h3>
              <Link to="/create-event">Create Event</Link>
            </h3>
            <h3
              className=" hover:text-gray-500 cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </h3>
          </>
        ) : (
          <>
            <h3>
              <Link to="/login">Login</Link>
            </h3>
            <h3>
              <Link to="/register">Register</Link>
            </h3>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
