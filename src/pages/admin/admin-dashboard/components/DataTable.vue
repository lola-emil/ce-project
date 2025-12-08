<script lang="ts">
import { z } from 'zod'
import { ref, h, onMounted } from 'vue'
import type { ActivityLog } from '@/types/schema'
import type { Timestamp } from 'firebase/firestore'

export const schema = z.object({
  id: z.number(),
  header: z.string(),
  type: z.string(),
  status: z.string(),
  target: z.string(),
  limit: z.string(),
  reviewer: z.string(),
})
</script>

<script setup lang="ts">
import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from '@tanstack/vue-table'
import { RestrictToVerticalAxis } from '@dnd-kit/abstract/modifiers'
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight, IconDotsVertical
} from '@tabler/icons-vue'
import {
  FlexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable,
} from '@tanstack/vue-table'
import { DragDropProvider } from 'dnd-kit-vue'
import { Badge } from '@/components/ui/badge'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu, DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import {
  Tabs,
  TabsContent
} from '@/components/ui/tabs'

const props = defineProps<{
  data: ActivityLog[]
}>()



const sorting = ref<SortingState>([])
const columnFilters = ref<ColumnFiltersState>([])
const columnVisibility = ref<VisibilityState>({})
const rowSelection = ref({})

const columns: ColumnDef<ActivityLog>[] = [
  {
    accessorKey: 'for_user',
    header: 'User ID',
    cell: ({ row }) => h('div', String(row.getValue('for_user'))),
    enableHiding: false,
  },
  {
    accessorKey: 'action_type',
    header: 'Action Type',
    cell: ({ row }) => h(Badge, {
      variant: 'outline',
      class: 'text-muted-foreground px-1.5',
    }, () => String(row.getValue('action_type'))),
  },
  {
    accessorKey: 'date_created',
    header: 'Date Created',
    cell: ({ row }) => {
      const timestamp = row.getValue('date_created') as Timestamp;
      // Convert Firestore timestamp to readable date
      const date = new Date(timestamp.seconds * 1000);
      return h(Badge, {
        variant: 'outline',
        class: 'text-muted-foreground px-1.5',
      }, () => date.toLocaleString());
    },
  },
  {
    id: 'actions',
    cell: () => h(DropdownMenu, {}, {
      default: () => [
        h(DropdownMenuTrigger, { asChild: true }, {
          default: () => h(Button, {
            variant: 'ghost',
            class: 'h-8 w-8 p-0',
          }, {
            default: () => [
              h('span', { class: 'sr-only' }, 'Open menu'),
              h(IconDotsVertical, { class: 'h-4 w-4' }),
            ],
          }),
        }),
        h(DropdownMenuContent, { align: 'end' }, {
          default: () => [
            h(DropdownMenuItem, {}, () => 'Edit'),
            h(DropdownMenuSeparator, {}),
            h(DropdownMenuItem, { variant: 'destructive' }, () => 'Delete'),
          ],
        }),
      ],
    }),
  },
];

const table = useVueTable({
  get data() {
    return props.data
  },
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
})

onMounted(() => {
  console.log("Rows:", table.getRowModel().rows)
})
</script>

<template>
  <Tabs default-value="outline" class="w-full flex-col justify-start gap-6">
    <div class="flex items-center justify-between px-4 lg:px-6">
      <Label for="view-selector" class="sr-only">
        View
      </Label>
    </div>
    <TabsContent value="outline" class="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6">
      <div class="overflow-hidden rounded-lg border">
        <DragDropProvider :modifiers="[RestrictToVerticalAxis]">
          <Table>
            <TableHeader class="bg-muted sticky top-0 z-10">
              <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
                <TableHead v-for="header in headerGroup.headers" :key="header.id" :col-span="header.colSpan">
                  <FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.header"
                    :props="header.getContext()" />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody class="**:data-[slot=table-cell]:first:w-8">
              <template v-if="table.getRowModel().rows.length">

                <TableRow v-for="row in table.getRowModel().rows"
                  class="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80">
                  <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                    <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
                  </TableCell>
                </TableRow>

              </template>
              <TableRow v-else>
                <TableCell :col-span="columns.length" class="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </DragDropProvider>
        <!-- <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={handleDragEnd}
            sensors={sensors}
            id={sortableId}
          > -->
        <!-- </DndContext> -->
      </div>
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
                <SelectItem v-for="pageSize in [10, 20, 30, 40, 50]" :key="pageSize" :value="`${pageSize}`">
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
            <Button variant="outline" class="hidden h-8 w-8 p-0 lg:flex" :disabled="!table.getCanPreviousPage()"
              @click="table.setPageIndex(0)">
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
            <Button variant="outline" class="hidden size-8 lg:flex" size="icon" :disabled="!table.getCanNextPage()"
              @click="table.setPageIndex(table.getPageCount() - 1)">
              <span class="sr-only">Go to last page</span>
              <IconChevronsRight />
            </Button>
          </div>
        </div>
      </div>
    </TabsContent>
    <TabsContent value="past-performance" class="flex flex-col px-4 lg:px-6">
      <div class="aspect-video w-full flex-1 rounded-lg border border-dashed" />
    </TabsContent>
    <TabsContent value="key-personnel" class="flex flex-col px-4 lg:px-6">
      <div class="aspect-video w-full flex-1 rounded-lg border border-dashed" />
    </TabsContent>
    <TabsContent value="focus-documents" class="flex flex-col px-4 lg:px-6">
      <div class="aspect-video w-full flex-1 rounded-lg border border-dashed" />
    </TabsContent>
  </Tabs>
</template>
