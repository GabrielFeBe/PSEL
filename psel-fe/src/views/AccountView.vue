<script setup lang="ts">
import { onBeforeUnmount, ref, type Ref } from 'vue'
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
let timeoutId: number | null | undefined = null
const updatingAccount = () => {
  const { error } = useFetch(url, getToken() as string, 'PATCH')
  if (error) {
    updateError.value = error
    timeoutId = setTimeout(() => {
      updateError.value = null
    }, 3000)
  } else {
    window.location.reload()
  }
}
onBeforeUnmount(() => {
  if (timeoutId !== null) {
    clearTimeout(timeoutId)
  }
})
console.log(updateError)
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
      <p>Oops! Error encountered: {{ error.message }}</p>
    </div>
    <div v-else-if="data">
      Data loaded:
      <pre>{{ data }}</pre>
      <input type="text" v-model="data.email" />
      <input type="text" v-model="data.password" />
      <input v-if="data.cpf" class="disabled" type="text" :value="data.cpf" disabled="true" />
      <input v-else class="disabled" type="text" :value="data.cnpj" disabled="true" />
    </div>
    <div v-else>Loading...</div>
    <button @click="updatingAccount">Change</button>
    <button class="warning" @click="deleteConfirmation = true">Delete</button>
    <div v-if="updateError?.value">{{ updateError.value.message }}</div>
  </main>
</template>
<style scoped>
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
