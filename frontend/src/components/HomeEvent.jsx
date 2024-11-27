import axios from "axios";
import { useNavigate } from "react-router-dom";

const HomeEvent = ({ event }) => {
  const eventId = event._id;
  const navigate = useNavigate();

  const handleDelete = async () => {
    const eventId = event._id;
    try {
      await axios.delete(`/event/${eventId}`);
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className=" w-full flex mt-8 space-x-4 justify-between shadow shadow-gray-400 rounded-lg border outline-none">
      <div className="flex flex-col w-[50%] ml-4">
        <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl pt-1">
          {event.title}
        </h1>
        <p className="text-sm md:text-lg text-gray-500">{event.description}</p>
      </div>
      <div className="flex flex-col items-center justify-center">
        <p>Location:</p>
        <p>{event.location}</p>
      </div>
      <div className="flex flex-col items-center justify-center">
        <p>Date:</p>
        <p>{event.date}</p>
      </div>
      <div className="flex items-center justify-center gap-5">
        <p
          className="mr-5 border py-2 px-4 rounded-md bg-blue-400 cursor-pointer"
          onClick={() => navigate("/edit/" + eventId)}
        >
          Edit
        </p>
        <button
          className="mr-5 rounded-md bg-red-400 py-2 px-4 border"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default HomeEvent;
