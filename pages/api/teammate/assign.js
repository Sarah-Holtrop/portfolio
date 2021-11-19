const session = require('express-session');
const db = require('../../../server/db/dbconfig');

export default function assign(req, res, next) {
  if (req.method === 'POST') {
    if (session.user.coach_id) {
      //get teammate by username
      db.query(`SELECT t.teammate_id FROM teammates t
JOIN users u ON u.user_id = t.user_id
WHERE u.username = ${db.escape(req.body.username)} AND role = 'teammate';`, (err, result) => {
        if (err) {
          // teammate not found
          res.status(404).send({
            msg: 'Teammate not found'
          })
        } else {
          // if teammate found, insert into xref
          db.query(`INSERT INTO coach_teammate_xref(coach_id, teammate_id, program_id) VALUES(${session.user.coach_id}, ${result[0]['teammate_id']}, ${db.escape(req.body.programId)})`, (err, result) => {
            if (err) {
              res.status(400).send({ msg: 'Insert failed' })
            } else {
              res.send({ msg: 'Successfully added teammate to program' })
            }
          })
        }
      });
    }
  }
}