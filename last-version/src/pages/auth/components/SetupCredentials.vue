<template>
    <form class="w-xs flex flex-col gap-5">
        <div>
            <p class="text-xl font-semibold">Set up your account credentials</p>
            <!-- <small class="text-sm text-base-content/75">Enter your name.</small> -->
        </div>
        <input type="text" class="input w-full" placeholder="Email">
        <input type="password" class="input w-full" placeholder="Password">
        <input type="password" class="input w-full" placeholder="Confirm Password">

        <button type="submit" class="btn btn-primary">Next</button>
        <div>
            <p>Don't have an account yet?
                <RouterLink to="/auth/sign-in" class="link link-primary">Sign In</RouterLink>
            </p>
        </div>
    </form>
</template>

<script setup lang="ts">

</script>