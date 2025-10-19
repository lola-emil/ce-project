<template>
    <nav class="navbar bg-base-100 shadow-sm">
        <div class="navbar-start">
            <a class="btn btn-ghost text-xl">BuildCare</a>

        </div>

        <div class="navbar-end gap-5">
            <!-- GLOBAL SEARCH -->
            <input type="text" class="input input-sm w-sm outline-none" placeholder="Search">

            <RouterLink to="/messages" class="btn btn-ghost btn-circle">
                <MessageCircle :size="20" />
            </RouterLink>

            <button class="btn btn-ghost btn-circle">
                <Bell :size="20" />
            </button>

            <button class="btn btn-ghost btn-circle">
                <CircleQuestionMark />
            </button>
            <button class="btn btn-ghost btn-circle">

                <div class="avatar avatar-placeholder">
                    <div class="bg-neutral text-neutral-content w-8 rounded-full">
                        <span class="text-xs">UI</span>
                    </div>
                </div>
            </button>
        </div>
    </nav>
</template>


<script setup lang="ts">
import { MessageCircle, Bell, CircleQuestionMark } from "lucide-vue-next";
</script>