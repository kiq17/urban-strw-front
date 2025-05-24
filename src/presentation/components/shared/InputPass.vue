<script lang="ts" setup>
import { ref } from 'vue';


interface inputProps {
    label: string
    value: string
    handleChange: (value: string) => void
}

const props = defineProps<inputProps>()
const input = ref(null)
const checkType = ref<boolean>()

const focusInput = () => {
    if (input.value) {
        (input.value as HTMLInputElement).focus()
    }
}


const changeType = (e: Event)=>{
    e.stopPropagation()
    if (input.value) {
        if((input.value as HTMLInputElement).type == "password"){
            (input.value as HTMLInputElement).type = "text";
            checkType.value = true
        } else{
            (input.value as HTMLInputElement).type = "password";
            checkType.value = false
        }
    }
}

</script>

<template>
    <div class="input-box relative w-80 transition-all h-14 rounded-md cursor-text border-2 border-zinc-400"
        @click="focusInput">
        <input
            class="w-full relative top-5 peer outline-none border-none p-2 h-7 placeholder-transparent bg-transparent"
            type="password" placeholder="a" autoComplete="off" :value="value" ref="input"
            @input="handleChange(($event.target as HTMLInputElement).value)"
            />

        <label
            class="transition-all relative bottom-7 left-2 peer-focus:text-yellow-300 text-sm text-zinc-300 pointer-events-none peer-focus:bottom-7 peer-focus:text-sm peer-placeholder-shown:bottom-4 peer-placeholder-shown:text-base">
            {{ props.label }}
        </label>
        <i v-if="checkType" class="fa-solid fa-eye absolute right-4 bottom-4 cursor-pointer" @click="changeType"></i>
        <i v-else class="fa-solid fa-eye-slash absolute right-4 bottom-4 cursor-pointer" @click="changeType"></i>
    </div>
</template>

<style scoped>
    .input-box:has(input[type="text"]:focus), .input-box:has(input[type="password"]:focus){
    border-color: #fde047;
}
</style>
