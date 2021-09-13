import React from 'react';

const VideoContainer = ({ id, title, url, rating, incrementVote, decrementVote }) => {

    return (
        <div className="video-container">
        <h5 id="video-title mb-2">{title}</h5>
        <div className="votes">
          <i
            className="fas fa-thumbs-up vote"
            onClick={() => incrementVote()}
          ></i>
          <h4>{rating} Votes</h4>
          <i
            className="fas fa-thumbs-down vote"
            onClick={() => decrementVote()}
          ></i>
        </div>
        <div className="playVid">
          <iframe
            height="315"
            src={url}
            className="video"
            allowFullScreen
            title="Youtube video player"
          ></iframe>
        </div>
        <div className="delete">
          <button className="btn btn-danger">Delete</button>
        </div>
      </div>
    );
};

export default VideoContainer;
