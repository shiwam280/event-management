import { useEffect, useState, createContext } from "react";
import axios from "axios";

export const userContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const res = await axios.get("/auth/refetch", { withCredentials: true });
      setUser(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
}
