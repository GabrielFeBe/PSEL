<script setup lang="ts">
import SelectCpfOrCnpj from '@/components/ SelectCpfOrCnpj.vue'
import EmailPassword from '@/components/EmailPassword.vue'
import { useFetchDU } from '@/utils/fetchDU'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const error = ref<string | null>(null)
const url = ref('http://localhost:3000/accounts')

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
  const name = formData.get('name') as string
  const lastName = formData.get('lastName') as string

  console.log('Email:', email)
  console.log('Password:', password)
  console.log('Confirm Password:', confirmPassword)
  console.log('CPF:', cpf)
  console.log('CNPJ:', cnpj)
  const body = { email, password, cpf, cnpj, name, lastName }
  const { error: errorR } = await useFetchDU(url, 'POST', body)
  if (errorR.value) {
    error.value = errorR.value
  } else {
    router.push('/')
  }
}
</script>

<template>
  <main>
    <form @submit="submitForm">
      <EmailPassword />
      <SelectCpfOrCnpj />
    </form>
    <p v-if="error">{{ error }}</p>
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
