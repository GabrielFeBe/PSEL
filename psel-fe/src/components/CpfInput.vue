<script setup lang="ts">
import { ValidateCPF } from '../utils/CpfValidator'
import { ref } from 'vue'
import { formsStore } from '../stores/Form'
import { ErrorMessage, Field } from 'vee-validate'
import * as yup from 'yup'
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

const cpfRules = yup
  .string()
  .required()
  .min(11)
  .test('cpf', 'CPF inválido', function (value) {
    return ValidateCPF(value as string)
  })
</script>

<template>
  <label for="cpf">
    Cpf
    <Field
      type="text"
      id="cpf"
      name="cpf"
      :value="formsStore.cpf"
      @input="updateCpf($event)"
      :rules="cpfRules"
      v-slot="{ field, errors }"
    >
      <input type="text" v-bind="field" :class="{ tremor: errors[0] }" />
    </Field>
    <ErrorMessage name="cpf" class="error" />
  </label>
</template>

<style scoped>
label {
  position: relative;
  display: flex;
  flex-direction: column;
}

.error {
  position: absolute;
  color: red;
  bottom: -8px;
}
</style>
