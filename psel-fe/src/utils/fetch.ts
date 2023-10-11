import type { method } from '@/types/Method';
import { ref, watchEffect, toValue, type Ref } from 'vue'

export function useFetch <T> (url:Ref<string>, token:string , method:method = 'GET') {
  const data = ref < T | null>(null)
  const error = ref<RTCError | null>(null);
  
  watchEffect(async () => {
    data.value = null
    error.value = null
    
    const urlValue = toValue(url)
    
    const requestOptions: RequestInit = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };

    try {
      
    	const res = await fetch(urlValue ,requestOptions)
      if (!res.ok) {
        throw new Error(res.statusText)
      }
      const valor = await res.json()
	    data.value = valor
    } catch (e : any) {
      error.value = e.message
    }
  })
  return { data, error }
}