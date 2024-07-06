import { getCookie } from "h3";

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (import.meta.client) return;

  // serverの値を参照できない
  // const { sessionStore } = require("server/sessionStore");
  const hoge = await $fetch("/api/check-session");
  const event = useRequestEvent();

  // const sessionId = getCookie(event, "session_id");
  // if (sessionId && sessionStore.has(sessionId)) {
  //   return;
  // }

  // return navigateTo("/");
});
