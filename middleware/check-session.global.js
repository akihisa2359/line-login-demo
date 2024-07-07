export default defineNuxtRouteMiddleware(async (to, from) => {
  const { me, login } = useAuth();
  if (me.value) {
    return;
  }

  if (import.meta.server) {
    const event = useRequestEvent();
    // サーバー側のmiddlewareからfetchする時はcookieが含まれないため明示的にセットする
    const { user } = await $fetch("/api/profile", {
      headers: {
        Cookie: event.node.req.headers.cookie,
      },
    });
    if (user) login(user);
  } else {
    const { user } = await $fetch("/api/profile");
    if (user) login(user);
  }

  return;
});
