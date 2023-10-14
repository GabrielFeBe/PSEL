<script setup lang="ts">
import { ValidateCPF } from '../utils/CpfValidator'
import { ref } from 'vue'
import { formsStore } from '../stores/Form'
const isCPFValid = ref(true)

const validateInput = () => {
  isCPFValid.value = ValidateCPF(formsStore.cpf)
}
let validationTimeout: number | undefined = undefined

const updateCpf = (event: Event) => {
  if (event.target) {
    isCPFValid.value = true
    formsStore.cpf = (event.target as HTMLInputElement).value
    clearTimeout(validationTimeout)
    validationTimeout = setTimeout(validateInput, 1000)
  }
}
</script>

<template>
  <label for="cpf">
    Cpf<br />
    <input type="text" id="cpf" name="cpf" :value="formsStore.cpf" @input="updateCpf($event)" />
    <span v-if="formsStore.cpf.length > 0 && !isCPFValid">CPF inválido</span>
  </label>
</template>

<style scoped></style>
