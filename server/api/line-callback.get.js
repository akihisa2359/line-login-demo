import { setCookie, getCookie, deleteCookie } from "h3";
import { randomUUID } from "crypto";
import sessionStore from "../sessionStore";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const { clientSecret } = config;
  const { clientId, redirectUri } = config.public;
  const { code, state } = getQuery(event);

  const csrfToken = getCookie(event, "csrf_token");
  if (state !== csrfToken) {
    throw createError({ statusCode: 401, message: "Invalid state" });
  }
  deleteCookie(event, "csrf_token");

  try {
    const body = {
      grant_type: "authorization_code",
      code,
      redirect_uri: encodeURI(redirectUri),
      client_id: clientId,
      client_secret: clientSecret,
    };
    const tokenResponse = await $fetch(
      "https://api.line.me/oauth2/v2.1/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(body).toString(),
      }
    );

    const accessToken = tokenResponse.access_token;

    const profileResponse = await $fetch("https://api.line.me/v2/profile", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const uuid = randomUUID();
    sessionStore.set(uuid, profileResponse);
    setCookie(event, "session_id", uuid, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return sendRedirect(event, "/profile");
  } catch (error) {
    return { error: error.message };
  }
});
