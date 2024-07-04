import { getCookie } from "h3";

export default defineNuxtRouteMiddleware((to, from) => {
  if (import.meta.client) return;

  const event = useRequestEvent();

  const profile = getCookie(event, "profile");
  console.log(profile);

  if (!profile) {
    // return abortNavigation();
    return navigateTo("/");
  }
});
