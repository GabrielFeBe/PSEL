<script setup lang="ts">
import { formsStore } from '@/stores/Form'
import type { Account } from '@/types/Account'
import * as yup from 'yup'
import { Field, ErrorMessage } from 'vee-validate'
const passwordRules = yup.string().required().min(8)
const emailRules = yup.string().email('Email Must be valid').required('Email is required')
const passwordConfirmationRules = yup
  .string()
  .required()
  .test('passwords-match', 'Passwords must match', function (value) {
    return value === formsStore.password
  })
const nameRules = yup.string().required().min(3)
const lastNameRules = yup.string().required().min(3)
interface Props {
  objectForm?: Partial<Account>
}
const props = defineProps<Props>()
if (props.objectForm) {
  formsStore.email = props.objectForm.email as string
  formsStore.name = props.objectForm.name as string
  formsStore.lastName = props.objectForm.lastName as string
}
</script>

<template>
  <div>
    <label for="email">
      Email
      <Field
        type="email"
        name="email"
        id="email"
        v-model="formsStore.email"
        :rules="emailRules"
        v-slot="{ field, errors }"
      >
        <input type="email" v-bind="field" :class="{ tremor: errors[0] }" />
      </Field>
      <ErrorMessage name="email" class="error" />
    </label>
    <label for="password">
      Password
      <Field
        id="password"
        name="password"
        v-model="formsStore.password"
        :rules="passwordRules"
        v-slot="{ field, errors }"
      >
        <input type="password" v-bind="field" :class="{ tremor: errors[0] }" />
      </Field>
      <ErrorMessage name="password" class="error" />
    </label>
    <label for="confirmPassword">
      Confirm Password
      <Field
        id="confirmPassword"
        name="confirmPassword"
        v-model="formsStore.confirmPassword"
        :rules="passwordConfirmationRules"
        v-slot="{ field, errors }"
      >
        <input type="password" v-bind="field" :class="{ tremor: errors[0] }" />
      </Field>
      <ErrorMessage name="confirmPassword" class="error" />
    </label>
    <label for="name">
      Name
      <Field
        :rules="nameRules"
        name="name"
        id="name"
        v-model="formsStore.name"
        v-slot="{ field, errors }"
      >
        <input type="text" v-bind="field" :class="{ tremor: errors[0] }" />
      </Field>
      <ErrorMessage name="name" class="error" />
    </label>
    <label for="lastName">
      Last Name
      <Field
        :rules="lastNameRules"
        name="lastName"
        id="lastName"
        v-model="formsStore.lastName"
        v-slot="{ field, errors }"
      >
        <input type="text" v-bind="field" :class="{ tremor: errors[0] }" />
      </Field>
      <ErrorMessage name="lastName" class="error" />
    </label>
  </div>
</template>

<style scoped>
label {
  display: flex;
  flex-direction: column;
  position: relative;
}
.error {
  color: red;
  position: absolute;
  bottom: -8px;
}
</style>
