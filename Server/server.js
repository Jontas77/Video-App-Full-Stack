const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const ID = require("nodejs-unique-numeric-id-generator");
const url = require("url");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

const pool = new Pool({
  user: "jonathanh",
  host: "localhost",
  database: "videosdb",
  password: "Heugh",
  port: 5432,
});

// GET "/"
app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM videos");
    res.json(result.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// POST "/"
app.post("/", async (req, res) => {
  try {
    const newVideo = {
      id: ID.generate(new Date().toJSON()),
      ...req.body,
    };

    const { id, title, vidurl, rating } = newVideo;

    const myURL = new URL(vidurl);
    const result = await pool.query(
      "INSERT INTO videos (id, title, vidurl, rating) VALUES ($1, $2, $3, $4) RETURNING *",
      [id, title, vidurl, rating]
    );

    if (!title || title === "" || !vidurl || vidurl === "") {
      return res.status(400).json({
        result: "failure",
        message: "Video could not be saved",
      });
    }

    res.send("Video is Created!");
  } catch (error) {
    console.log(`${Date().toString()}: ${error.input} is not a valid url`);
    return res.status(400).send(`${error.input} is not a valid url`);
  }
});

// GET "/:id"
app.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM videos WHERE id=$1", [id]);
    res.json(result.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// DELETE "/:id"
app.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM videos WHERE id = $1", [id]);
    res.send(`Video Deleted!`);
  } catch (error) {
    console.error(error.message);
  }
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

