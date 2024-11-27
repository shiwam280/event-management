const express = require("express");
const router = express.Router();
const Event = require("../models/Event");

//CREATE
router.post("/create-event", async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    console.log(newEvent);

    const savedEvent = await newEvent.save();
    res.status(200).json(savedEvent);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.status(200).json("Event has been deleted");
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//ALL EVENTS
router.get("/", async (req, res) => {
  const query = req.query;
  try {
    const searchFilter = {
      title: { $regex: query.search, $options: "i" },
    };
    const allEvents = await Event.find(query.search ? searchFilter : null);
    res.status(200).json(allEvents);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//GET POST DETAIL
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
