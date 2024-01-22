<script setup lang="ts">
import { defineProps, onMounted, ref, defineEmits } from "vue";
import type { WordsQueue } from "../Types";
import Dictionary, { Cambridge, Oxford } from "../Dictionary";

const props = defineProps({
    words: Array<string>,
    dics: Array<string>
});

const emit = defineEmits(["completed","submit"]);

const wordsQueue = ref<Array<WordsQueue>>([]);
const queueCompleted = ref<boolean>(false);

let pendingWords: Array<WordsQueue> = [];

function runQueue() {
    pendingWords = wordsQueue.value.filter((item: WordsQueue) => {
        return item.status !== "completed";
    });

    if (pendingWords.length > 0) { 
        const dictionaryCambridge = new Cambridge(pendingWords[0].word);
        pendingWords[0].status = "loading";
        dictionaryCambridge.find().then((response: Dictionary) => {
            pendingWords[0].status = "Cambridge completed";
            pendingWords[0].cambridge = {
                word: pendingWords[0].word,
                type: response.getType(),
                description: response.getDescription(),
                synonyms: response.getSynonyms(),
                ukSound: response.getSound("uk"),
                usSound: response.getSound(),
            };
            pendingWords[0].selected = JSON.parse(JSON.stringify(pendingWords[0].cambridge));

            const dictionaryOxford = new Oxford(response.word);
            dictionaryOxford.find().then((oxResponse: Dictionary) => {
                pendingWords[0].status = "completed";
                pendingWords[0].oxford = {
                    word: pendingWords[0].word,
                    type: oxResponse.getType(),
                    description: oxResponse.getDescription(),
                    synonyms: oxResponse.getSynonyms(),
                    ukSound: oxResponse.getSound("uk"),
                    usSound: oxResponse.getSound(),
                };

                runQueue();
            });

        });
    }else{
        emit("completed",wordsQueue);
        queueCompleted.value = true;
    }
}

onMounted(() => {
    props.words?.forEach((item: string) => {
        wordsQueue.value.push({
            status: "pending",
            word: item,
            cambridge: {word:item},
            oxford: {word:item},
            selected: {word:item},
        });
    });

    runQueue();
});
</script>
<template>
    <div>
        <div class="mx-auto max-w-2xl text-center">

            <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Getting words...</h2>
            <p class="mt-2 text-lg leading-8 text-gray-600">Automatic card builder for Anki application.</p>
        </div>
        <ul role="list" class="divide-y divide-gray-100">
            <li v-for="word in wordsQueue" :key="word.word" class="flex justify-between gap-x-6 py-5"> 
                <div class="flex min-w-0 gap-x-4">
                    <div class="min-w-0 flex-auto">
                        <p class="text-sm font-semibold leading-6 text-gray-900 capitalize">{{ word.word }}</p>
                        <p class="mt-1 truncate text-xs leading-5 text-gray-500 uppercase">{{ word.status }}</p>
                    </div>
                </div>
                <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <template v-if="word.status !== 'completed'">
                        <p class="mt-1 text-xs leading-5 text-gray-500">
                            Cambridge: <span v-if="!word.cambridge">Loading</span><span v-else>Completed</span>
                        </p>
                        <p class="mt-1 text-xs leading-5 text-gray-500">
                            Oxford: <span v-if="!word.oxford">Loading</span><span v-else>Completed</span>
                        </p>
                    </template>
                    <div class="mt-1 flex items-center gap-x-1.5" v-else>
                        <div class="flex-none rounded-full bg-emerald-500/20 p-1">
                            <div class="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                        </div>
                        <p class="text-xs leading-5 text-gray-500">Completed</p>
                    </div>
                </div>
            </li>
        </ul>
        <button v-on:click="$emit('submit')" :disabled="!queueCompleted"
            :class='{ "bg-indigo-300 hover:bg-indigo-300": !queueCompleted }'
            type="submit"
            class="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            <template v-if="!queueCompleted">Loading...</template>
            <template v-else>Next</template>
        </button>
    </div>
</template>