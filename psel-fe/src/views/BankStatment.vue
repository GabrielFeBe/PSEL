<script setup lang="ts">
import { ref } from 'vue'
import { getToken } from '@/utils/GetCookies'
import { useFetch } from '@/utils/fetch'
const url = ref('http://localhost:3000/transactions')
const { data, error } = useFetch(url, getToken() as string)
const array: any = data.value || []
const totalCashBack = ref(0)
array.forEach((element: any) => {
  totalCashBack.value += element.value * element.cashback
})
</script>
<template>
  <main>
    <h1>Account</h1>
    <div v-if="error">
      <p>Oops! Error encountered: {{ error }}</p>
    </div>
    <div v-else-if="data">
      Data loaded:
      <pre>{{ data }}</pre>
    </div>
    <section v-else>
      <div v-for="(item, index) in array" :key="index" class="operationCards">
        {{ item.value }} {{ item.cashback }} {{ item.date }}
      </div>
      <div>Total Cashback: {{ totalCashBack }}</div>
    </section>
  </main>
</template>
<style scoped>
.operationCards {
  border: 1px solid white;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  width: 300px;
  display: flex;
  justify-content: space-between;
}
</style>
