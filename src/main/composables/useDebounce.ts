import { Ref, ref, watch } from "vue";

export function useDebounce(nome: Ref, delay: number = 300) {
  const debounceValue = ref<string>("");

  watch(debounceValue, async () => {
      const t = setTimeout(() => {
          debounceValue.value = nome.value;
        }, delay);
    clearTimeout(t);
  });

  return debounceValue.value;
}
