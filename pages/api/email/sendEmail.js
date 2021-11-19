import nodemailer from 'nodemailer';
import emailTemplate from './emailTemplate';
const session = require('express-session');
const db = require('../../../server/db/dbconfig');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

export default function sendEmail(req, res, next) {
  let username = session.user.username;
  let { programName, teammate } = req.query;
  //get recipient usernames
  let recipient;
  db.query(`SELECT u.email FROM users u 
  where u.username = '${teammate}' and u.role = 'teammate';`, (err, result) => {
    if (err) {
      res.status(400).send({
        msg: 'Could not find users'
      })
    } else {
      recipient = result[0]['email'];
      const html = emailTemplate(username, programName)

      const mailOptions = {
        from: 'sarahholtrop@gmail.com',
        to: recipient,
        subject: `${username} added you to their weightroom`,
        html
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    }
  })



}
