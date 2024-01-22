<script setup lang="ts">
import { defineProps,onMounted,ref,defineEmits } from 'vue';
import { WordsQueue } from '../Types';

const props = defineProps({
    words: Array<WordsQueue>
});

const emit = defineEmits(["reset"]);

const importFile = ref<string>("");
const fileName = ref<string>("flash-cards");

const downloadFile = () => {
         const link = document.createElement("a");
         const file = new Blob([importFile.value], { type: 'text/plain' });
         link.href = URL.createObjectURL(file);
         if(fileName.value === ""){
            fileName.value = "flash-cards";
         }
         link.download = fileName.value + ".txt";
         link.click();
         URL.revokeObjectURL(link.href);
      };

onMounted(()=>{
    if(typeof props.words === "undefined" || props.words.length <= 0){
        return false;
    }
    importFile.value = "#separator:tab\n#html:true\n";
    props.words.forEach((word: WordsQueue)=>{
        let desc = word.selected.description ?? "";
        desc += "<br><br><br>";
        desc += "<b>US Sound:</b> <br>";
        desc += "<audio controls><source type='audio/mpeg' src='"+word.selected.usSound+"'></audio><br><br>";
        desc += "<b>UK Sound:</b> <br>";
        desc += "<audio controls><source type='audio/mpeg' src='"+word.selected.ukSound+"'></audio><br><br>";
        desc += word.selected.synonyms ?? "";

        let title = word.selected.word + " (" + word.selected.type + ")";
        importFile.value += title + "	" + desc.replaceAll("	","").replaceAll("\n","<br>") + "\n";
    });
});
</script>
<template>
    <div>
        <div class="mx-auto max-w-2xl text-center">
            <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Generating Anki Import file</h2>
            <p class="mt-2 text-lg leading-8 text-gray-600">Automatic card builder for Anki application.</p>
        </div>
        <div class="w-full mb-5 mt-12">
            <div class="flex flex-row w-full">
                <label for="file"
                    class="text-sm font-semibold leading-6 text-gray-900 flex-1">Deck Name:</label>
            </div>

            <div class="mt-2.5">
                <input type="text" id="file" v-model="fileName"
                    class="block w-full rounded-md border-0 px-3.5 py-2 text-blue-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            </div>
        </div>
        <div class="mt-10">
            <button v-on:click="downloadFile"
                class="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Download The Deck
            </button>
            <button v-on:click="emit('reset')"
                class="mt-3 block w-full rounded-md px-3.5 py-2.5 text-center text-sm font-semibold text-red-500 hover:text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Create an another deck...
            </button>
        </div>
    </div>
</template>