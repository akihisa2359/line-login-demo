export default defineNuxtRouteMiddleware(async (to, from) => {
  const { me } = useAuth();
  if (me.value) {
    return;
  }

  return navigateTo("/");
});
