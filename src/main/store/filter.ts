import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import { Order } from "@/domain/usecases/loadProductsWithFilter.case";

export const filterStore = defineStore("users", () => {
  const filter: Ref = ref({
    order: "relevante",
  });

  const saveOrder = (newOrder: Order) => {
    filter.value = { order: newOrder };
  };

  return {
    filter,
    saveOrder,
  };
});
