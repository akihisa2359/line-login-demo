import { setCookie, getCookie } from "h3";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const { clientSecret } = config;
  const { clientId, redirectUri } = config.public;
  const { code, state } = getQuery(event);

  const csrfToken = getCookie(event, "csrf_token");
  console.log("csrftoken:", csrfToken);
  if (state !== csrfToken) {
    throw createError({ statusCode: 401, message: "Invalid state" });
  }

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

    console.log(tokenResponse);
    const accessToken = tokenResponse.access_token;

    const profileResponse = await $fetch("https://api.line.me/v2/profile", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    setCookie(event, "profile", JSON.stringify(profileResponse), {
      httpOnly: true,
      sameSite: "Lax", // "Strictだと/profileにリダイレクトした際に呼ばれるapi/profileへのリクエストにprofileのクッキーが含まれない
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return sendRedirect(event, "/profile");
  } catch (error) {
    return { error: error.message };
  }
});
