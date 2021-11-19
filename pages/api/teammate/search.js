const db = require('../../../server/db/dbconfig');
const session = require('express-session');

export default function search(req, res, next) {
  if (req.method === 'GET') {
    if (session.user.role === 'coach') {
      db.query(`SELECT username FROM users WHERE role = 'teammate' and username LIKE '%${req.query.search}%'`,
        (err, result) => {
          if (err) {
            res.status(400).send({
              msg: err
            })
          } else {
            res.send(result)
          }
        })
    }
  }
}