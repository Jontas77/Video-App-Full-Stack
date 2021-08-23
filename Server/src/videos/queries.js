const getVideos = 'SELECT * FROM videos';

const getVideoById = 'SELECT * FROM videos WHERE id = $1';

const addVideo = "INSERT INTO videos (id, title, vidurl, rating) VALUES ($1, $2, $3, $4) RETURNING *";

const incrementRating = 'UPDATE videos SET rating = $1 + 1  WHERE id = $2';

const decrementRating = 'UPDATE videos SET rating = $1 - 1  WHERE id = $2';

const deleteVideo = 'DELETE FROM videos WHERE id = $1';


module.exports = {
    getVideos,
    getVideoById,
    addVideo,
    incrementRating,
    decrementRating,
    deleteVideo
};