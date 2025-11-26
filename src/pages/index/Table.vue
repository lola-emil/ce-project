<script setup lang="ts">
import { computed, h } from "vue"
import {
    useVueTable,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    type ColumnDef,
} from "@tanstack/vue-table"

import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"

interface User {
    id: string
    name: string
    email: string
    status: string
}

const users: User[] = [
    { id: "1", name: "Alice", email: "alice@example.com", status: "active" },
    { id: "2", name: "Bob", email: "bob@example.com", status: "inactive" },
    { id: "3", name: "Charlie", email: "charlie@example.com", status: "active" },
]

const columns: ColumnDef<User>[] = [
    {
        id: "select",
        header: ({ table }) =>
            h(Checkbox, {
                checked: table.getIsAllPageRowsSelected(),
                "onUpdate:checked": (value: boolean) =>
                    table.toggleAllPageRowsSelected(!!value)
            }),
        cell: ({ row }) =>
            h(Checkbox, {
                checked: row.getIsSelected(),
                "onUpdate:checked": (value: boolean) =>
                    row.toggleSelected(!!value)
            }),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "status",
        header: "Status",
    },
]
// Create table
const table = useVueTable({
    data: users,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {},
})

</script>

<template>
    <!-- Toolbar -->
    <div class="flex items-center py-4 justify-between">
        <!-- Column Visibility -->
        <DropdownMenu>
            <DropdownMenuTrigger as-child>
                <Button variant="outline" size="sm">Columns</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuCheckboxItem v-for="column in table.getAllLeafColumns()" :key="column.id"
                    :checked="column.getIsVisible()" @update:checked="column.toggleVisibility">
                    {{ column.id }}
                </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>

    <!-- Table -->
    <div class="border rounded-md">
        <Table>
            <TableHeader>
                <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
                    <TableHead v-for="header in headerGroup.headers" :key="header.id"
                        @click="header.column.getCanSort() ? header.column.toggleSorting() : null"
                        class="cursor-pointer select-none">
                        {{ header.isPlaceholder ? "" : header.column.columnDef.header }}
                    </TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                <template v-if="table.getRowModel().rows.length">
                    <TableRow v-for="row in table.getRowModel().rows" :key="row.id">
                        <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                                {{ cell.getValue() }}
                        </TableCell>
                    </TableRow>
                </template>

                <TableRow v-else>
                    <TableCell :colspan="columns.length" class="text-center py-6">
                        No results.
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>

    <!-- Pagination -->
    <div class="flex items-center justify-end space-x-2 py-4">
        <Button variant="outline" size="sm" @click="table.previousPage()" :disabled="!table.getCanPreviousPage()">
            Previous
        </Button>
        <Button variant="outline" size="sm" @click="table.nextPage()" :disabled="!table.getCanNextPage()">
            Next
        </Button>
    </div>
</template>
