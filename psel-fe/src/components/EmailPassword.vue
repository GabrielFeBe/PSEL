<script setup lang="ts">
import { ref } from 'vue'
const email = ref('')
const password = ref('')
const name = ref('')
const lastName = ref('')
const confirmPassword = ref('')
const updateEmail = (event: Event) => {
  if (event.target) {
    email.value = (event.target as HTMLInputElement).value
  }
}
const updatePassword = (event: Event) => {
  if (event.target) {
    password.value = (event.target as HTMLInputElement).value
  }
}
const updateConfirmationPassword = (event: Event) => {
  if (event.target) {
    confirmPassword.value = (event.target as HTMLInputElement).value
  }
}
</script>

<template>
  <div>
    <label for="email">
      Email<br />
      <input type="email" name="email" id="email" :value="email" @input="updateEmail($event)" />
    </label>
    <label for="password">
      Password<br />
      <input type="password" id="password" name="password" @input="updatePassword($event)" />
    </label>
    <label for="confirmPassword">
      Confirm Password<br />
      <input
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        @input="updateConfirmationPassword($event)"
      />
    </label>
    <label for="name">
      Name<br />
      <input type="text" name="name" id="name" v-model="name" />
    </label>
    <label for="lastName">
      Last Name<br />
      <input type="text" name="lastName" id="lastName" v-model="lastName" />
    </label>
  </div>
</template>

<style scoped></style>
