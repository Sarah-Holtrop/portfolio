import session from 'express-session';
import db from '../../../server/db/dbconfig';

export default function getProgram(req, res, next) {
  if (req.method === 'GET') {
    if (session.user.teammate_id) {
      db.query(`SELECT JSON_ARRAYAGG(JSON_OBJECT('planId',wp.plan_id, 'exerciseName', wp.exercise_name, 'sets',wp.sets, 'reps',wp.reps )) AS workoutPlan,
p.start_date AS startDate,
p.end_date AS endDate,
p.weekly_count AS weeklyCount,
p.name AS name,
p.program_id AS programId
FROM programs p
JOIN workout_plans wp ON wp.program_id = p.program_id
JOIN coach_teammate_xref ctx ON ctx.program_id = wp.program_id
WHERE ctx.teammate_id = ${session.user.teammate_id};`, (err, result) => {
        if (err) {
          res.status(404).send({
            msg: 'Not found'
          })
        } else {
          res.send(result);
        }
      })
    }
  }
}