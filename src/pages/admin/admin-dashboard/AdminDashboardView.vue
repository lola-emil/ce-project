<!-- Snapshot numbers: This week attendance, month-to-date conversions, baptisms, 
 life group attendance trend, important alerts.

Quick links: Enter Attendance, Add Conversion, Print Bulletin Board. -->

<template>
    <AppNav />

    <div class="container mx-auto">
        <div class="space-y-4 pt-6">
            <div class="flex items-center justify-between space-y-2">
                <h2 class="text-2xl tracking-tight">
                    Dashboard
                </h2>
                <div class="flex items-center space-x-2">
                    <!-- <DateRange /> -->
                    <Button>Print Report</Button>
                </div>
            </div>

            <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

                <Card>
                    <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle class="text-sm font-medium">
                            Workers
                        </CardTitle>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-book-user-icon lucide-book-user h-4 w-4 text-muted-foreground">
                            <path d="M15 13a3 3 0 1 0-6 0" />
                            <path
                                d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
                            <circle cx="12" cy="8" r="2" />
                        </svg>
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold">
                            135
                        </div>
                        <p class="text-xs text-muted-foreground">
                            +20.1% from last week
                        </p>
                    </CardContent>
                </Card>


                <Card>
                    <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle class="text-sm font-medium">
                            Proposals
                        </CardTitle>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-book-user-icon lucide-book-user h-4 w-4 text-muted-foreground">
                            <path d="M15 13a3 3 0 1 0-6 0" />
                            <path
                                d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
                            <circle cx="12" cy="8" r="2" />
                        </svg>
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold">
                            2
                        </div>
                        <p class="text-xs text-muted-foreground">
                            +2.1% from last month
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle class="text-sm font-medium">
                            Clients
                        </CardTitle>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-book-user-icon lucide-book-user h-4 w-4 text-muted-foreground">
                            <path d="M15 13a3 3 0 1 0-6 0" />
                            <path
                                d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
                            <circle cx="12" cy="8" r="2" />
                        </svg>
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold">
                            214
                        </div>
                        <p class="text-xs text-muted-foreground">
                            +12.0% from last month
                        </p>
                    </CardContent>
                </Card>

            </div>
        </div>

        <div class="pt-6">


            <Card>
                <CardHeader>
                    <CardTitle>
                        Proposal Trend
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <LineChart class="w-full" :data="weeklyAttendance" index="week" :categories="['projects']"
                        :colors="['pink']" />
                </CardContent>
            </Card>

        </div>

        <div class="pt-6 grid grid-cols-2 gap-5">
            <Card>
                <CardHeader>
                    <CardTitle>
                        Recent Project Proposals
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div class="flex w-full flex-col gap-3">
                        <Item variant="outline">
                            <ItemMedia>
                                <Avatar class="size-10">
                                    <AvatarImage src="https://github.com/evilrabbit.png" />
                                    <AvatarFallback>ER</AvatarFallback>
                                </Avatar>
                            </ItemMedia>
                            <ItemContent>
                                <ItemTitle>Evil Rabbit</ItemTitle>
                                <ItemDescription>Last seen 5 months ago</ItemDescription>
                            </ItemContent>
                            <ItemActions>
                                <Button variant="outline" aria-label="Invite">
                                    View
                                </Button>
                            </ItemActions>
                        </Item>

                        <Item variant="outline">
                            <ItemMedia>
                                <Avatar class="size-10">
                                    <AvatarImage src="https://github.com/evilrabbit.png" />
                                    <AvatarFallback>ER</AvatarFallback>
                                </Avatar>
                            </ItemMedia>
                            <ItemContent>
                                <ItemTitle>Evil Rabbit</ItemTitle>
                                <ItemDescription>Last seen 5 months ago</ItemDescription>
                            </ItemContent>
                            <ItemActions>
                                <Button variant="outline" aria-label="Invite">
                                    View
                                </Button>
                            </ItemActions>
                        </Item>

                        <Item variant="outline">
                            <ItemMedia>
                                <Avatar class="size-10">
                                    <AvatarImage src="https://github.com/evilrabbit.png" />
                                    <AvatarFallback>ER</AvatarFallback>
                                </Avatar>
                            </ItemMedia>
                            <ItemContent>
                                <ItemTitle>Evil Rabbit</ItemTitle>
                                <ItemDescription>Last seen 5 months ago</ItemDescription>
                            </ItemContent>
                            <ItemActions>
                                <Button variant="outline" aria-label="Invite">
                                    View
                                </Button>
                            </ItemActions>
                        </Item>

                        <Item variant="outline">
                            <ItemMedia>
                                <Avatar class="size-10">
                                    <AvatarImage src="https://github.com/evilrabbit.png" />
                                    <AvatarFallback>ER</AvatarFallback>
                                </Avatar>
                            </ItemMedia>
                            <ItemContent>
                                <ItemTitle>Evil Rabbit</ItemTitle>
                                <ItemDescription>Last seen 5 months ago</ItemDescription>
                            </ItemContent>
                            <ItemActions>
                                <Button variant="outline" aria-label="Invite">
                                    View
                                </Button>
                            </ItemActions>
                        </Item>

                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    Transactions
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableCaption>A list of your recent invoices.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead class="w-[100px]">
                                    Invoice
                                </TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Method</TableHead>
                                <TableHead class="text-right">
                                    Amount
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow v-for="invoice in invoices" :key="invoice.invoice">
                                <TableCell class="font-medium">
                                    {{ invoice.invoice }}
                                </TableCell>
                                <TableCell>{{ invoice.paymentStatus }}</TableCell>
                                <TableCell>{{ invoice.paymentMethod }}</TableCell>
                                <TableCell class="text-right">
                                    {{ invoice.totalAmount }}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    </div>

    <br>
    <br>
    <br>

</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { RouterLink } from 'vue-router';
import { cn } from "@/lib/utils";
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
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-vue-next"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemMedia,
    ItemTitle,
} from "@/components/ui/item"

import {
    Card,
    CardHeader,
    CardTitle,
    CardContent
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import LineChart from "@/components/ui/chart-line/LineChart.vue";
import { Field, FieldGroup, FieldLabel, FieldDescription } from '@/components/ui/field';
import AppNav from "@/components/AppNav.vue";

const weeklyAttendance = [
    { week: "Aug 3", projects: 110 },
    { week: "Aug 10", projects: 120 },
    { week: "Aug 17", projects: 118 },
    { week: "Aug 24", projects: 125 },
    { week: "Aug 31", projects: 123 },
    { week: "Sep 7", projects: 130 },
    { week: "Sep 14", projects: 128 },
    { week: "Sep 21", projects: 135 },
]

const conversionsBaptisms = [
    { month: "Jan", conversions: 8, baptisms: 3 },
    { month: "Feb", conversions: 5, baptisms: 2 },
    { month: "Mar", conversions: 10, baptisms: 4 },
    { month: "Apr", conversions: 7, baptisms: 5 },
    { month: "May", conversions: 9, baptisms: 6 },
    { month: "Jun", conversions: 6, baptisms: 2 },
    { month: "Jul", conversions: 11, baptisms: 4 },
    { month: "Aug", conversions: 13, baptisms: 5 },
    { month: "Sep", conversions: 15, baptisms: 6 },
    { month: "Oct", conversions: 12, baptisms: 5 },
    { month: "Nov", conversions: 9, baptisms: 3 },
    { month: "Dec", conversions: 14, baptisms: 7 },
]

const data = [
    { name: "Jan", total: Math.floor(Math.random() * 2000) + 500, predicted: Math.floor(Math.random() * 2000) + 500 },
    { name: "Feb", total: Math.floor(Math.random() * 2000) + 500, predicted: Math.floor(Math.random() * 2000) + 500 },
    { name: "Mar", total: Math.floor(Math.random() * 2000) + 500, predicted: Math.floor(Math.random() * 2000) + 500 },
    { name: "Apr", total: Math.floor(Math.random() * 2000) + 500, predicted: Math.floor(Math.random() * 2000) + 500 },
    { name: "May", total: Math.floor(Math.random() * 2000) + 500, predicted: Math.floor(Math.random() * 2000) + 500 },
    { name: "Jun", total: Math.floor(Math.random() * 2000) + 500, predicted: Math.floor(Math.random() * 2000) + 500 },
]

const invoices = [
    {
        invoice: "INV001",
        paymentStatus: "Paid",
        totalAmount: "$250.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV002",
        paymentStatus: "Pending",
        totalAmount: "$150.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV003",
        paymentStatus: "Unpaid",
        totalAmount: "$350.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV004",
        paymentStatus: "Paid",
        totalAmount: "$450.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV005",
        paymentStatus: "Paid",
        totalAmount: "$550.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV006",
        paymentStatus: "Pending",
        totalAmount: "$200.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV007",
        paymentStatus: "Unpaid",
        totalAmount: "$300.00",
        paymentMethod: "Credit Card",
    },
]

const valueFormatter = (tick: number | Date) => typeof tick === "number" ? `Php ${new Intl.NumberFormat("us").format(tick).toString()}` : ""
onMounted(() => {

})
</script>