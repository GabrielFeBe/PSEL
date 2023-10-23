<script setup lang="ts">
import { ErrorMessage, Field, Form, type SubmissionHandler } from 'vee-validate'
import * as yup from 'yup'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useRouter } from 'vue-router'
import Cookies from 'js-cookie'
import { getToken } from '@/utils/GetCookies'
import { useFetchDU } from '@/utils/fetchDU'
import { loginCases } from '@/utils/LoginCases'
const router = useRouter()
const url = ref('http://localhost:3000/auth/login')
const email = ref('')
const password = ref('')
const errorPage = ref<null | string[]>(null)

const emailRules = yup.string().email('Email Must be valid').required('Email is required')
const passwordRules = yup.string().required('Password is required').min(8)

interface GenericFormValues {
  [key: string]: string
  email: string
  password: string
}

const submitForm: SubmissionHandler<GenericFormValues, Promise<void>> = async (value) => {
  const { email, password } = value

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
    <Form v-if="!getToken()" @submit="submitForm as any">
      <label for="email">
        <span> Email </span>
        <Field
          name="email"
          id="email"
          v-model="email"
          :rules="emailRules"
          v-slot="{ field, errors }"
        >
          <input type="email" :class="{ tremor: errors[0] }" v-bind="field" />
        </Field>
        <ErrorMessage name="email" class="errorFields" />
      </label>
      <label for="password">
        Password
        <Field
          name="password"
          id="password"
          v-model="password"
          :rules="passwordRules"
          v-slot="{ field, errors }"
        >
          <input type="password" :class="{ tremor: errors[0] }" v-bind="field" />
        </Field>
        <ErrorMessage name="password" class="errorFields" />
      </label>
      <span class="error" v-if="errorPage">{{ loginCases(errorPage as any) }}</span>
      <button type="submit">Entrar</button>

      <RouterLink to="/register">Register here</RouterLink>
    </Form>
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
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
  text-align: left;
}

.errorFields {
  color: red;
  position: absolute;
  bottom: -15px;
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
