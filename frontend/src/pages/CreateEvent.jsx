import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { userContext } from "../context/UserContext";

const CreateEvent = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [desc, setDesc] = useState("");
  const [location, setLocation] = useState("");
  const { user } = useContext(userContext);

  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      // const newDate = new Date(date);
      // const formattedDate = newDate.toLocaleDateString("en-GB");
      // console.log(formattedDate);

      const event = {
        title,
        location,
        date,
        description: desc,
      };

      const newEvent = await axios.post("/event/create-event", event, {
        withCredentials: true,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="px-6 md:px-[200px] min-h-[80vh] mt-8">
        <h1 className="font-bold text-2xl">Create An Event</h1>
        <form
          className="w-full flex flex-col space-y-4 md:space-y-8 mt-4"
          onSubmit={handleCreate}
        >
          <input
            type="text"
            placeholder="Title for your Event"
            className="px-4 py-2 outline-none shadow-md border rounded-lg"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Location of your event"
            className="px-4 py-2 outline-none shadow-md rounded-lg"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <input
            type="date"
            placeholder=""
            className="px-4 py-2 outline-none shadow-md rounded-lg"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <div>
            <textarea
              typeof="text"
              placeholder="Give some description..."
              className="px-4 py-2 w-full h-[200px] shadow-md outline-none rounded-lg"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <button className="bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
