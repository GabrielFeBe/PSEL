<script setup lang="ts">
import { onBeforeUnmount, ref, type Ref } from 'vue'
import { useFetchDU } from '../utils/fetchDU'
import { type UAccount } from '../types/UpdateAcc'
import { useRouter } from 'vue-router'
import { formsStore } from '@/stores/Form'
import { validateFormAccount } from '@/utils/ValidateForm'
import Cookies from 'js-cookie'
const router = useRouter()
const deleteConfirmation = ref(false)
import { getToken } from '../utils/GetCookies'
import { useFetch } from '../utils/fetch'
import type { Account } from '@/types/Account'
import EmailPassword from '@/components/EmailPassword.vue'
const url = ref('http://localhost:3000/accounts')

const { data, error } = useFetch<Account>(url, getToken() as string)
const updateError = ref<Ref | null>(null)
const deleteAccount = () => {
  useFetch(url, getToken() as string, 'DELETE')
  Cookies.remove('token')
  router.push('/')
}
let timeoutId: number | undefined = undefined
const updatingAccount = async () => {
  const body: UAccount = {
    email: formsStore.email,
    name: formsStore.name,
    lastName: formsStore.lastName
  }
  if (formsStore.password.length > 6) {
    body.password = formsStore.password
  }

  const { error } = await useFetchDU(url, 'PATCH', body, getToken() as string)
  if (error.value === null) {
    clearInterval(timeoutId)
    window.location.reload()
  } else {
    clearInterval(timeoutId)
    updateError.value = error.value
    timeoutId = setTimeout(() => {
      updateError.value = null
    }, 3000)
  }
}
onBeforeUnmount(() => {
  if (timeoutId !== null) {
    clearTimeout(timeoutId)
  }
})
</script>
<template>
  <main>
    <h1>Account</h1>

    <div v-if="deleteConfirmation" class="confirmD">
      <div class="confirmB">
        <p class="confirmT">Are you sure you want to delete your account?</p>
        <div class="buttonsBox">
          <button class="warning" @click="deleteAccount">Yes</button>
          <button @click="deleteConfirmation = false" class="confirmButtonNot">No</button>
        </div>
      </div>
    </div>
    <div v-if="error">
      <p>Oops! Error encountered: {{ error }}</p>
    </div>
    <div v-else-if="data" class="boxAccount">
      <label for="" v-if="data.cpf">
        Cpf
        <input class="disabled" type="text" :value="data.cpf" disabled="true" />
      </label>
      <label for="" v-else>
        <input class="disabled" type="text" :value="data.cnpj" disabled="true" />
      </label>
      <EmailPassword :object-form="data" />
      <div class="buttonBox">
        <button @click="updatingAccount" :disabled="!validateFormAccount(formsStore)">
          Change
        </button>
        <button class="warning" @click="deleteConfirmation = true">Delete</button>
      </div>
      <div class="error" v-if="updateError">
        {{ updateError }}
      </div>
    </div>
    <div v-else>Loading...</div>
  </main>
</template>
<style scoped>
.error {
  color: red;
  position: absolute;
  bottom: 0;
}
.boxAccount {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 550px;
  border: 1px solid var(--color-border);
  border-radius: 20px;
}

.buttonBox {
  display: flex;
  justify-content: space-around;
  width: 100%;
}

h1 {
  text-align: center;
  padding-bottom: 100px;
}
label {
  display: flex;
  flex-direction: column;
  width: 300px;
}
.labelPassword {
  margin-bottom: 1rem;
  position: absolute;
}
.invalidPassword {
  color: red;
  position: relative;
  right: 0;
  bottom: 10px;
}
.warning {
  width: 72px;
  background-color: red;
  padding: 0.8rem;
  border-radius: 15px;
  cursor: pointer;
  border: 0;
  cursor: pointer;
}

.warning:hover {
  background-color: #c51818;
}
.disabled {
  background-color: #ccc;
}
.confirmD {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.confirmB {
  background-color: white;
  padding: 2rem;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.confirmT {
  font-size: 2rem;
  margin-bottom: 2rem;
  color: black;
}
.buttonsBox {
  display: flex;
  justify-content: space-around;
  width: 100%;
}
.confirmButtonNot {
  background-color: #ccc;
  color: black;
  border: none;
  padding: 1rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
}

main {
  padding-top: 0;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
