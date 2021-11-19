import session from 'express-session';
import db from '../../../server/db/dbconfig';

export default function getProgress(req, res, next) {
  // get- id: 1, program_id: 16, plan_id, weight, added_dt
  if (req.method === 'GET') {
    if (session.user.teammate_id) {
      db.query(``)
    }
  }
}