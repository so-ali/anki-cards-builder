<script setup lang="ts">
import { defineProps, onMounted, ref, defineEmits } from 'vue';
import { Word, WordsQueue } from '../Types';

const props = defineProps({
    words: Array<WordsQueue>
});

const emit = defineEmits(["build"]);

const selectedWords = ref<Array<WordsQueue> | undefined>([]);
const currentWord = ref<number>(0);

function setWordValue(word: WordsQueue, key: string, cambridge: boolean = true) {
    if (word.selected && typeof word.selected !== 'undefined' && typeof word.selected[key as keyof Word] !== 'undefined') {
        word.selected[key as keyof Word] = JSON.parse(JSON.stringify(cambridge ? word.cambridge[key as keyof Word] : word.oxford[key as keyof Word]));
    }
}

onMounted(() => {
    selectedWords.value = props.words;
});
</script>

<template>
    <div>
        <div class="mx-auto max-w-2xl text-center">
            <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Choose better</h2>
            <p class="mt-2 text-lg leading-8 text-gray-600">Automatic card builder for Anki application.</p>
        </div>

        <div class="mx-auto w-full mt-10 max-w-2xl border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none">
            <TransitionGroup name="list" tag="div" v-for="word, index in selectedWords">
            <div v-if="currentWord === index" v-key="index">
                <article class="w-full flex flex-col items-start justify-between bg-white p-10 shadow-md rounded-md">
                    <div class="w-full mb-5">
                        <label for="word" class="block text-sm font-semibold leading-6 text-gray-900">Word</label>
                        <div class="mt-2.5">
                            <input type="text" id="word" v-model="word.word"
                                class="block w-full rounded-md border-0 px-3.5 py-2 text-purple-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        </div>
                    </div>
                    <div class="w-full">
                        <div class="w-full mb-5">
                            <div class="flex flex-row w-full">
                                <label for="cam-type"
                                    class="text-sm font-semibold leading-6 text-gray-900 flex-1">Type</label>

                                <div class="flex gap-5">
                                    <label><input type="radio" checked :name="word.word + '-type'"
                                            v-on:change.selected="setWordValue(word, 'type')">
                                        Cambridge</label>
                                    <label><input type="radio" :name="word.word + '-type'"
                                            v-on:change.selected="setWordValue(word, 'type', false)"> Oxford</label>
                                </div>
                            </div>

                            <div class="mt-2.5">
                                <input type="text" id="cam-type" v-model="word.selected.type"
                                    class="block w-full rounded-md border-0 px-3.5 py-2 text-blue-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                            </div>
                        </div>
                        <div class="w-full mb-5">
                            <div class="flex flex-row w-full">
                                <label for="cam-desc"
                                    class="block text-sm font-semibold leading-6 text-gray-900 flex-1">Description</label>

                                <div class="flex gap-5">
                                    <label><input type="radio" checked :name="word.word + '-description'"
                                            v-on:change.selected="setWordValue(word, 'description')">
                                        Cambridge</label>
                                    <label><input type="radio" :name="word.word + '-description'"
                                            v-on:change.selected="setWordValue(word, 'description',false)">
                                        Oxford</label>
                                </div>
                            </div>
                            <div class="mt-2.5">
                                <textarea rows="8" id="cam-desc" v-model="word.selected.description"
                                    class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                            </div>
                        </div>
                        <div class="w-full mb-5">
                            <div class="flex flex-row w-full">
                                <label for="cam-synonyms"
                                    class="block text-sm font-semibold leading-6 text-gray-900 flex-1">Synonyms</label>

                                <div class="flex gap-5">
                                    <label><input type="radio" checked :name="word.word + '-synonyms'"
                                            v-on:change.selected="setWordValue(word, 'synonyms')">
                                        Cambridge</label>
                                    <label><input type="radio" :name="word.word + '-synonyms'"
                                            v-on:change.selected="setWordValue(word, 'synonyms', false)">
                                        Oxford</label>
                                </div>
                            </div>
                            <div class="mt-2.5">
                                <textarea rows="3" id="cam-synonyms" v-model="word.selected.synonyms"
                                    class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                            </div>
                        </div>
                        <div class="w-full mb-5">
                            <div class="flex flex-row w-full">
                                <div class="block text-sm font-semibold leading-6 text-gray-900 flex-1">US Sound</div>
                                <div class="flex gap-5">
                                    <label><input type="radio" checked :name="word.word + '-usSound'"
                                            v-on:change.selected="setWordValue(word, 'usSound')">
                                        Cambridge</label>
                                    <label><input type="radio" :name="word.word + '-usSound'"
                                            v-on:change.selected="setWordValue(word, 'usSound', false)">
                                        Oxford</label>
                                </div>
                            </div>

                            <div class="mt-2.5">
                                <audio v-if="word.cambridge.usSound && word.cambridge.usSound === word.selected.usSound"
                                    controls="true" class="w-full">
                                    <source type="audio/mpeg" :src="word.cambridge.usSound" />
                                </audio>
                                <audio v-if="word.oxford.usSound && word.oxford.usSound === word.selected.usSound"
                                    controls="true" class="w-full">
                                    <source type="audio/mpeg" :src="word.oxford.usSound" />
                                </audio>
                            </div>
                        </div>
                        <div class="w-full">
                            <div class="flex flex-row w-full">
                                <div class="block text-sm font-semibold leading-6 text-gray-900 flex-1">UK Sound</div>
                                <div class="flex gap-5">
                                    <label><input type="radio" checked :name="word.word + '-ukSound'"
                                            v-on:change.selected="setWordValue(word, 'ukSound')">
                                        Cambridge</label>
                                    <label><input type="radio" :name="word.word + '-ukSound'"
                                            v-on:change.selected="setWordValue(word, 'ukSound', false)">
                                        Oxford</label>
                                </div>
                            </div>
                            <div class="mt-2.5">
                                <div class="mt-2.5">
                                    <audio v-if="word.cambridge.ukSound && word.cambridge.ukSound === word.selected.ukSound"
                                        controls="true" class="w-full">
                                        <source type="audio/mpeg" :src="word.cambridge.ukSound" />
                                    </audio>
                                    <audio v-if="word.oxford.ukSound && word.oxford.ukSound === word.selected.ukSound"
                                        controls="true" class="w-full">
                                        <source type="audio/mpeg" :src="word.oxford.ukSound" />
                                    </audio>
                                </div>
                            </div>
                        </div>
                    </div>

                </article>
            </div>
            </TransitionGroup>
        </div>

        <div class="flex mt-10 gap-2">
                <button v-on:click="() => { currentWord--; }" v-if="currentWord > 0" class="rounded-md bg-red-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Previous Word</button>
            
                <span class="flex-1"></span>
            <button v-on:click="()=>{currentWord++;}" v-if="selectedWords && currentWord+1 < selectedWords.length" class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Next Word</button>
            <button v-on:click="()=>{emit('build',selectedWords)}" class="rounded-md bg-green-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Build The Flash Cards</button>
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