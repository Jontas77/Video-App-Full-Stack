const checkUserEmail = 'SELECT * FROM users WHERE user_email = $1';

const registerNewUser = 'INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *';

const getUserById = 'SELECT user_name FROM users WHERE user_id = $1';

module.exports = {
    checkUserEmail,
    registerNewUser,
    getUserById
};
