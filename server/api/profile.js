import { defineEventHandler, getCookie } from "h3";

export default defineEventHandler((event) => {
  const profileCookie = getCookie(event, "profile");

  if (profileCookie) {
    return JSON.parse(profileCookie);
  } else {
    return { error: "Profile not found" };
  }
});
