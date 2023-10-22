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
const updateEmail = (event: Event) => {
  if (event.target) {
    formsStore.email = (event.target as HTMLInputElement).value
  }
}
const updatePassword = (event: Event) => {
  if (event.target) {
    formsStore.password = (event.target as HTMLInputElement).value
  }
}
const updateConfirmationPassword = (event: Event) => {
  if (event.target) {
    formsStore.confirmPassword = (event.target as HTMLInputElement).value
  }
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
        :value="formsStore.email"
        @input="updateEmail($event)"
        :rules="emailRules"
      />
      <ErrorMessage name="email" class="error" />
    </label>
    <label for="password">
      Password
      <Field
        type="password"
        id="password"
        name="password"
        :value="formsStore.password"
        @input="updatePassword($event)"
        :rules="passwordRules"
      />
      <ErrorMessage name="password" class="error" />
    </label>
    <label for="confirmPassword">
      Confirm Password
      <Field
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        :value="formsStore.confirmPassword"
        @input="updateConfirmationPassword($event)"
        :rules="passwordConfirmationRules"
      />
      <ErrorMessage name="confirmPassword" class="error" />
    </label>
    <label for="name">
      Name
      <Field :rules="nameRules" type="text" name="name" id="name" v-model="formsStore.name" />
      <ErrorMessage name="name" class="error" />
    </label>
    <label for="lastName">
      Last Name
      <Field
        :rules="lastNameRules"
        type="text"
        name="lastName"
        id="lastName"
        v-model="formsStore.lastName"
      />
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
