<script setup lang="ts">
import { onBeforeUnmount, ref, type Ref } from 'vue'
import { useFetchDU } from '../utils/fetchDU'
import { type UAccount } from '../types/UpdateAcc'
import { useRouter } from 'vue-router'
import Cookies from 'js-cookie'
const router = useRouter()
const deleteConfirmation = ref(false)
import { getToken } from '../utils/GetCookies'
import { useFetch } from '../utils/fetch'
const url = ref('http://localhost:3000/accounts')
const { data, error } = useFetch(url, getToken() as string)
const updateError = ref<Ref | null>(null)
const deleteAccount = () => {
  useFetch(url, getToken() as string, 'DELETE')
  Cookies.remove('token')
  router.push('/')
}
let timeoutId: number | undefined = undefined
const updatingAccount = async () => {
  const body: UAccount = { email: data.value?.email }
  if (data.value && data.value?.password.length > 6) {
    body.password = data.value?.password
  }

  const { error } = await useFetchDU(url, getToken() as string, 'PATCH', body)
  if (error.value === null) {
    clearInterval(timeoutId)
    window.location.reload()
  } else {
    console.log(error.value)
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
    <div v-if="deleteConfirmation" class="confirmD">
      <div class="confirmB">
        <p class="confirmT">Are you sure you want to delete your account?</p>
        <div class="buttonsBox">
          <button class="warning" @click="deleteAccount">Yes</button>
          <button @click="deleteConfirmation = false" class="confirmButtonNot">No</button>
        </div>
      </div>
    </div>
    <h1>Account</h1>
    <div v-if="error">
      <p>Oops! Error encountered: {{ error }}</p>
    </div>
    <div v-else-if="data">
      Data loaded:
      <pre>{{ data }}</pre>
      <input type="text" v-model="data.email" />

      <label for="" v-if="data.cpf">
        <input class="disabled" type="text" :value="data.cpf" disabled="true" />
      </label>
      <input v-else class="disabled" type="text" :value="data.cnpj" disabled="true" />
      <label for="" class="labelPassword">
        <input
          type="text"
          v-model="data.password"
          placeholder="Put your new password here or let it empty"
        />
        <p v-if="data.password.length !== 0 && data.password.length < 6" class="invalidPassword">
          Password must be valid
        </p>
      </label>
    </div>
    <div v-else>Loading...</div>
    <button @click="updatingAccount">Change</button>
    <button class="warning" @click="deleteConfirmation = true">Delete</button>
    <div v-if="updateError">{{ updateError }}</div>
  </main>
</template>
<style scoped>
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
  background-color: red;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
}
.disabled {
  background-color: #ccc;
}
/* confirmD will be a div that will be absolute and will work like a huge blur on the whole page */
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
</style>
