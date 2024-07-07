<template>
  <div class="container">
    <div v-if="me">
      <p>ようこそ</p>
      <p>{{ me.displayName }} さん</p>
      <p>
        <button @click="clickLogout">ログアウト</button>
      </p>
      <NuxtLink to="/">go to top</NuxtLink>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
});

const { me, logout } = useAuth();

// const { data: profile, error } = await useFetch("/api/profile");

// if (error.value) {
//   console.log(error.value);
//   if (error.value.statusCode === 401) {
//     window.alert("Unauthorized");
//   }
//   navigateTo("/");
// }

const clickLogout = async () => {
  try {
    const res = await $fetch("/api/logout", {
      method: "POST",
    });
    logout();
    navigateTo("/");
  } catch (error) {
    console.log(error);
  }
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
</style>
