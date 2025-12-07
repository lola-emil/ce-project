<script setup lang="ts">
import { FlexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useVueTable, type ColumnDef, type ColumnFiltersState, type SortingState, type VisibilityState } from "@tanstack/vue-table";
import { computed, h, onMounted, ref, watch } from "vue";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuCheckboxItem
} from '@/components/ui/dropdown-menu';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Button } from "@/components/ui/button";
import { IconChevronDown, IconPlus } from "@tabler/icons-vue";
import type { User as UserData, UserRole } from "@/types/schema";
import { Checkbox } from "@/components/ui/checkbox";
import { IconChevronLeft, IconChevronsLeft, IconChevronRight, IconChevronsRight } from "@tabler/icons-vue";
import { collection, query, where } from "firebase/firestore";
import { db } from "@/firebase";
import { useCollection } from "vuefire";
import { ButtonGroup } from "@/components/ui/button-group";
import { RouterLink } from "vue-router";
import { ListFilter } from "lucide-vue-next";

interface UserTableData {
    id: string; // UID sa user

    name: string;
    email: string;
    role: UserRole
}

const sorting = ref<SortingState>([])
const columnFilters = ref<ColumnFiltersState>([])
const columnVisibility = ref<VisibilityState>({})
const rowSelection = ref({})


const columns: ColumnDef<UserTableData>[] = [
    {
        id: "select",
        header: ({ table }) => h(Checkbox, { 'modelValue': table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate'), 'onUpdate:modelValue': value => table.toggleAllPageRowsSelected(!!value), 'aria-label': 'Select all', }),
        cell: ({ row }) => h(Checkbox, { 'modelValue': row.getIsSelected(), 'onUpdate:modelValue': value => row.toggleSelected(!!value), 'aria-label': 'Select row', }), enableSorting: false, enableHiding: false,
    },
    {
        id: "name",
        accessorKey: "name",
        cell: ({ row }) => h("div", String(row.getValue("name"))),
        enableHiding: false,
    },

    {
        id: "email",
        accessorKey: "email",
        cell: ({ row }) => h("div", String(row.getValue("email"))),
        enableHiding: false,
    },

    {
        id: "role",
        accessorKey: "role",
        cell: ({ row }) => h(Badge, { variant: "outline", class: "text-muted-foreground px-1.5" },
            h('span', {}, row.original.role)),
        enableHiding: false,
    },

    {
        id: "action",
        meta: {
            align: "right"
        },
        cell: ({ row }) => h(ButtonGroup, {}, [
            h(Button, { variant: "link", class: "align-right", asChild: true }, [
                h(RouterLink, { to: "edit-user/" + row.original.id }, "Edit")
            ])
        ])
    }
];

const tableData = ref<UserTableData[]>([]);


const table = useVueTable({
    data: computed(() => tableData.value),
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: (updaterOrValue) => {
        sorting.value = typeof updaterOrValue === 'function'
            ? updaterOrValue(sorting.value)
            : updaterOrValue
    },
    onColumnFiltersChange: (updaterOrValue) => {
        columnFilters.value = typeof updaterOrValue === 'function'
            ? updaterOrValue(columnFilters.value)
            : updaterOrValue
    },
    onColumnVisibilityChange: (updaterOrValue) => {
        columnVisibility.value = typeof updaterOrValue === 'function'
            ? updaterOrValue(columnVisibility.value)
            : updaterOrValue
    },
    onRowSelectionChange: (updaterOrValue) => {
        rowSelection.value = typeof updaterOrValue === 'function'
            ? updaterOrValue(rowSelection.value)
            : updaterOrValue
    },
    state: {
        get sorting() { return sorting.value },
        get columnFilters() { return columnFilters.value },
        get columnVisibility() { return columnVisibility.value },
        get rowSelection() { return rowSelection.value },
    },
});


const userDocQuery = query(collection(db, "users"), where("role", "in", ["client", "worker"]))
const users = useCollection<UserData>(userDocQuery);


watch(users, newVal => {
    console.log(users.value);

    tableData.value = users.value.map(val => {
        return {
            id: val.id,
            email: val.email,
            name: `${val.name?.firstname} ${val.name?.lastname}`,
            role: val.role
        }
    })
})

</script>

<template>
    <div class="container mx-auto px-5 lg:px-0">
        <div class="mt-10">
            <h3 class="text-3xl">Users Management</h3>
            <p class="text-lg text-muted-foreground">Here’s a quick overview of your latest activity.</p>
        </div>

        <Tabs default-value="outline" class="w-full flex flex-col justify-start gap-6 mt-5">
            <div class="flex items-center justify-between">
                <Label for="view-selector" class="sr-only">
                    View
                </Label>
                <div class="flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger as-child>
                            <Button variant="outline" size="sm">
                                <ListFilter />
                                <span class="hidden lg:inline">Filter</span>
                                <span class="lg:hidden">Columns</span>
                                <IconChevronDown />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" class="w-56">
                            <DropdownMenuCheckboxItem class="capitalize">
                                Worker
                            </DropdownMenuCheckboxItem>

                            <DropdownMenuCheckboxItem class="capitalize">
                                Client
                            </DropdownMenuCheckboxItem>
                            <!-- <template
                            v-for="column in table.getAllColumns().filter((column) => typeof column.accessorFn !== 'undefined' && column.getCanHide())"
                            :key="column.id">
                            <DropdownMenuCheckboxItem class="capitalize" :model-value="column.getIsVisible()"
                                @update:model-value="(value) => {

                                    column.toggleVisibility(!!value)
                                }">
                                {{ column.id }}
                            </DropdownMenuCheckboxItem>
                        </template> -->
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button variant="outline" size="sm" as-child>
                        <RouterLink to="/admin/create-new-worker">
                            <IconPlus />
                            <span class="hidden lg:inline">Add worker</span>
                        </RouterLink>
                    </Button>

                    <!-- <Button variant="outline" size="sm">
                        <IconPlus />
                        <span class="hidden lg:inline">Add client</span>
                    </Button> -->
                </div>

            </div>
            <TabsContent value="outline" class="relative flex flex-col gap-4 overflow-auto">
                <div class="overflow-hidden rounded-lg border">
                    <Table>
                        <TableHeader class="bg-muted sticky top-0 z-10">
                            <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
                                <TableHead v-for="header in headerGroup.headers">
                                    <FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.header"
                                        :props="header.getContext()" />
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            <template v-if="table.getRowModel().rows.length">
                                <TableRow v-for="row in table.getRowModel().rows" :key="row.id">
                                    <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                                        <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
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
            </TabsContent>

            <!-- Pagination -->
            <div class="flex items-center justify-between px-4">
                <div class="text-muted-foreground hidden flex-1 text-sm lg:flex">
                    {{ table.getFilteredSelectedRowModel().rows.length }} of
                    {{ table.getFilteredRowModel().rows.length }} row(s) selected.
                </div>
                <div class="flex w-full items-center gap-8 lg:w-fit">
                    <div class="hidden items-center gap-2 lg:flex">
                        <Label for="rows-per-page" class="text-sm font-medium">
                            Rows per page
                        </Label>
                        <Select :model-value="table.getState().pagination.pageSize" @update:model-value="(value) => {
                            table.setPageSize(Number(value))
                        }">
                            <SelectTrigger id="rows-per-page" size="sm" class="w-20">
                                <SelectValue :placeholder="`${table.getState().pagination.pageSize}`" />
                            </SelectTrigger>
                            <SelectContent side="top">
                                <SelectItem v-for="pageSize in [10, 20, 30, 40, 50]" :key="pageSize"
                                    :value="`${pageSize}`">
                                    {{ pageSize }}
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div class="flex w-fit items-center justify-center text-sm font-medium">
                        Page {{ table.getState().pagination.pageIndex + 1 }} of
                        {{ table.getPageCount() }}
                    </div>
                    <div class="ml-auto flex items-center gap-2 lg:ml-0">
                        <Button variant="outline" class="hidden h-8 w-8 p-0 lg:flex"
                            :disabled="!table.getCanPreviousPage()" @click="table.setPageIndex(0)">
                            <span class="sr-only">Go to first page</span>
                            <IconChevronsLeft />
                        </Button>
                        <Button variant="outline" class="size-8" size="icon" :disabled="!table.getCanPreviousPage()"
                            @click="table.previousPage()">
                            <span class="sr-only">Go to previous page</span>
                            <IconChevronLeft />
                        </Button>
                        <Button variant="outline" class="size-8" size="icon" :disabled="!table.getCanNextPage()"
                            @click="table.nextPage()">
                            <span class="sr-only">Go to next page</span>
                            <IconChevronRight />
                        </Button>
                        <Button variant="outline" class="hidden size-8 lg:flex" size="icon"
                            :disabled="!table.getCanNextPage()" @click="table.setPageIndex(table.getPageCount() - 1)">
                            <span class="sr-only">Go to last page</span>
                            <IconChevronsRight />
                        </Button>
                    </div>
                </div>
            </div>
        </Tabs>
    </div>
</template>