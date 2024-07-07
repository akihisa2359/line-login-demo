<template>
  <div class="container">
    <div>
      <div v-if="me">
        <div>ログイン中</div>
        <div>
          <NuxtLink to="/profile">go to profile</NuxtLink>
        </div>
      </div>
      <img
        v-else
        src="/public/btn_login_base.png"
        @click="loginWithLine"
        class="line-login-btn"
      />
    </div>
  </div>
</template>

<script setup>
const { me } = useAuth();

const loginWithLine = async () => {
  window.location.href = "/api/redirect-to-line";
};
</script>

<style scoped>
.container {
  max-width: 576px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.line-login-btn {
  cursor: pointer;
  &:hover {
    filter: brightness(0.9);
  }
  &:active {
    filter: brightness(0.7);
  }
  margin-bottom: 16px;
}
</style>
