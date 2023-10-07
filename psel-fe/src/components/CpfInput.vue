<script setup lang="ts">
import { ValidateCPF } from '../utils/CpfValidator'
import { ref } from 'vue'
const isCPFValid = ref(true)
const cpf = ref('')
const validateInput = () => {
  isCPFValid.value = ValidateCPF(cpf.value)
}
let validationTimeout: number | undefined = undefined

const updateCpf = (event: Event) => {
  if (event.target) {
    isCPFValid.value = true
    cpf.value = (event.target as HTMLInputElement).value
    clearTimeout(validationTimeout)
    validationTimeout = setTimeout(validateInput, 1000)
  }
}
</script>

<template>
  <label for="cpf">
    Cpf<br />
    <input type="text" id="cpf" name="cpf" :value="cpf" @input="updateCpf($event)" />
    <span v-if="cpf.length > 0 && !isCPFValid">CPF inválido</span>
  </label>
</template>

<style scoped></style>
