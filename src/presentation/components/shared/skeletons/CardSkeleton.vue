<script setup lang="ts">
</script>

<template>
    <div class="card w-72 h-80 max-sm:m-auto">

        <div class="img w-full h-[85%] bg-zinc-300 animate-pulse group"></div>


        <div class="w-full h-[15%] flex items-center border-b-2 border-b-zinc-300 animate-pulse gap-3">
            <p class="bg-zinc-300 animate-pulse w-36 h-6 rounded-full"></p>
            <p class="bg-zinc-300 animate-pulse w-11 h-6 rounded-full"></p>

            <button title="Adicionar ao carrinho" class="loading animate-pulse group ml-auto bg-zinc-300 rounded-full px-2 cursor-default">
                <i class="fa-solid fa-plus group-[.loading]:invisible"></i>
            </button>
        </div>
    </div>
</template>