<script setup lang="ts">
import { useModal } from "@/main/composables/useModal";
import { LocalStorageAdapter } from "@/infra/cache/localStorage.adapter";
import { toggleCart } from "@/services/api";

interface Props {
  storage: LocalStorageAdapter;
}

const { storage } = defineProps<Props>();

async function handleClick(id: number) {
  const { openModal } = useModal();
  const data = storage.get("user");

  if(id == 0) return

  if (data) {
    await toggleCart(id)
    return
  }

  openModal();
}
</script>

<template>
  <section
    class="max-w-[1200px] h-max m-auto mb-16 flex items-center flex-col justify-center p-3 max-lg:hidden"
  >
    <div
      class="flex max-base:justify-between max-base:w-[768px] max-base:my-16"
    >
      <div class="flex gap-5 max-base:hidden">
        <div class="flex flex-col gap-5">
          <div class="w-full self-start h-[50%] flex-col">
            <div class="img w-full self-start h-[90%]">
              <img
                class="w-full h-full object-cover"
                src="../assets/CARHARTTWIP.png"
                alt="Camisa Carhartt"
                loading="lazy"
              />
            </div>
            <div
              class="w-full h-[7%] flex items-center border-b-2 border-b-black gap-3"
            >
              <p class="font-extrabold">T-shirt, Carhartt</p>
              <p>R$ 150</p>
              <button
                @click="handleClick(11)"
                title="Adicionar ao carrinho"
                class="text-lg ml-auto"
              >
                <i class="fa-solid fa-plus"></i>
              </button>
            </div>
          </div>
          <div class="w-[300px] h-[50%] flex-col">
            <div class="img w-full h-[91%]">
              <img
                class="w-full h-full object-cover"
                src="../assets/NikeKillshotII1.png"
                alt="Tênis Nike"
                loading="lazy"
              />
            </div>
            <div
              class="w-full h-[68px] flex items-center border-b-2 border-b-black gap-3"
            >
              <p class="font-extrabold">Sneakers, Nike</p>
              <p>R$ 300</p>
              <button
                @click="handleClick(12)"
                title="Adicionar ao carrinho"
                class="text-lg ml-auto"
              >
                <i class="fa-solid fa-plus"></i>
              </button>
            </div>
          </div>
        </div>

        <div class="flex flex-grow gap-5 flex-wrap justify-between">
          <div class="flex-grow">
            <div class="img w-full h-[83%] bg-black">
              <img
                class="w-full h-full object-cover"
                src="../assets/StussyMensLimeSpread-collarBrand-patchCotton-canvasJacketXL.png"
                alt="Jaqueta Stussy"
                loading="lazy"
              />
            </div>
            <div
              class="w-full h-[13%] flex items-center border-b-2 border-b-black gap-3"
            >
              <p class="font-extrabold">Jacket, Stüssy...</p>
              <p>R$ 700</p>
              <button
                @click="handleClick(9)"
                title="Adicionar ao carrinho"
                class="text-lg ml-auto"
              >
                <i class="fa-solid fa-plus"></i>
              </button>
            </div>
          </div>
          <div class="card w-[300px]">
            <div class="img w-full h-[83%]">
              <img
                class="w-full h-full object-cover"
                src="../assets/balaclava.png"
                alt="Balaclava Stussy"
                loading="lazy"
              />
            </div>

            <div
              class="w-full h-[13%] flex items-center border-b-2 border-b-black gap-3"
            >
              <p class="font-extrabold">Stüssy Balaclava</p>
              <p>R$ 100</p>
              <button
                @click="handleClick(0)"
                title="Adicionar ao carrinho"
                class="text-lg ml-auto"
              >
                <i class="fa-solid fa-plus"></i>
              </button>
            </div>
          </div>
          <div class="card w-full h-[720px] col-span-2">
            <div class="img w-full h-[90%] bg-black">
              <img
                class="w-full h-full object-cover"
                src="../assets/Pin.png"
                alt="Tênis Nike"
                loading="lazy"
              />
            </div>

            <div
              class="w-full h-[10%] flex items-center border-b-2 border-b-black gap-3"
            >
              <p class="font-extrabold">Jacket, The North Face</p>
              <p>R$ 850</p>
              <button
                @click="handleClick(10)"
                title="Adicionar ao carrinho"
                class="text-lg ml-auto"
              >
                <i class="fa-solid fa-plus"></i>
              </button>
            </div>
          </div>
          <div class="card w-[300px]">
            <div class="img w-full h-[85%] bg-black">
              <img
                class="w-full h-full object-cover"
                src="../assets/VintageLacoste.png"
                alt="Lacoste Jacket Vintage"
                loading="lazy"
              />
            </div>

            <div
              class="w-full h-[12%] flex items-center border-b-2 border-b-black gap-3"
            >
              <p class="font-extrabold">Jacket, Lacoste</p>
              <p>R$ 500</p>
              <button
                @click="handleClick(0)"
                title="Adicionar ao carrinho"
                class="text-lg ml-auto"
              >
                <i class="fa-solid fa-plus"></i>
              </button>
            </div>
          </div>
          <div class="flex-grow">
            <div class="img w-full h-[85%] bg-black">
              <img
                class="w-full h-full object-cover"
                src="../assets/TheNorthFace.png"
                alt="The North Facce Jacket"
                loading="lazy"
              />
            </div>

            <div
              class="w-full h-[12%] flex items-center border-b-2 border-b-black gap-3"
            >
              <p class="font-extrabold">Polo The North Face</p>
              <p>R$ 250</p>
              <button
                @click="handleClick(0)"
                title="Adicionar ao carrinho"
                class="text-lg ml-auto"
              >
                <i class="fa-solid fa-plus"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="hidden max-base:flex max-base:flex-wrap max-base:gap-5">
        <div class="w-80 h-80 flex-col">
          <div class="img w-full self-start h-full">
            <img
              class="w-full h-full object-cover"
              src="../assets/CARHARTTWIP.png"
              alt="Camisa Carhartt"
              loading="lazy"
            />
          </div>
          <div
            class="w-full h-[20%] flex items-center border-b-2 border-b-black gap-3"
          >
            <p class="font-extrabold">T-shirt, Carhartt</p>
            <p>R$ 150</p>
            <button
              @click="handleClick(11)"
              title="Adicionar ao carrinho"
              class="text-lg ml-auto"
            >
              <i class="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>
        <div class="w-80 h-80 flex-col">
          <div class="img w-full h-full">
            <img
              class="w-full h-full object-cover"
              src="../assets/NikeKillshotII1.png"
              alt="Tênis Nike"
              loading="lazy"
            />
          </div>
          <div
            class="w-full h-[20%] flex items-center border-b-2 border-b-black gap-3"
          >
            <p class="font-extrabold">Sneakers, Nike</p>
            <p>R$ 300</p>
            <button
              @click="handleClick(12)"
              title="Adicionar ao carrinho"
              class="text-lg ml-auto"
            >
              <i class="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>
        <div class="img w-full h-[600px] mt-16">
          <img
            class="w-full h-full object-cover"
            src="../assets/StussyMensLimeSpread-collarBrand-patchCotton-canvasJacketXL.png"
            alt="Balaclava Stussy"
            loading="lazy"
          />
        </div>

        <div
          class="w-full h-[7%] flex items-center border-b-2 border-b-black gap-3"
        >
          <p class="font-extrabold">Jacket, Stüssy...</p>
          <p>R$ 700</p>
          <button
            @click="handleClick(9)"
            title="Adicionar ao carrinho"
            class="text-lg ml-auto"
          >
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>
      <a
        href="/produtos"
        class="ml-5 flex self-start items-center gap-5 py-4 px-8 uppercase max-w-[176px] font-bold text-lg border-2 border-yellow-300"
        ><span><i class="fa-solid fa-chevron-right"></i></span
      ></a>
    </div>
  </section>
</template>
