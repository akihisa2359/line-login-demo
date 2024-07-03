import { getCookie, sendRedirect } from "h3";

export default defineEventHandler(async (event) => {
  console.log("redirect-to-line");
  const { clientId, redirectUri } = useRuntimeConfig().public;
  const csrfToken = getCookie(event, "csrf_token");

  const lineAuthUrl = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${csrfToken}&scope=profile`;

  return await sendRedirect(event, lineAuthUrl);
});
