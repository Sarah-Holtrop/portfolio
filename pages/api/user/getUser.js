const session = require('express-session');
const db = require('../../../server/db/dbconfig');

export default function getUser(req, res, next) {
  if (req.method === 'GET') {
    let userId = session.user.user_id;
    db.query(`
    SELECT u.user_id as userId, u.username, u.email, u.role, a.first_name as firstName, a.last_name as lastName FROM users u
    JOIN accounts a on a.user_id = u.user_id
    where u.user_id = ? `, userId, function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, data: results[0], message: 'Fetch Successfully.' });
    });
  }
}