const express = require("express");
const cors = require("cors");
const videoRoutes = require("./src/videos/routes");
const registerRoutes = require("./src/users/registerRoutes");
const loginRoutes = require("./src/users/loginRoutes");
const verifyRoute = require("./src/users/verifyRoute")

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Welcome to our Video Recommodation API");
});

app.use("/api/v1/videos", videoRoutes);

//Register user
app.use("/users", registerRoutes);

//Log in user
app.use("/users", loginRoutes);

// verify user
app.use("/users", verifyRoute);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));















// GET "/"
// app.get("/", async (req, res) => {
//   try {
//     const result = await pool.query("SELECT * FROM videos");
//     res.json(result.rows);
//   } catch (error) {
//     console.error(error.message);
//   }
// });

// POST "/"
// app.post("/", async (req, res) => {
//   try {
//     const newVideo = {
//       id: ID.generate(new Date().toJSON()),
//       ...req.body,
//     };

//     const { id, title, vidurl, rating } = newVideo;

//     const myURL = new URL(vidurl);
//     if (!title || title === "" || !vidurl || vidurl === "") {
//       return res.status(400).json({
//         result: "failure",
//         message: "Video could not be saved",
//       });
//     }
   
//     const result = await pool.query(
//       "INSERT INTO videos (id, title, vidurl, rating) VALUES ($1, $2, $3, $4) RETURNING *",
//       [id, title, vidurl, rating]
//     );

//     res.send("Video is Created!");
//   } catch (error) {
//     console.log(`${Date().toString()}: ${error.input} is not a valid url`);
//     return res.status(400).send(`${error.input} is not a valid url`);
//   }
// });

// GET "/:id"
// app.get("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const result = await pool.query("SELECT * FROM videos WHERE id=$1", [id]);
//     res.json(result.rows);
//   } catch (error) {
//     console.error(error.message);
//   }
// });

// UPDATE "/:id"
// app.put("/incr/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { rating } = req.body;
//     const result = await pool.query('UPDATE videos SET rating = $1 + 1  WHERE id = $2', [rating, id]);
//     res.send("Votes is updated")
//   } catch (error) {
//     console.error(error.message)
//   }
// });

// app.put("/decr/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { rating } = req.body;
//     const result = await pool.query('UPDATE videos SET rating = $1 - 1  WHERE id = $2', [rating, id]);
//     res.send("Votes is updated")
//   } catch (error) {
//     console.error(error.message)
//   }
// });


// DELETE "/:id"
// app.delete("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const result = await pool.query("DELETE FROM videos WHERE id = $1", [id]);
//     res.send(`Video Deleted!`);
//   } catch (error) {
//     console.error(error.message);
//   }
// });





// Connect to Heroku DB
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false
//   }
// });

// pool.connect();