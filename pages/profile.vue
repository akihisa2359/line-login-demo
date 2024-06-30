<template>
  <div v-if="profile">
    <h1>{{ profile.displayName }}</h1>
    <img :src="profile.pictureUrl" alt="Profile Picture" />
    <p>{{ profile.statusMessage }}</p>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script setup>
import { useFetch } from "#app";
import { useState } from "#app";

const profile = useState("profile", () => null);

const { data, error } = await useFetch("/api/profile");
if (data.value) {
  profile.value = data.value;
} else {
  console.error(error.value);
}
</script>
