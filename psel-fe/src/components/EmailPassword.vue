<script setup lang="ts">
import { formsStore } from '@/stores/Form'
import type { Account } from '@/types/Account'
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
      <input
        type="email"
        name="email"
        id="email"
        :value="formsStore.email"
        @input="updateEmail($event)"
      />
    </label>
    <label for="password">
      Password
      <input
        type="password"
        id="password"
        name="password"
        :value="formsStore.password"
        @input="updatePassword($event)"
      />
    </label>
    <label for="confirmPassword">
      Confirm Password
      <input
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        :value="formsStore.confirmPassword"
        @input="updateConfirmationPassword($event)"
      />
    </label>
    <label for="name">
      Name
      <input type="text" name="name" id="name" v-model="formsStore.name" />
    </label>
    <label for="lastName">
      Last Name
      <input type="text" name="lastName" id="lastName" v-model="formsStore.lastName" />
    </label>
  </div>
</template>

<style scoped>
label {
  display: flex;
  flex-direction: column;
}
</style>
