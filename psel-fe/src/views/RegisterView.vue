<script setup lang="ts">
import SelectCpfOrCnpj from '@/components/ SelectCpfOrCnpj.vue'
import EmailPassword from '@/components/EmailPassword.vue'
import { ref } from 'vue'

const error = ref('')

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
  <main>
    <form @submit="submitForm">
      <EmailPassword />
      <SelectCpfOrCnpj />
    </form>
    <p v-if="error.length > 1">{{ error }}</p>
  </main>
</template>

<style scoped>
@media (min-width: 1024px) {
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
</style>
