<script setup lang="ts">
import SelectCpfOrCnpj from '@/components/ SelectCpfOrCnpj.vue'
import { ref } from 'vue'
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')
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

async function submitForm(event: Event): Promise<void> {
  event.preventDefault()

  const form = event.target as HTMLFormElement
  const formData = new FormData(form)

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string
  // cnpj or cpf one of them will be null always
  const cpf = formData.get('cpf') as string
  const cnpj = formData.get('cnpj') as string

  console.log('Email:', email)
  console.log('Password:', password)
  console.log('Confirm Password:', confirmPassword)
  console.log('CPF:', cpf)
  console.log('CNPJ:', cnpj)
  try {
    const response = await fetch('mock-url.com', {
      body: JSON.stringify({
        email,
        password,
        confirmPassword,
        cpf,
        cnpj
      }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (!response.ok) {
      throw new Error(response.statusText)
    }
  } catch (e: any) {
    error.value = e.message as string
  }
}
</script>

<template>
  <form @submit="submitForm">
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
    <SelectCpfOrCnpj />
  </form>
  <p v-if="error.length > 1">{{ error }}</p>
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
