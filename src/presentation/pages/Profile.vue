<script lang="ts" setup>
import CardProfile from "@/presentation/components/ProfileComponents/CardProfile.vue";
import { makeLocalStorageAdapter } from "@/main/factories/cache/localStorage.factory";
import Header from "@/presentation/components/Header.vue";
import ProfileProductSkeleton from "@/presentation/components/shared/skeletons/ProfileProductSkeleton.vue";
import { getCart, getFavorites } from "@/services/api";
import { Product } from "@/services/interfaces/product/product";
import { onMounted, ref } from "vue";

let profileItens = ref([
  { nome: "Favoritos", active: true },
  { nome: "Carrinho", active: false },
  { nome: "Compras", active: false },
]);

interface res {
  created_at: Date;
  product: Product;
}

const loading = ref<boolean>(true);
const products = ref<res[]>([]);

async function activeItem(item) {
  loading.value = true;
  profileItens.value.map((i) => {
    if (i.nome == item.nome) {
      i.active = true;
    } else if (i.active) {
      i.active = false;
    }
  });

  if ("Favoritos" == item) {
    const data = await getFavorites();
    products.value = data;
  } else if ("Carrinho" == item) {
    const data = await getCart();
    products.value = data;
  } else {
    // call purchases
  }
  loading.value = false;
}
onMounted(async () => {
  loading.value = true;
  try {
    const data = await getFavorites();
    if (data instanceof Error) {
      makeLocalStorageAdapter().set("user", {});
      loading.value = false;
      return;
    }
    products.value = data;
  } catch (error) {}
  loading.value = false;
});
</script>

<template>
  <Header :storage="makeLocalStorageAdapter()" />
  <section class="max-w-[1200px] m-auto mt-32">
    <div class="flex flex-col gap-5">
      <nav>
        <ul class="flex gap-20 text-lg relative transition-all">
          <li
            v-for="item in profileItens"
            @click="activeItem(item)"
            class="cursor-pointer"
            :class="item.active ? 'ativo font-bold transition-all' : ''"
          >
            {{ item.nome }}
          </li>
          <div
            class="indicador absolute bg-yellow-300 w-12 h-1 rounded-full left-3 -bottom-1 transition-all duration-300"
          ></div>
        </ul>
      </nav>
      <ProfileProductSkeleton v-if="loading" />
      <Transition name="down">
        <div v-if="profileItens[0].active && !loading">
          <Transition name="left">
            <div
              class="flex flex-col mt-28 items-center justify-center gap-2"
              v-if="products.length == 0 && !loading"
            >
              <h3 class="font-bold text-4xl">
                Poxa, nenhum produto favoritado
              </h3>
              <p class="text-zinc-400">
                Não perca tempo e dê uma olhado nos prodrutos disponiveis
              </p>
              <RouterLink
                to="/produtos"
                class="bg-yellow-300 font-bold py-5 px-8 hover:bg-yellow-400 transition-colors duration-300 mt-12"
                >Produtos</RouterLink
              >
            </div>
            <div v-else>
              <CardProfile
                v-for="product in products"
                :product="product.product"
                :date="product.created_at"
                action="Favoritado em"
              />
            </div>
          </Transition>
        </div>
      </Transition>
      <Transition name="down">
        <div
          v-if="profileItens[2].active && !loading"
          class="flex flex-col mt-28 items-center justify-center gap-2"
        >
          <h3 class="font-bold text-4xl">Você ainda não fez nenhuma compra</h3>
          <p class="text-zinc-400">
            Não perca tempo e dê uma olhado nos prodrutos disponiveis
          </p>
          <RouterLink
            to="/produtos"
            class="bg-yellow-300 font-bold py-5 px-8 hover:bg-yellow-400 transition-colors duration-300 mt-12"
            >Produtos</RouterLink
          >
        </div>
      </Transition>
      <Transition name="left">
        <div
          v-if="profileItens[1].active && !loading"
          class="flex justify-between mt-10"
        >
          <div class="absolute flex justify-between items-center bg-white py-10 bottom-0 w-[1200px]">
            <div>
              <p class="text-lg">Itens no carrinho: <span class="font-bold text-xl">14 itens</span></p>
              <p class="text-lg">Total: <span class="font-bold text-xl">R$1000.00</span></p>
            </div>
            <button class="bg-yellow-300 font-bold py-5 px-8 hover:bg-yellow-400 transition-colors duration-300">Finalizar compra</button>
          </div>
        </div>
      </Transition>
      <!-- <div v-for="item in profileItens">
        <Transition name="left">
          <div>
            <CardProfile
              v-for="product in products"
              v-if="item.nome == 'Carrinho' && item.active && !loading"
              :date="product.created_at"
              :image="product.coverImg"
              :name="product.nome"
              :price="product.preco"
            />
          </div>
        </Transition>
      </div> -->
    </div>
  </section>
</template>

<style scoped>
.left-enter-active,
.left-leave-active {
  transition: all 0.5s ease;
}

.left-enter-from {
  opacity: 0;
  transform: translateX(-60px);
}

.left-leave-to {
  opacity: 0;
}

.down-enter-active,
.down-leave-active {
  transition: all 0.5s ease;
}

.down-enter-from {
  opacity: 0;
  transform: translateY(-60px);
}

.down-leave-to {
  opacity: 0;
}

ul li:nth-child(1).ativo ~ .indicador {
  transform: translateX(calc(70px * 0));
}

ul li:nth-child(2).ativo ~ .indicador {
  transform: translateX(calc(78px * 2));
  width: 3rem;
}

ul li:nth-child(3).ativo ~ .indicador {
  transform: translateX(calc(156px * 2));
  width: 3rem;
}
</style>
