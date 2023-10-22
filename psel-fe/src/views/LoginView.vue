<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useRouter } from 'vue-router'
import Cookies from 'js-cookie'
import { getToken } from '@/utils/GetCookies'
import { useFetchDU } from '@/utils/fetchDU'
const router = useRouter()
const url = ref('http://localhost:3000/auth/login')
const email = ref('')
const password = ref('')
const errorPage = ref<null | string[]>(null)
import { loginCases } from '@/utils/LoginCases'
async function loginForm(event: Event): Promise<void> {
  event.preventDefault()

  const form = event.target as HTMLFormElement
  const formData = new FormData(form)

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  console.log('Email:', email)
  console.log('Password:', password)
  const body = { email, password }
  const { error, data } = await useFetchDU(url, 'POST', body, getToken() as string)
  if (error.value) {
    errorPage.value = error.value
  } else {
    const alo = data.value as any
    Cookies.set('token', alo.access_token)
    router.go(0)
  }
}
</script>
<template>
  <main>
    <h1 v-if="!getToken()">Login</h1>
    <form v-if="!getToken()" @submit="loginForm">
      <label for="email">
        <span> Email </span>
        <input type="email" name="email" id="email" v-model="email" />
      </label>
      <label for="password">
        <span> Password </span>
        <input type="password" name="password" id="password" v-model="password" />
      </label>
      <span class="error" v-if="errorPage">{{ loginCases(errorPage as any) }}</span>
      <button type="submit">Entrar</button>

      <RouterLink to="/register">Register here</RouterLink>
    </form>
    <section class="centralizedWelcome" v-else>Welcome to PSel Your best Payment Solution</section>
  </main>
</template>
<style scoped>
h1 {
  padding-bottom: 100px;
}
.centralizedWelcome {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-size: 2rem;
  background-size: cover;
  color: var(--color-text);
  font-weight: 700;
}

label {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
  text-align: left;
}

form {
  position: relative;
  border: 1px solid var(--color-border);
  border-radius: 20px;
  width: 400px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

main {
  padding-top: 0;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
span {
  padding-bottom: 10px;
}

.error {
  color: red;
  height: 1rem;
  position: absolute;
  bottom: 150px;
}
</style>
