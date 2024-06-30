<template>
  <div>
    <button @click="loginWithLine">Login with LINE</button>
  </div>
</template>

<script setup>
const loginWithLine = () => {
  const state = "RANDOM_STRING"; // CSRF対策のために本来はランダムな文字列にする

  const { clientId, redirectUri } = useRuntimeConfig().public;

  const lineAuthUrl = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&scope=profile`;

  window.location.href = lineAuthUrl;
};
</script>
