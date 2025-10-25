<template>
    <Navbar />

    <main class="container mx-auto grid grid-cols-4 gap-10">
        <div class="col-span-1">
            <div class="mt-10 mb-3">
                <input type="text" placeholder="Search" class="input input-sm outline-none">
            </div>

            <div>
                <ul class="list bg-base-100 rounded-box shadow-md">
                    <li class="p-4 pb-2 text-xs opacity-60 tracking-wide">All Conversations</li>
                    <li v-for="value in range(10)"
                        class="list-row cursor-pointer hover:bg-base-300 transition-colors duration-75">
                        <div class="avatar">
                            <div class="rounded-full">
                                <img class="size-10" src="https://img.daisyui.com/images/profile/demo/1@94.webp" />
                            </div>
                        </div>
                        <div>
                            <div>Dio Lupa</div>
                            <div class="text-xs  opacity-60">I wanted to know if you have...</div>
                        </div>
                        <button class="btn btn-square btn-ghost">
                            <Ellipsis />
                        </button>
                    </li>
                </ul>
            </div>
        </div>
        <div class="col-span-3">
            <div class="card border border-base-content/10 my-5">
                <div class="card-body p-3 h-[calc(100vh-(4rem+1.50rem))] grid grid-rows-12">
                    <!-- Messaging header -->
                    <div class="flex justify-between items-center row-span-1 border-b border-base-content/10">
                        <div>
                            <div>
                                <p><span class="font-bold">Obi-Wan Kenobi</span> - <small
                                        class="text-sm opacity-60">obiwan.5@gmail.com</small></p>
                            </div>

                            <div class="flex items-center gap-3 opacity-60 text-xs mt-2">
                                <div>
                                    <p><span>Last Seen:</span> <span>Just now</span></p>
                                </div>
                                <div>
                                    <p><span>Local Time:</span> <span>October 19, 2025</span></p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <button class="btn btn-ghost btn-square">
                                <Ellipsis />
                            </button>
                        </div>
                    </div>

                    <!-- Message contents -->
                    <div class="overflow-y-scroll grow-1 row-span-9">
                        <div class="chat chat-start">
                            <div class="chat-image avatar">
                                <div class="w-10 rounded-full">
                                    <img alt="Tailwind CSS chat bubble component"
                                        src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp" />
                                </div>
                            </div>
                            <div class="chat-header">
                                Obi-Wan Kenobi
                                <time class="text-xs opacity-50">12:45</time>
                            </div>
                            <div class="chat-bubble">You were the Chosen One!</div>
                            <div class="chat-footer opacity-50">Delivered</div>
                        </div>
                        <div class="chat chat-end">
                            <div class="chat-image avatar">
                                <div class="w-10 rounded-full">
                                    <img alt="Tailwind CSS chat bubble component"
                                        src="https://img.daisyui.com/images/profile/demo/anakeen@192.webp" />
                                </div>
                            </div>
                            <div class="chat-header">
                                Anakin
                                <time class="text-xs opacity-50">12:46</time>
                            </div>
                            <div class="chat-bubble">I hate you!</div>
                            <div class="chat-footer opacity-50">Seen at 12:46</div>
                        </div>
                    </div>

                    <!-- Message compose -->
                    <div class="flex flex-col gap-3 grid-rows-2">
                        <textarea rows="1" placeholder="Send Message..."
                            class="textarea outline-none w-full"></textarea>
                        <div class="flex justify-between items-center">
                            <div>
                                <button class="btn btn-ghost btn-square">
                                    <ImagePlay :size="18" />
                                </button>

                                <button class="btn btn-ghost btn-square">
                                    <Smile :size="18" />
                                </button>

                                <button class="btn btn-ghost btn-square">
                                    <Paperclip :size="18" />
                                </button>
                            </div>
                            <button class="btn btn-primary">
                                <span>Send</span>
                                <SendHorizonal :size="18" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>


<script setup lang="ts">
import Navbar from '@/components/ui/Navbar.vue';
import { range } from '@/utils/util';
import { Ellipsis, SendHorizonal, Smile, ImagePlay, Paperclip } from "lucide-vue-next";
</script>