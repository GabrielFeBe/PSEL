import { ref, watchEffect, toValue, type Ref } from 'vue'

export function useFetch(url:Ref<string>, token:string) {
  const data = ref(null)
  const error = ref<RTCError | null>(null);
  
  watchEffect(async () => {
    // reset state before fetching..
    data.value = null
    error.value = null
    
    // resolve the url value synchronously so it's tracked as a
    // dependency by watchEffect()
    const urlValue = toValue(url)
    
    try {
      
    	const res = await fetch(urlValue , {
          method: 'GET',
          headers:{ 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            
          }
      })
      if (!res.ok) {
        throw new Error(res.statusText)
      }
	    data.value = await res.json()
    } catch (e : any) {
      error.value = e
    }
  })

  return { data, error }
}