import session from "express-session";

export default function logout() {
  delete session.user;
}