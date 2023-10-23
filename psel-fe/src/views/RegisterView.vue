<script setup lang="ts">
import { Form, type SubmissionHandler } from 'vee-validate'
import SelectCpfOrCnpj from '@/components/ SelectCpfOrCnpj.vue'
import EmailPassword from '@/components/EmailPassword.vue'
import { useFetchDU } from '@/utils/fetchDU'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const error = ref<string[] | null>(null)
const url = ref('http://localhost:3000/accounts')
interface GenericFormValues {
  [key: string]: string
  email: string
  password: string
  confirmPassword: string
  cpf: string
  cnpj: string
  name: string
  lastName: string
}

const submitForm: SubmissionHandler<GenericFormValues, Promise<void>> = async (data) => {
  const { email, password, confirmPassword, cpf, cnpj, name, lastName } = data

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
    <h1>Register</h1>
    <Form
      class="relative"
      @submit="submitForm as SubmissionHandler<GenericFormValues, Promise<void>>"
    >
      <EmailPassword />
      <SelectCpfOrCnpj />
      <p v-if="error" class="errorFetch">{{ error }}</p>
    </Form>
  </main>
</template>

<style scoped>
.errorFetch {
  color: red;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  bottom: -30px;
}
.relative {
  position: relative;
}
h1 {
  padding-bottom: 100px;
}

@media (min-width: 1024px) {
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
form {
  border: 1px solid var(--color-border);
  border-radius: 20px;
  width: 400px;
  height: 530px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
main {
  flex-direction: column;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
