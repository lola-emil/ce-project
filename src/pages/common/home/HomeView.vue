<template>
    <Navbar/>

    <main class="hero">
        <div class="w-9/12 mx-auto">
            <!-- HER0 -->
            <div class="flex flex-col justify-center items-center min-h-[calc(100vh-10rem)] gap-5">
                <h1 class="text-6xl font-bold text-center">
                    On-Demand Platform for Skilled Construction Workers
                </h1>
                <p class="text-xl text-center">Find trusted, vetted workers for your next project.</p>

                <div>
                    <Button size="lg">Get Started</Button>
                </div>
            </div>
        </div>

        <br>
        <br>
        <br>
        <br>

        <div class="w-9/12 mx-auto min-h-[calc(60vh-10rem)]">
            <div class="flex flex-col gap-3">
                <h3 class="text-center text-4xl font-bold">Easily find skilled workers for your project</h3>
                <!-- <p class="text-center text-lg">Follow these steps</p> -->
                 <br>
            </div>
            <br>
            <div class="grid grid-cols-3 gap-10">
                <Card class="h-60">
                    <CardContent>
                        <div>
                            <UserStar :size="45" />
                        </div>
                        <div>
                            <p class="font-bold">Create account</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent>
                        <div>
                            <FilePenLine :size="45" />
                        </div>

                        <div>
                            <p class="font-bold">Create Proposal</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent>
                        <div>
                            <Check :size="45" />
                        </div>
                        <div>
                            <p class="font-bold">Done</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>

        <br>
        <br>
        <br>

        <div class="w-9/12 mx-auto">
            <Card>
                <CardContent class="flex flex-col items-center gap-5 p-10">
                    <h1 class="text-3xl  font-semibold text-center">Stop searching, Start building.</h1>
                    <Button>Create an account</Button>
                </CardContent>
            </Card>
        </div>


    </main>
    <br>
    <br>
    <br>

    <footer class="border-t flex flex-col items-center p-10 gap-5">
        <h3 class="text-xl font-bold">Prodigify</h3>

        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuLink>Services</NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuLink>About Us</NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuLink>FAQs</NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    </footer>
</template>

<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { Card, CardContent } from "@/components/ui/card";
import { UserStar, Check, FilePenLine } from "lucide-vue-next";
import Navbar from "@/components/Navbar.vue";

</script>
