import { getCookie, deleteCookie } from "h3";
import sessionStore from "../sessionStore";

export default defineEventHandler((event) => {
  const sessionId = getCookie(event, "session_id");
  sessionStore.delete(sessionId);
  deleteCookie(event, "session_id");

  return;
});
