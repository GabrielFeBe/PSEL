<script setup lang="ts">
import { validateCnpj } from '@/utils/CnpjValidator'
import { ref } from 'vue'
const isCnpjValid = ref(true)
const cnpj = ref('')
const validateInput = () => {
  isCnpjValid.value = validateCnpj(cnpj.value)
}
let validationTimeout: number | undefined = undefined

const updateCpf = (event: Event) => {
  if (event.target) {
    isCnpjValid.value = true
    cnpj.value = (event.target as HTMLInputElement).value
    clearTimeout(validationTimeout)
    validationTimeout = setTimeout(validateInput, 1000)
  }
}
</script>

<template>
  <label for="cnpj">
    Cnpj
    <input type="text" id="cnpj" :value="cnpj" @input="updateCpf($event)" />
    <span v-if="cnpj.length > 0 && !isCnpjValid">CNPJ inválido</span>
  </label>
</template>

<style scoped></style>
