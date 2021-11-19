const db = require('../../../server/db/dbconfig');
// const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const session = require('express-session')

export default function register(req, res, next) {
  db.query(
    `SELECT * FROM users WHERE LOWER(email) = LOWER(${db.escape(
      req.body.email
    )});`,
    (err, result) => {
      if (result.length) {
        return res.status(409).send({
          msg: 'This user is already in use!'
        });
      } else {
        // username is available
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).send({
              msg: err
            });
          } else {
            // has hashed pw => add to database
            let userId;
            db.query(
              `INSERT INTO users (username, email, role) VALUES ('${req.body.username}', ${db.escape(
                req.body.email
              )}, ${db.escape(req.body.role)})`,
              (err, result) => {
                if (err) {
                  throw err;
                  return res.status(400).send({
                    msg: err
                  });
                }
                db.query(`INSERT INTO accounts (user_id, first_name, last_name, email, password_hash) VALUES (${result.insertId}, ${db.escape(
                  req.body.firstName
                )}, ${db.escape(
                  req.body.lastName
                )}, ${db.escape(
                  req.body.email
                )}, '${hash}')`)

                if (req.body.role === 'coach') {
                  db.query(`INSERT INTO coaches (user_id) VALUES (${result.insertId})`)
                } else if (req.body.role === 'teammate') {
                  db.query(`INSERT INTO teammates (user_id) VALUES (${result.insertId})`)
                }
                return res.status(201).send({
                  msg: 'The user has been registerd with us!'
                });
              }
            );
          }
        });
      }
    }
  );
}