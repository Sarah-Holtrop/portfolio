const db = require('../../../server/db/dbconfig');
// const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const session = require('express-session')

export default function login(req, res, next) {
  if (req.method === 'POST') {
    db.query(
      `SELECT u.*, a.password_hash, c.coach_id, t.teammate_id FROM users u 
    JOIN accounts a on a.user_id = u.user_id
    LEFT JOIN coaches c on c.user_id = u.user_id
    LEFT JOIN teammates t on t.user_id = u.user_id
    WHERE u.email = ${db.escape(req.body.email)};`,
      (err, result) => {
        // user does not exists
        if (err) {
          throw err;
          return res.status(400).send({
            msg: err
          });
        }
        if (!result.length) {
          return res.status(401).send({
            msg: 'Email or password is incorrect!'
          });
        }
        result = JSON.parse(JSON.stringify(result));
        // check password
        bcrypt.compare(
          req.body.password,
          result[0]['password_hash'],
          (bErr, bResult) => {
            // wrong password
            if (bErr) {
              throw bErr;
              return res.status(401).send({
                msg: 'Email or password is incorrect!'
              });
            }
            if (bResult) {
              const token = jwt.sign({ id: result[0].user_id }, 'the-super-strong-secrect', { expiresIn: '1h' });
              delete result[0]['password_hash']
              if (!result[0]['teammate_id']) {
                delete result[0]['teammate_id']
              } else if (!result[0]['coach_id']) {
                delete result[0]['coach_id']
              }
              session['user'] = result[0];
              return res.status(200).send({
                msg: 'Logged in!',
                token,
                user: result[0]
              });
            }
            return res.status(401).send({
              msg: 'Username or password is incorrect!'
            });
          }
        );
      }
    );
  } else {
    // Handle any other HTTP method
  }
}