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
      <div class="infoBox">
        <h1>PSel</h1>
        <p>
          {{ `Welcome ${data.name} ${data.lastName} ` }}
        </p>
        <p>
          {{ data.cnpj ? `CNPJ: ${data.cnpj}` : `CPF: ${data.cpf}` }}
        </p>
      </div>
      <nav class="routerBox">
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
  <!-- <footer>
    <p>Footer</p>
  </footer> -->
</template>

<style>
.routerBox {
  display: flex;
  justify-content: space-around;
  width: 300px;
  align-items: center;
  font-size: 16px;
}

.infoBox {
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 16px;
  width: 500px;
}

.headerSpaceBetwen {
  margin-left: 16px;
  margin-right: 16px;
  display: flex;
  justify-content: space-between;
}

header {
  position: fixed;
  width: 100%;
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
