import React, { useState } from "react";
import Loader from "react-loader-spinner";

const AllVideos = ({ data }) => {
  const { id, title, vidurl, rating } = data;
 
  const [count, setCount] = useState(0);
  const [video, setVideo] = useState([]);
  const [load, setLoad] = useState(false);

  const incrementVote = async (id) => {
    try {
      const body = { rating };
      await fetch(`http://localhost:5000/api/v1/videos/incr/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      setCount((prevState) => prevState + 1);
      // window.location = "/";
    } catch (error) {
      console.error(error.message);
    }
  };

  const decrementVote = async (id) => {
    try {
      const body = { rating };
      await fetch(`http://localhost:5000/api/v1/videos/decr/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      setCount((prevState) => prevState - 1);
      // window.location = "/";
    } catch (error) {
      console.error(error.message);
    }
  };

  const deleteVideo = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/v1/videos/${id}`, {
        method: "DELETE",
      });
      setVideo(video.filter((vid) => vid.id !== id));
      setLoad(!load);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="allVideos-container ">
      {!load ? (
        <div className="video-container">
          <h5 id="video-title mb-2">{title}</h5>
          <div className="votes">
            <i
              className="fas fa-thumbs-up vote"
              onClick={() => incrementVote(id)}
            ></i>
            <h4>{rating ? count + rating : count} Votes</h4>
            <i
              className="fas fa-thumbs-down vote"
              onClick={() => decrementVote(id)}
            ></i>
          </div>
          <div className="playVid">
            <iframe
              height="315"
              src={`https://www.youtube.com/embed/${vidurl.slice(-11)}`}
              className="video"
              allowFullScreen
              title="Youtube video player"
            ></iframe>
          </div>
          <div className="delete">
            <button className="btn btn-danger" onClick={() => deleteVideo(id)}>
              Delete
            </button>
          </div>
        </div>
      ) : (
        <Loader
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000} 
      />
      )}
    </div>
  );
};

export default AllVideos;

// const deleteVideo = (title) => {
//   let result = Object.assign([], video);
//   let filtered = result.filter((el) => el.title !== title);
//   setVideo(filtered);
//   setLoad(!load);
// };
