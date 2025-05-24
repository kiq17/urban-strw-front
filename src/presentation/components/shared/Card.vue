<script setup lang="ts">
import { useModal } from "@/main/composables/useModal";
import { LocalStorageAdapter } from "@/infra/cache/localStorage.adapter";
import { PlusIcon } from "@heroicons/vue/24/solid";
import { ref, watch } from "vue";

interface Props {
    title: string;
    price: number;
    img: string;
    alt: string;
    id: string;
    slug: string;
    storage: LocalStorageAdapter;
}

const imgHtml = ref<HTMLImageElement>();
const loading = ref<boolean>(true);


watch(imgHtml, () => {
    if (imgHtml.value) {
        if (imgHtml.value.complete) {
            loading.value = false;
        } else {
            imgHtml.value.addEventListener("load", () => loading.value = false);
        }
    }
})

const props = defineProps<Props>();

function handleClick() {
  const { openModal } = useModal();
  const data = props.storage.get("user");

  if (data) return;

  openModal()
}

</script>

<template>
    <div class="card w-72 h-80">
        <RouterLink :to="'/produto/' + props.slug">
            <div class="img w-full h-[85%]  group p-12" :class="loading ? 'load bg-zinc-300 animate-pulse' : 'bg-white'">
                <img class="w-full h-full group-[.load]:invisible" :src="props.img" :alt="props.alt" loading="lazy"
                    ref="imgHtml">
            </div>
        </RouterLink>

        <div class="w-full h-[15%] flex items-center border-b-2 border-b-black gap-3">
            <p class="font-extrabold">
                {{ props.title }}
            </p>
            <p>
                {{ props.price.toLocaleString('pt-BR', { currency: 'BRL', style: 'currency' }) }}
            </p>
            <button @click="handleClick" title="Adicionar ao carrinho" class="text-lg ml-auto group">
                <PlusIcon class="group-[.loading]:invisible w-6 h-6 "/>
            </button>
        </div>
    </div>
</template>