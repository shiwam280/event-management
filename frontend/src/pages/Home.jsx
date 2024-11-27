import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import HomeEvent from "../components/HomeEvent";
import { userContext } from "../context/UserContext";

const Home = () => {
  const { search } = useLocation();
  const [events, setEvents] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const { user } = useContext(userContext);

  const fetchEvents = async () => {
    try {
      const res = await axios.get("/event/" + search, {
        withCredentials: true,
      });
      setEvents(res.data);
      if (res.data.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }
    } catch (error) {
      console.log(error.message);
      setNoResults(true);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [search]);

  return (
    <div className="px-8 md:px-[200px] min-h-[80vh]">
      {!noResults ? (
        events.map((event) => <HomeEvent key={event._id} event={event} />)
      ) : (
        <h3 className="text-center font-bold mt-16">No Events Available</h3>
      )}
    </div>
  );
};

export default Home;
