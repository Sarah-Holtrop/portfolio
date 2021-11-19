import db from '../../../server/db/dbconfig';
import session from 'express-session';

export default function get(req, res, next) {
  if (req.method === 'GET') {
    db.query(`SELECT JSON_ARRAYAGG(JSON_OBJECT('planId',wp.plan_id, 'exerciseName', wp.exercise_name, 'sets',wp.sets, 'reps',wp.reps )) AS workoutPlan,
p.start_date AS startDate,
p.end_date AS endDate,
p.weekly_count AS weeklyCount,
p.name AS name,
p.program_id AS programId
FROM workout_plans wp
JOIN programs p ON p.program_id = wp.program_id
WHERE wp.program_id = p.program_id
AND p.coach_id = ${session.user.coach_id}
GROUP BY p.program_id;`, (err, result) => {
      if (err) {
        res.status(400).send({
          msg: err
        })
      } else {
        res.status(200).send({ result })
      }
    })
  }
}