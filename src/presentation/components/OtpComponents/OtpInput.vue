<script setup lang="ts">
import { onMounted, ref, watch } from "vue";

const RE_DIGIT = /^\d+$/;

interface Props {
  value: string;
  valueLen: number;
  onChange: (value: string) => void;
}

const props = defineProps<Props>();

const valueItems = ref<string[]>([]);

watch(
  () => props.value,
  () => {
    generateValueItems();
  }
);

onMounted(() => {
  generateValueItems();
});

const generateValueItems = () => {
  const valueArray = props.value.split("");
  console.log(valueArray)
  const items: string[] = [];

  for (let i = 0; i < props.valueLen; i++) {
    const char = valueArray[i];
    
    if (RE_DIGIT.test(char)) {
      items.push(char);
    } else {
      items.push("");
    }
  }

  valueItems.value = items;
};

const focusToNextInput = (target: HTMLElement) => {
  const nextElementSibling =
    target.nextElementSibling as HTMLInputElement | null;

  if (nextElementSibling) {
    nextElementSibling.focus();
  }
};

const focusToPrevInput = (target: HTMLElement) => {
  const previousElementSibling =
    target.previousElementSibling as HTMLInputElement | null;

  if (previousElementSibling) {
    previousElementSibling.focus();
  }
};

const handleChange = (e: Event, i: number) => {
  const target = e.target as HTMLInputElement;
  let targetValue = target.value.trim();
  if(!/^[0-9]*$/.test(targetValue)) {
    target.value = ""
  }
  
  const isTargetValueDigit = RE_DIGIT.test(targetValue);
  
  if (!isTargetValueDigit && targetValue !== "") return;

  const nextInputEl = target.nextElementSibling as HTMLInputElement | null;

  if (!isTargetValueDigit && nextInputEl && nextInputEl.value !== "") return;

  targetValue = isTargetValueDigit ? targetValue : " ";

  const targetValueLength = targetValue.length;
  const isLastInput = i === props.valueLen - 1;

  if (targetValueLength === 1) {
    const newValue =
      props.value.substring(0, i) + targetValue + props.value.substring(i + 1);

    props.onChange(newValue);

    if (!isTargetValueDigit) return;

    if (isLastInput) {
      // Fetch API here
      console.log("fetch API");
    } else {
      focusToNextInput(target);
    }
  } else if (targetValueLength === props.valueLen) {
    const prev = target.previousElementSibling as HTMLInputElement | null;
    if(prev?.value){
      target.value = targetValue[i]
    } else{
      target.value = targetValue[i]
    }
    props.onChange(targetValue);
    target.blur();
  } else if(targetValueLength > 1 && targetValueLength < props.valueLen){
    target.value = ""
  }
};
// provalvelmente o erro está dentro do OTP component ele está executando 
// o change idepenten das condições dentro do handlechange

const handleKeyDown = (e: KeyboardEvent, i: number) => {
  const { key } = e;
  const target = e.target as HTMLInputElement;

  if (key === "ArrowRight" || key === "ArrowDown") {
    e.preventDefault();
    return focusToNextInput(target);
  }

  if (key === "ArrowLeft" || key === "ArrowUp") {
    e.preventDefault();
    return focusToPrevInput(target);
  }

  const targetValue = target.value;

  target.setSelectionRange(0, targetValue.length);

  if (key !== "Backspace" || targetValue !== "") {
    return;
  }

  focusToPrevInput(target);
};

const handleFocus = (e: Event) => {
  const target = e.target as HTMLInputElement;

  const prevInput = target.previousElementSibling as HTMLInputElement | null;
  if (prevInput && prevInput.value === "") {
    return prevInput.focus();
  }

  target.setSelectionRange(0, target.value.length);
};
</script>

<template>
  <div class="flex justify-center items-center m-auto gap-4">
    <input
      v-for="(digit, idx) in valueItems"
      :key="idx"
      :autofocus="idx == 0"
      type="text"
      pattern="\d{1}"
      inputmode="numeric"
      autocomplete="one-time-code"
      :maxlength="valueLen"
      class="rounded w-12 h-12 text-xl leading-7 font-semibold text-center text-gray-500 bg-transparent duration-300 border-2 border-zinc-400 focus:border-zinc-700 transition-all outline-none"
      :value="digit"
      @input="handleChange($event, idx)"
      @keydown="handleKeyDown($event, idx)"
      @focus="handleFocus($event)"
    />
  </div>
</template>


