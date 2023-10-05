<script setup lang="ts">
import SelectCpfOrCnpj from '@/components/ SelectCpfOrCnpj.vue'
import { ref } from 'vue'
const email = ref('')
const password = ref('')
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
      <input type="email" id="email" :value="email" @input="updateEmail($event)" />
    </label>
    <label for="password">
      Password<br />
      <input type="password" id="password" @input="updatePassword($event)" />
    </label>
    <label for="confirmPassword">
      Confirm Password<br />
      <input type="password" id="confirmPassword" @input="updateConfirmationPassword($event)" />
    </label>
    <SelectCpfOrCnpj />
  </div>
</template>

<style scoped>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }

  input {
    width: 300px;
    height: 10px;
    padding: 1rem;
    border: 1px solid var(--color-border);
    border-radius: 0.25rem;
    margin-bottom: 1rem;
  }
  label {
    width: 100%;
  }
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
</style>
