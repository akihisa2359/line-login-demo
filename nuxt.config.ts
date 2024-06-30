// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      clientId: process.env.CLIENT_ID,
      redirectUri: process.env.REDIRECT_URI,
    },
    clientSecret: process.env.CLIENT_SECRET,
  },
});
