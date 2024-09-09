import type { NuxtApp } from "#app";
import type { PickFrom, KeysOf, AsyncDataOptions } from "#app/composables/asyncData";

export async function useData<T>(
  key: string,
  handler: (ctx?: NuxtApp) => Promise<T>,
  options?: AsyncDataOptions<T>
): Promise<ComputedRef<PickFrom<T, KeysOf<T>>>> {
  
  const { data, error } = await useAsyncData(key, handler, options)
  
  if (data.value === null || error.value !== null) {
    throw error.value
  }

  return computed(() => {
    if (data.value !== null)
      return data.value
    else if (error.value !== null)
      throw error.value
    else
      throw new Error("Data handler of useData() returned null without throwing an error.")
  })
}
