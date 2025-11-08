<template>
    <AppNav />

    <div class="container mx-auto">
        <div class="space-y-4 pt-6">

            <div class="flex items-center justify-between py-7">
                <h2 class="text-2xl tracking-tight">
                    User Management
                </h2>
            </div>

            <div class="flex justify-between">
                <InputGroup class="w-md">
                    <InputGroupInput placeholder="Search..." />
                    <InputGroupAddon>
                        <Search />
                    </InputGroupAddon>
                </InputGroup>

                <div>
                    <Dialog>
                        <DialogTrigger as-child>
                            <Button variant="outline">
                                Add worker
                            </Button>
                        </DialogTrigger>
                        <DialogContent class="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Add new worker</DialogTitle>
                                <DialogDescription>
                                </DialogDescription>
                            </DialogHeader>
                            <FieldGroup>
                                <Field>
                                    <FieldLabel htmlFor="email">Full Name</FieldLabel>
                                    <Input id="email" type="email"  required />
                                </Field>

                                <Field>
                                    <FieldLabel htmlFor="email">Email</FieldLabel>
                                    <Input id="email" type="email"  required />
                                </Field>
                                <Field>
                                    <div className="flex items-center">
                                        <FieldLabel htmlFor="password">Password</FieldLabel>
                                    </div>
                                    <Input id="password" type="password" required />
                                </Field>
                            </FieldGroup>
                            <DialogFooter>
                                <Button type="submit">
                                    Submit
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            <div class="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                <Checkbox />
                            </TableHead>
                            <TableHead class="w-[100px]">
                                ID
                            </TableHead>
                            <TableHead>Full Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Date Added</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow v-for="invoice in users" :key="invoice.id">
                            <TableCell>
                                <Checkbox />
                            </TableCell>
                            <TableCell class="font-medium">
                                {{ invoice.id }}
                            </TableCell>
                            <TableCell>{{ invoice.full_name }}</TableCell>

                            <TableCell>{{ invoice.email }}</TableCell>
                            <TableCell>{{ invoice.phone_number }}</TableCell>
                            <TableCell>
                                {{ invoice.date_created }}
                            </TableCell>

                            <TableCell class="text-right">
                                <Dialog>
                                    <DialogTrigger as-child>
                                        <Button variant="outline">
                                            Edit
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent class="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>Edit worker profile</DialogTitle>
                                            <DialogDescription>
                                            </DialogDescription>
                                        </DialogHeader>
                                        <FieldGroup>
                                            <Field>
                                                <FieldLabel htmlFor="email">Full Name</FieldLabel>
                                                <Input id="email" type="email"  required />
                                            </Field>

                                            <Field>
                                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                                <Input id="email" type="email"  required />
                                            </Field>
                                            <Field>
                                                <div className="flex items-center">
                                                    <FieldLabel htmlFor="password">Password</FieldLabel>
                                                </div>
                                                <Input id="password" type="password" required />
                                            </Field>
                                        </FieldGroup>
                                        <DialogFooter>
                                            <Button type="submit">
                                                Submit
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import AppNav from '@/components/AppNav.vue';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-vue-next';
import { Field, FieldGroup, FieldLabel, FieldDescription } from '@/components/ui/field';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText, InputGroupTextarea } from "@/components/ui/input-group"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Checkbox } from '@/components/ui/checkbox';
const users = [
    {
        id: 1,
        full_name: "Alice Johnson",
        email: "alice.johnson@example.com",
        phone_number: "+1-202-555-0147",
        date_created: "2025-01-15"
    },
    {
        id: 2,
        full_name: "Brian Smith",
        email: "brian.smith@example.com",
        phone_number: "+1-202-555-0192",
        date_created: "2025-02-03"
    },
    {
        id: 3,
        full_name: "Carla Gomez",
        email: "carla.gomez@example.com",
        phone_number: "+1-202-555-0178",
        date_created: "2025-03-22"
    },
    {
        id: 4,
        full_name: "Daniel Lee",
        email: "daniel.lee@example.com",
        phone_number: "+1-202-555-0104",
        date_created: "2025-04-10"
    },
    {
        id: 5,
        full_name: "Eva Brown",
        email: "eva.brown@example.com",
        phone_number: "+1-202-555-0165",
        date_created: "2025-05-07"
    }
];

</script>