<script setup lang="ts">
import { ref } from 'vue'
import CpfInput from './CpfInput.vue'
const value = ref('cpf')

const updateValue = (event: Event) => {
  if (event.target) {
    value.value = (event.target as HTMLInputElement).value
  }
}
</script>

<template>
  <div>
    <select :value="value" @input="updateValue($event)">
      <option value="cpf">CPF</option>
      <option value="cnpj">CNPJ</option>
    </select>
    <label for="cpfOrCnpj">
      {{ value }}<br />
      <div v-if="value === 'cpf'">
        <CpfInput />
      </div>
    </label>
  </div>
</template>

<style scoped></style>
