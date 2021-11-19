import session from 'express-session';
import db from '../../../server/db/dbconfig';

export default function addProgress(req, res, next) {
  // inserting: program_id (body), teammate_id (session), plan_id(body), weight(body)
  if (req.method === 'POST') {
    if (session.user.teammate_id) {
      let values = req.body.map((b) => `(${db.escape(b.programId)}, ${session.user.teammate_id}, ${db.escape(b.planId)}, ${b.weight})`);
      db.query(`INSERT INTO teammate_program_progress (program_id, teammate_id, plan_id, weight)
VALUES${values.join(',')};`, (err, result) => {
        if (err) {
          res.status(409).send({
            msg: 'could not add'
          })
        } else {
          res.status(201).send({ msg: 'success' })
        }
      })
    }
  }
}