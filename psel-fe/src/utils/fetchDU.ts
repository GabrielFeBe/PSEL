import type { Account } from '@/types/Account';
import type { method } from '@/types/Method';
import { ref, toValue,type Ref } from 'vue';

export async function useFetchDU(url: Ref<string>, method: method = 'GET', body?: any , token?: string,) {
  const data = ref<Account | null>(null);
  const error = ref<string | null>(null);

  await new Promise<void>((resolve) => {
    data.value = null;
    error.value = null;

    const urlValue = toValue(url);

    const requestOptions: RequestInit = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };

    if (body !== undefined) {
      requestOptions.body = JSON.stringify(body);
    }

    fetch(urlValue, requestOptions)
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        const valor: Account = await res.json();
        data.value = valor;
        resolve();
      })
      .catch((e) => {
        console.log(e)
        error.value = e.message;
        resolve();
      });
  });

  return { data, error };
}
