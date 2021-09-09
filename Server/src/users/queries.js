const checkUserEmail = 'SELECT * FROM users WHERE user_email = $1';

const registerNewUser = 'INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *';


module.exports = {
    checkUserEmail,
    registerNewUser,
};
