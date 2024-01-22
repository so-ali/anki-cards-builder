<script setup lang="ts">

import { defineModel, ref, watch, defineEmits } from 'vue';

const emit = defineEmits(["wordsUpdated", "submit"]);
const wordsModel = defineModel<string>("");
const wordsList = ref<Array<string>>([]);

watch(wordsModel, async (newWords) => {
    wordsList.value = [];
    let split1: Array<string> | undefined = newWords?.split(/\r?\n/);
    if (split1 !== undefined && split1?.length > 0) {
        split1?.forEach((word) => {
            word.split(",").forEach((item) => {
                if (item !== "") {
                    wordsList.value.push(item);
                }
            });
        });
    }
    let words = wordsList.value;
    emit('wordsUpdated', words);
})

function submit() {
    if (wordsList.value.length <= 0) {
        return;
    }
    emit('submit');
}

</script>

<template>
    <div>
        <div class="mx-auto max-w-2xl text-center">
            <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Anki Cards Builder</h2>
            <p class="mt-2 text-lg leading-8 text-gray-600">Automatic card builder for Anki application.</p>
        </div>
        <div class="mx-auto mt-16 max-w-xl sm:mt-20">
            <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 mb-7">
                <div class="sm:col-span-2">
                    <label for="words" class="block text-sm font-semibold leading-6 text-gray-900">Words List</label>
                    <div class="mt-2.5">
                        <textarea v-model="wordsModel" placeholder="Hello,World,..." name="words" id="words" rows="10"
                            class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                    <p class="mb-0 mt-2.5 text-gray-600">Separate with , or new line</p>

                    <div v-if="wordsList.length > 0">
                        <p class="mb-0 mt-2.5 text-gray-900 font-bold">Detected words:</p>
                        <span v-for="word, index in wordsList">
                            <span class="bg-indigo-500 rounded-md text-white px-2" style="margin: 0 5px;">{{ word }}</span>
                            <span v-if="index + 1 !== wordsList.length">,</span>
                        </span>
                    </div>
                </div>
            </div>

            <div class="mt-10">
                <button v-on:click="submit" :disabled="wordsList.length == 0"
                    type="submit"
                    class="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    :class="{ 'bg-indigo-300': wordsList.length}"
                    >
                    <template v-if="wordsList.length == 0">Add at least one word!</template>
                    <template v-else>Get From Dictionaries</template>
                </button>
            </div>
        </div>
    </div>
</template>