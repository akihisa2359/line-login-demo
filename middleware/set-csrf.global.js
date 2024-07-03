import { setCookie, getCookie } from "h3";

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (import.meta.client) return;

  const event = useRequestEvent();
  const { randomUUID } = await import("crypto");

  let csrfToken = getCookie(event, "csrf_token");
  console.log(csrfToken);
  if (!csrfToken) {
    csrfToken = randomUUID();
    setCookie(event, "csrf_token", csrfToken, {
      httpOnly: true,
      sameSite: "Lax", // StringだとLINE認証ページからline-callbackにリダイレクトする際にcookieが送信されない
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });
  }
});
