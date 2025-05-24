<script lang="ts" setup>
import { InputHTMLAttributes, ref } from 'vue';


interface inputProps extends InputHTMLAttributes {
    label: string
    value: string
    handleChange: (value: string) => void
    mask?: "cpf" | "cnpj" | "cep" | "cartao" | "name"
}
const props = defineProps<inputProps>()
const input = ref(null)
const active = ref<boolean>(false)

const focusInput = () => {
    if (input.value) {
        (input.value as HTMLInputElement).focus()
    }
}

const filterMask = (text: string) => {
    // D maiusculo significa qualquer caracter que nao seja numero
    // () usado para criar um grupo7
    // - final da string
    // $ até o final
    // traço significa cuptra com traço \d+?$ para substituir todo o final da regex
    switch (props.mask) {
        case "cpf":
            return text.replace(/\D/g, '')
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d{1,2})/, '$1-$2')
                .replace(/(-\d{2})\d+?$/, '$1')
        case "cartao":
            return text.replace(/\D/g, '')
                .replace(/(\d{4})(\d)/, '$1 $2')
                .replace(/(\d{4})(\d)/, '$1 $2')
                .replace(/(\d{4})(\d)/, '$1 $2')
        case "cep":
            return text.replace(/\D/g, '')
                .replace(/(\d{5})(\d)/, '$1-$2')
                .replace(/(-\d{3})\d+?$/, '$1')
        case "name":
            return text.replace(/\d/g, "a")
        default:
            return text
    }
}
</script>

<template>
    <div class="input-box relative w-full transition-all h-14 rounded-md cursor-text border-2 " @click="focusInput"
        :class="[active ? 'border-yellow-300' : 'border-zinc-400']">

        <input class="w-full relative top-5 peer outline-none border-none p-2 h-7 placeholder-transparent bg-transparent"
        :class="props.class"
            type="text" placeholder=" " autoComplete="off" :value="filterMask(value)" ref="input"
            @input="handleChange(($event.target as HTMLInputElement).value)"
             />

        <label
            class="transition-all relative bottom-7 left-2 peer-focus:text-yellow-300 text-sm text-zinc-300 pointer-events-none peer-focus:bottom-7 peer-focus:text-sm peer-placeholder-shown:bottom-4 peer-placeholder-shown:text-base">
            {{ props.label }}
        </label>
    </div>
</template>

<style scoped>
.input-box:has(input[type="text"]:focus),
.input-box:has(input[type="password"]:focus) {
    border-color: #fde047;
}
</style>