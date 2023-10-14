<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'
import { useFetch } from './utils/fetch'
import type { Account } from './types/Account'
import { getToken } from './utils/GetCookies'

const url = ref('http://localhost:3000/accounts')
const { data } = useFetch<Account>(url, getToken() as string)
</script>

<template>
  <header v-if="data">
    <div class="headerSpaceBetwen">
      <div>
        <h1>PSel</h1>
        <p>
          {{ `Welcome ${data.name} ${data.lastName} ` }}
        </p>
        <p>
          {{ data.cnpj ? `CNPJ: ${data.cnpj}` : `CPF: ${data.cpf}` }}
        </p>
      </div>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/account">Account</RouterLink>
        <RouterLink to="/statement">BankStatement</RouterLink>
        <RouterLink to="/logout">Logout</RouterLink>
      </nav>
    </div>
  </header>
  <header v-else>
    <div class="headerSpaceBetwen">
      <div>
        <h1>PSel</h1>
      </div>
      <nav>
        <RouterLink to="/">Home</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
  <footer>
    <p>Footer</p>
  </footer>
</template>

<style>
.logoSmall {
  width: 50px;
  height: 50px;
}
.headerSpaceBetwen {
  display: flex;
  justify-content: space-between;
}

input {
  width: 300px;
  height: 10px;
  padding: 1rem;
  border: 1px solid var(--color-border);
  border-radius: 0.25rem;
  margin-bottom: 1rem;
}
label {
  width: 100%;
}
</style>
