import { defineEventHandler, getCookie } from "h3";
import sessionStore from "../sessionStore";

export default defineEventHandler((event) => {
  const sessionId = getCookie(event, "session_id");
  const user = sessionStore.get(sessionId);

  return user ? { user } : { user: null };
});
