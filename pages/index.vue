<template>
  <div>
    <button @click="loginWithLine">Login with LINE</button>
    <div>
      <NuxtLink to="about">go to about</NuxtLink>
    </div>
  </div>
</template>

<script setup>
const loginWithLine = async () => {
  window.location.href = "/api/redirect-to-line";
};
</script>
