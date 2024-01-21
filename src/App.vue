<script setup lang="ts">
import { ref } from "vue";
import StepOne from "./components/StepOne.vue";
import StepTwo from "./components/StepTwo.vue";
import StepThree from "./components/StepThree.vue";
import { WordsQueue } from "./Types";

const wordsList = ref<Array<string>>([]);
const wordsQueue = ref<Array<WordsQueue>>([]);
const dictionariesList = ref<Array<string>>(["oxford", "cambridge"]);
const step = ref<number>(1);

function nextStep() {
  step.value++;
}
</script>

<template>
  <div class="isolate bg-white px-6 py-24 sm:py-32 lg:px-8 mx-auto max-w-2xl">
    <div>
      <div class="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        aria-hidden="true">
        <div
          class="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
      </div>
      <TransitionGroup name="list" tag="div">
        <StepOne v-if="step === 1" v-on:words-updated="(words) => { wordsList = words }"
          v-on:dictionaries-updated="(dictionaries) => { dictionariesList = dictionaries }" @submit="nextStep"></StepOne>
        <StepTwo v-if="step === 2" :words="wordsList" :dics="dictionariesList" @completed="(words)=>{wordsQueue = words}" @submit="nextStep"></StepTwo>
        <StepThree v-if="step === 3" :words="wordsQueue"></StepThree>
      </TransitionGroup>
    </div>
  </div>
</template>

<style>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  position: absolute;
  opacity: 0;
  transform: translateX(30px);
}
</style>