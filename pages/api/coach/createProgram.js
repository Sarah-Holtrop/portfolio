import db from '../../../server/db/dbconfig';
import session from 'express-session';

export default function create(req, res, next) {
  db.query(
    `INSERT INTO programs (coach_id, start_date, end_date, weekly_count, name) VALUES(${session.user.coach_id}, ${db.escape(
      req.body.program.startDate
    )},${db.escape(
      req.body.program.endDate
    )},${db.escape(
      req.body.program.weeklyCount
    )},${db.escape(
      req.body.program.name
    )});`,
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(409).send({
          msg: err
        });
      } else {
        let values = req.body.program.workoutPlans.map((p) => `(${result.insertId},'${p.exerciseName}', ${p.sets}, ${p.reps})`)
        db.query(`INSERT INTO workout_plans (program_id, exercise_name, sets, reps) VALUES${values.join(',')}`,
          (err, result) => {
            if (err) {
              console.log(err)
              return res.status(409).send({
                msg: err
              });
            } else {
              return res.status(201).send({
                msg: 'Program Created'
              })
            }
          }
        )
      }
    }
  );
}