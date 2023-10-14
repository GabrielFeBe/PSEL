<script setup lang="ts">
import { validateCnpj } from '@/utils/CnpjValidator'
import { ref } from 'vue'
import { formsStore } from '../stores/Form'
const isCnpjValid = ref(true)
const validateInput = () => {
  isCnpjValid.value = validateCnpj(formsStore.cnpj)
}
let validationTimeout: number | undefined = undefined

const updateCpf = (event: Event) => {
  if (event.target) {
    isCnpjValid.value = true
    formsStore.cnpj = (event.target as HTMLInputElement).value
    clearTimeout(validationTimeout)
    validationTimeout = setTimeout(validateInput, 1000)
  }
}
</script>

<template>
  <label for="cnpj">
    Cnpj<br />
    <input type="text" id="cnpj" name="cnpj" :value="formsStore.cnpj" @input="updateCpf($event)" />
    <span v-if="formsStore.cnpj.length > 0 && !isCnpjValid">CNPJ inválido</span>
  </label>
</template>

<style scoped></style>
