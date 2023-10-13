<script setup lang="ts">
// import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import CpfInput from './CpfInput.vue'
import CnpjInputVue from './CnpjInput.vue'
const value = ref('cpf')

const updateValue = (event: Event) => {
  if (event.target) {
    value.value = (event.target as HTMLInputElement).value
  }
}
</script>

<template>
  <select :value="value" @input="updateValue($event)">
    <option value="cpf">CPF</option>
    <option value="cnpj">CNPJ</option>
  </select>

  <div v-if="value === 'cpf'">
    <CpfInput />
  </div>
  <div v-else>
    <CnpjInputVue />
  </div>
  <!-- <RouterLink to="/"> -->
  <button type="submit">Register</button>
  <!-- </RouterLink> -->
</template>

<style scoped></style>
