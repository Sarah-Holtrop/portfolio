export default function emailTemplate(username, program) {
  return `
    <h1>You've been added!</h1>
    <p>${username} has added you to their program ${program}</p>
  `
}