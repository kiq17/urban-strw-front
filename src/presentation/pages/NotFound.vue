<script lang="ts" setup></script>

<template>
  <main
    class="h-screen w-full flex flex-col justify-center items-center bg-zinc-600"
  >
    <h1 class="text-9xl font-extrabold text-white tracking-widest">404</h1>
    <div class="bg-yellow-300 px-2 text-sm rounded rotate-12 absolute">
      Página não encontrada
    </div>
    <button class="mt-5">
      <RouterLink to="/"
        class="relative inline-block text-sm font-medium text-yellow-300 group active:text-yellot-500 focus:outline-none focus:ring"
      >
        <span
          class="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-yellow-300 group-hover:translate-y-0 group-hover:translate-x-0"
        ></span>

        <span
          class="relative block px-8 py-3 bg-zinc-500 border border-current"
        >
          Voltar
        </span>
      </RouterLink>
    </button>
  </main>
</template>
