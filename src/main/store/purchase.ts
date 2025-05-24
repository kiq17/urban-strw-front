import { ProductModel } from "@/domain/models";
import { defineStore } from "pinia";
import { Ref, ref } from "vue";

interface PurchaseProps {
  nome: string;
  preco: number;
  coverImg: string;
  size: string;
  id: number;
}

export const purchaseStore = defineStore("purchase", () => {
  const purchase: Ref<PurchaseProps> = ref({} as PurchaseProps);

  const savePurchase = (product: ProductModel, size: string) => {
    const { nome, preco, coverImg, id } = product;

    purchase.value = {
      id,
      nome,
      preco: preco,
      coverImg,
      size,
    };
  };

  return {
    purchase,
    savePurchase,
  };
});
