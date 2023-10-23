<script setup lang="ts">
import { validateCnpj } from '@/utils/CnpjValidator'
import { ref } from 'vue'
import { formsStore } from '../stores/Form'
import { ErrorMessage, Field } from 'vee-validate'

import * as yup from 'yup'
const isCnpjValid = ref(true)
const validateInput = () => {
  isCnpjValid.value = validateCnpj(formsStore.cnpj)
}
let validationTimeout: number | undefined = undefined

const cnpjRules = yup
  .string()
  .required()
  .min(14)
  .test('cnpj', 'CNPJ inválido', function (value) {
    return validateCnpj(value as string)
  })

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
    <Field
      id="cnpj"
      name="cnpj"
      :value="formsStore.cnpj"
      @input="updateCpf($event)"
      :rules="cnpjRules"
      v-slot="{ field, errors }"
    >
      <input type="text" v-bind="field" :class="{ tremor: errors[0] }" />
    </Field>
    <ErrorMessage name="cnpj" class="error" />
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
