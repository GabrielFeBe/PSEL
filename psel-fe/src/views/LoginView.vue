<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useRouter } from 'vue-router'
import Cookies from 'js-cookie'
import { getToken } from '@/utils/GetCookies'
const router = useRouter()
const email = ref('')
const password = ref('')
const error = ref<null | string>(null)

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
    router.go(0)
  } catch (e: any) {
    error.value = e.message as string
    setTimeout(() => {
      error.value = null
    }, 3000)
  }
}
</script>
<template>
  <main>
    <form v-if="!getToken()" @submit="loginForm">
      <label for="email">
        Email<br />
        <input type="email" name="email" id="email" v-model="email" />
      </label>
      <label for="password">
        Password<br />
        <input type="password" name="password" id="password" v-model="password" />
      </label>
      <button type="submit">Entrar</button>
      <p v-if="error">{{ error }}</p>
      <RouterLink to="/register">Register here</RouterLink>
    </form>
    <section class="centralizedWelcome" v-else>Welcome to PSel Your best Payment Solution</section>
  </main>
</template>
<style scoped>
.centralizedWelcome {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
  font-size: 2rem;
}

label {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}
</style>
