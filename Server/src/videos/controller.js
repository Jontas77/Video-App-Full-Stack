const pool = require("../../db");
const queries = require("./queries");
const ID = require("nodejs-unique-numeric-id-generator");
const url = require("url");

const getVideos = (req, res) => {
  pool.query(queries.getVideos, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getVideoById = async (req, res) => {
  try {
    const { id } = req.params;
    const results = await pool.query(queries.getVideoById, [id]);
    res.json(results.rows);
  } catch (error) {
    console.error(error.message);
  }
};

const addVideo = async (req, res) => {
  try {
    const newVideo = {
      id: ID.generate(new Date().toJSON()),
      ...req.body,
      rating: 0
    };

    const { id, title, vidurl, rating } = newVideo;

    const myURL = new URL(vidurl);
    if (!title || title === "" || !vidurl || vidurl === "") {
      return res.status(400).json({
        result: "failure",
        message: "Video could not be saved",
      });
    }

    await pool.query(queries.addVideo, [id, title, vidurl, rating]);

    res.send("Video created successfully");
  } catch (error) {
    console.log(`${Date().toString()}: ${error.input} is not a valid url`);
    return res.status(400).send(`${error.input} is not a valid url`);
  }
};

const incrementRating = (req, res) => {
  const { id } = req.params;
  const { rating } = req.body;
  pool.query(queries.incrementRating, [rating, id], (error, results) => {
    if (error) throw error;
    res.send("Votes updated successfully");
  });
};

const decrementRating = (req, res) => {
  const { id } = req.params;
  const { rating } = req.body;
  pool.query(queries.decrementRating, [rating, id], (error, results) => {
    if (error) throw error;
    res.send("Votes updated successfully");
  });
};

const deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query(queries.deleteVideo, [id]);
    res.send("Video deleted successfully");
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {
  getVideos,
  getVideoById,
  addVideo,
  incrementRating,
  decrementRating,
  deleteVideo,
};
