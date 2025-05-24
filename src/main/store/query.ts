import { Order } from "@/domain/usecases";
import { defineStore } from "pinia";
import { Prop, ref } from "vue";

interface Props {
  category?: string;
  name?: string;
  price?: string;
  order?: Order;
  page?: number;
  per_page?: number;
}

export const queryStore = defineStore("query", () => {
  const query = ref<Props>();

  const saveQuery = (value: Props) => {
    query.value = value;
  };

  return {
    query,
    saveQuery,
  };
});
