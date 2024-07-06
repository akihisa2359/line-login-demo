<template>
  <div>
    <img
      src="/public/btn_login_base.png"
      @click="loginWithLine"
      class="line-login-btn"
    />
  </div>
</template>

<script setup>
const loginWithLine = async () => {
  window.location.href = "/api/redirect-to-line";
};
</script>

<style scoped>
.line-login-btn {
  cursor: pointer;
  &:hover {
    filter: brightness(0.9);
  }
  &:active {
    filter: brightness(0.7);
  }
}
</style>
