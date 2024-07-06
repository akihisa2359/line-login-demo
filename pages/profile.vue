<template>
  <div v-if="profile">
    <p>ようこそ</p>
    <p>{{ profile.user.displayName }} さん</p>
    <div>
      <button @click="logout">ログアウト</button>
    </div>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script setup>
definePageMeta({
  // middleware: "auth",
});

const profile = useState("profile", () => null);

const { data, error } = await useFetch("/api/profile");
if (data.value) {
  profile.value = data.value;
} else {
  console.error(error.value);
}

const logout = async () => {
  try {
    const res = await $fetch("/api/logout", {
      method: "POST",
    });
    navigateTo("/");
  } catch (error) {
    console.log(error);
  }
};
</script>
