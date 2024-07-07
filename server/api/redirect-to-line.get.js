import { setCookie, sendRedirect } from "h3";
import { randomUUID } from "crypto";

// ログインセッションごとにCSRFトークンを生成する必要があるため、サーバーサイドにリダイレクト用のエンドポイントを実装
export default defineEventHandler(async (event) => {
  const { clientId, redirectUri } = useRuntimeConfig().public;

  const csrfToken = randomUUID();
  setCookie(event, "csrf_token", csrfToken, {
    httpOnly: true,
    sameSite: "Lax", // StringだとLINE認証ページからline-callbackにリダイレクトする際にcookieが送信されない
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 3600,
  });

  const lineAuthUrl = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${csrfToken}&scope=profile`;

  return await sendRedirect(event, lineAuthUrl);
});
