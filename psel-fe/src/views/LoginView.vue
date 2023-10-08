<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useRouter } from 'vue-router'
import Cookies from 'js-cookie'
const router = useRouter()
const email = ref('')
const password = ref('')
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

async function loginForm(event: Event): Promise<void> {
  event.preventDefault()

  const form = event.target as HTMLFormElement
  const formData = new FormData(form)

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  console.log('Email:', email)
  console.log('Password:', password)
  try {
    const response = await fetch('http://localhost:3000/auth/login', {
      body: JSON.stringify({
        email,
        password
      }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    const data = await response.json()
    const expirationDate = new Date()
    expirationDate.setTime(expirationDate.getTime() + 10 * 60 * 60 * 1000)
    Cookies.set('token', data.access_token, { expires: expirationDate })
    router.push('/account')
  } catch (e: any) {
    error.value = e.message as string
  }
}
</script>
<template>
  <main>
    <form @submit="loginForm">
      <label for="email">
        Email<br />
        <input type="email" name="email" id="email" :value="email" @input="updateEmail($event)" />
      </label>
      <label for="password">
        Password<br />
        <input type="password" id="password" name="password" @input="updatePassword($event)" />
      </label>
      <button type="submit">Entrar</button>
    </form>
    <RouterLink to="/register">Register here</RouterLink>
  </main>
</template>
<style scoped>
label {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}
</style>
