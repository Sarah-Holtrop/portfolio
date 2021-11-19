import db from '../../../server/db/dbconfig';
import session from 'express-session';

export default function getTeammateProgress(req, res, next) {
  if (req.method === "GET") {
    if (session.user.coach_id) {
      db.query(`select tpp.id, tpp.teammate_id as teammateId, tpp.program_id as programId, tpp.weight, tpp.added_date as addedDate, wp.plan_id as planId, wp.exercise_name as exerciseName, wp.sets, wp.reps,  u.username
from teammate_program_progress tpp
join workout_plans wp on wp.plan_id = tpp.plan_id
join teammates t on t.teammate_id = tpp.teammate_id
join coach_teammate_xref ctx on ctx.program_id = tpp.program_id
join users u on u.user_id = t.user_id
join programs p on p.program_id = tpp.program_id
where ctx.coach_id = ${session.user.coach_id}
and p.program_id = ${db.escape(req.query.programId)}
and p.end_date > NOW()
order by tpp.plan_id;`, (err, result) => {
        if (err) {
          res.status(404).send({ msg: 'Data not found' });
        } else {
          res.status(200).send(result);
        }
      })
    }
  }
}