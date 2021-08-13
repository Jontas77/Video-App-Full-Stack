const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const ID = require("nodejs-unique-numeric-id-generator");
const url = require("url");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const pool = new Pool({
    user: "jonathanh",
    host: "localhost",
    database: "video_app",
    password: "Heugh",
    port: 5432
});

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
// let videos = [
//   {
//     id: 523523,
//     title: "Never Gonna Give You Up",
//     url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
//     rating: 23,
//   },
//   {
//     id: 523427,
//     title: "The Coding Train",
//     url: "https://www.youtube.com/watch?v=HerCR8bw_GE",
//     rating: 230,
//   },
//   {
//     id: 82653,
//     title: "Mac & Cheese | Basics with Babish",
//     url: "https://www.youtube.com/watch?v=FUeyrEN14Rk",
//     rating: 2111,
//   },
//   {
//     id: 858566,
//     title: "Videos for Cats to Watch - 8 Hour Bird Bonanza",
//     url: "https://www.youtube.com/watch?v=xbs7FT7dXYc",
//     rating: 11,
//   },
//   {
//     id: 453538,
//     title:
//       "The Complete London 2012 Opening Ceremony | London 2012 Olympic Games",
//     url: "https://www.youtube.com/watch?v=4As0e4de-rI",
//     rating: 3211,
//   },
//   {
//     id: 283634,
//     title: "Learn Unity - Beginner's Game Development Course",
//     url: "https://www.youtube.com/watch?v=gB1F9G0JXOo",
//     rating: 211,
//   },
//   {
//     id: 562824,
//     title: "Cracking Enigma in 2021 - Computerphile",
//     url: "https://www.youtube.com/watch?v=RzWB5jL5RX0",
//     rating: 111,
//   },
//   {
//     id: 442452,
//     title: "Coding Adventure: Chess AI",
//     url: "https://www.youtube.com/watch?v=U4ogK0MIzqk",
//     rating: 671,
//   },
//   {
//     id: 536363,
//     title: "Coding Adventure: Ant and Slime Simulations",
//     url: "https://www.youtube.com/watch?v=X-iSQQgOd1A",
//     rating: 76,
//   },
//   {
//     id: 323445,
//     title: "Why the Tour de France is so brutal",
//     url: "https://www.youtube.com/watch?v=ZacOS8NBK6U",
//     rating: 73,
//   },
//  ];


// GET "/"
app.get("/", (req, res) => {
  res.json(videos);
});

// POST "/"
app.post("/", async(req, res) => {
    // const id = req.body.id
    // const title = req.body.title
    // const vidurl = req.body.vidurl
    // const rating = req.body.rating
    
  
  
  try {
    const newVideo = {
        id: ID.generate(new Date().toJSON()),
        ...req.body,
      };
    
      const { id, title, vidurl, rating } = newVideo;
     
      
    const myURL = new URL(vidurl);
    const newVid = await pool.query('INSERT INTO videos (id, title, vidurl, rating) VALUES ($1, $2, $3, $4) RETURNING *, [id, title, vidurl, rating]');

    if (!title || title === "" || !vidurl || vidurl === "") {
        return res.status(400).json({
          result: "failure",
          message: "Video could not be saved",
        });
      }

    res.json(newVid.rows);
  } catch (error) {
    console.log(`${Date().toString()}: ${error.input} is not a valid url`);
    return res.status(400).send(`${error.input} is not a valid url`);
  }

//   if (!title || title === "" || !vidurl || vidurl === "") {
//     return res.status(400).json({
//       result: "failure",
//       message: "Video could not be saved",
//     });
//   }

//   videos.push(newVideo);

  
});

// GET "/:id"
app.get("/:id", (req, res) => {
  const { id } = req.params;

  const foundVideo = videos.find((vid) => vid.id === parseInt(id));

  if (foundVideo) {
    res.json(foundVideo);
  } else {
    res.status(400).json({ message: `Video Not Found With Id: ${id}` });
  }
});

// DELETE "/:id"
app.delete("/:id", (req, res) => {
  const { id } = req.params;

  const foundVideo = videos.find((vid) => vid.id === parseInt(id));

  if (foundVideo) {
    videos = videos.filter((vid) => vid.id !== parseInt(id));
    res.json({});
  } else {
    res.status(400).json({
      result: "failure",
      message: "Video could not be deleted",
    });
  }
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

