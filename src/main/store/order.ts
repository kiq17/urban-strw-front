import { defineStore } from "pinia";
import { ref } from "vue";

interface orderProps {
  fullName: string;
  email: string;
  cpf: string;
  endereco: string;
  cep: string;
  cidade: string;
  estado: string;
  bairro: string;
  numero: number;
  complemento: string;
  cvv: string;
  mes: string;
  nome: string;
  numeroCard: string;
  ano: string;
}

export const orderStore = defineStore("orders", () => {
  const order = ref<orderProps>({} as orderProps);

  const saveData = (data: Record<string, string | number>) => {
    console.log(data)
    for (const [key, value] of Object.entries(data)) {
      order.value[key] = value;
    }
  };

  return {
    order,
    saveData,
  };
});
