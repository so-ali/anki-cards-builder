<script setup lang="ts">
import { defineProps } from 'vue';
import { WordsQueue } from '../Types';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';

defineProps({
    words: Array<WordsQueue>
});
</script>

<template>
    <div>
        <div class="mx-auto max-w-2xl text-center">

            <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">List of words</h2>
            <p class="mt-2 text-lg leading-8 text-gray-600">Automatic card generation for Anki application.</p>
        </div>

        <div class="mx-auto w-full mt-10 max-w-2xl border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none">
            <swiper :slides-per-view="1" :space-between="0">
                <swiper-slide v-for="word in words" v-key="word.word">
                    <article class="w-full flex flex-col items-start justify-between bg-white p-10 shadow-md rounded-md">
                        <div class="w-full mb-5">
                            <label for="word" class="block text-sm font-semibold leading-6 text-gray-900">Word</label>
                            <div class="mt-2.5">
                                <input type="text" id="word" v-model="word.word"
                                    class="block w-full rounded-md border-0 px-3.5 py-2 text-purple-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                            </div>
                        </div>
                        <div class="w-full grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                            <div>
                                <div class="w-full mb-5">
                                    <label for="cam-type"
                                        class="block text-sm font-semibold leading-6 text-gray-900">Type</label>
                                    <div class="mt-2.5">
                                        <input type="text" id="cam-type" v-model="word.cambridge.type"
                                            class="block w-full rounded-md border-0 px-3.5 py-2 text-blue-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                    </div>
                                </div>
                                <div class="w-full mb-5">
                                    <label for="cam-desc"
                                        class="block text-sm font-semibold leading-6 text-gray-900">Description</label>
                                    <div class="mt-2.5">
                                        <textarea rows="8" id="cam-desc" v-model="word.cambridge.description"
                                            class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                                    </div>
                                </div>
                                <div class="w-full mb-5">
                                    <label for="cam-synonyms"
                                        class="block text-sm font-semibold leading-6 text-gray-900">Synonyms</label>
                                    <div class="mt-2.5">
                                        <textarea rows="3" id="cam-synonyms" v-model="word.cambridge.synonyms"
                                            class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                                    </div>
                                </div>
                                <div class="w-full mb-5">
                                    <div class="block text-sm font-semibold leading-6 text-gray-900">US Sound</div>
                                    <div class="mt-2.5">
                                        <audio v-if="word.cambridge.usSound" controls="true" class="w-full">
                                            <source type="audio/mpeg" :src="word.cambridge.usSound" />
                                        </audio>
                                    </div>
                                </div>
                                <div class="w-full">
                                    <div class="block text-sm font-semibold leading-6 text-gray-900">UK Sound</div>
                                    <div class="mt-2.5">
                                        <audio v-if="word.cambridge.ukSound" controls="true" class="w-full">
                                            <source type="audio/mpeg" :src="word.cambridge.usSound" />
                                        </audio>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div class="w-full mb-5">
                                    <label for="ox-type"
                                        class="block text-sm font-semibold leading-6 text-gray-900">Type</label>
                                    <div class="mt-2.5">
                                        <input type="text" id="ox-type" v-model="word.oxford.type"
                                            class="block w-full rounded-md border-0 px-3.5 py-2 text-blue-600 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                    </div>
                                </div>
                                <div class="w-full mb-5">
                                    <label for="ox-desc"
                                        class="block text-sm font-semibold leading-6 text-gray-900">Description</label>
                                    <div class="mt-2.5">
                                        <textarea rows="8" id="ox-desc" v-model="word.oxford.description"
                                            class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                                    </div>
                                </div>
                                <div class="w-full mb-5">
                                    <label for="ox-synonyms"
                                        class="block text-sm font-semibold leading-6 text-gray-900">Synonyms</label>
                                    <div class="mt-2.5">
                                        <textarea rows="3" id="ox-synonyms" v-model="word.oxford.synonyms"
                                            class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                                    </div>
                                </div>
                                <div class="w-full mb-5">
                                    <div class="block text-sm font-semibold leading-6 text-gray-900">US Sound</div>
                                    <div class="mt-2.5">
                                        <audio v-if="word.oxford.usSound" controls="true" class="w-full">
                                            <source type="audio/mpeg" :src="word.oxford.usSound" />
                                        </audio>
                                    </div>
                                </div>
                                <div class="w-full">
                                    <div class="block text-sm font-semibold leading-6 text-gray-900">UK Sound</div>
                                    <div class="mt-2.5">
                                        <audio v-if="word.oxford.ukSound" controls="true" class="w-full">
                                            <source type="audio/mpeg" :src="word.oxford.usSound" />
                                        </audio>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                </swiper-slide>
            </swiper>
        </div>
    </div>
</template>