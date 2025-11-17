<script setup lang="ts">
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/ui/tabs'
import ClientsList from './components/ClientsList.vue'
import WorkersList from './components/WorkersList.vue'
import JobsList from './components/JobsList.vue'

interface TableData {
    id: number
    header: string
    type: string
    status: string
    target: string
    limit: string
    reviewer: string
}

const tableData: TableData[] = [
    {
        id: 1,
        header: "Revenue Report",
        type: "Financial",
        status: "Completed",
        target: "Q1",
        limit: "$50,000",
        reviewer: "Alice Johnson"
    },
    {
        id: 2,
        header: "User Growth",
        type: "Analytics",
        status: "In Progress",
        target: "10k Users",
        limit: "N/A",
        reviewer: "Bob Smith"
    },
    {
        id: 3,
        header: "Server Load",
        type: "Monitoring",
        status: "Warning",
        target: "75%",
        limit: "80%",
        reviewer: "Charlie Davis"
    },
    {
        id: 4,
        header: "Bug Triage",
        type: "QA",
        status: "Pending",
        target: "20 Bugs",
        limit: "25 Bugs",
        reviewer: "Dana Miller"
    },
    {
        id: 5,
        header: "Marketing Spend",
        type: "Financial",
        status: "Completed",
        target: "$10,000",
        limit: "$12,000",
        reviewer: "Evan Lee"
    },
    {
        id: 6,
        header: "Page Performance",
        type: "Analytics",
        status: "In Progress",
        target: "2s Load Time",
        limit: "3s",
        reviewer: "Fiona Clark"
    },
    {
        id: 7,
        header: "Security Audit",
        type: "Security",
        status: "Completed",
        target: "All Checks",
        limit: "N/A",
        reviewer: "George Turner"
    },
    {
        id: 8,
        header: "Customer Feedback",
        type: "Support",
        status: "Pending",
        target: "200 Responses",
        limit: "250 Responses",
        reviewer: "Hannah Brooks"
    },
    {
        id: 9,
        header: "Feature Rollout",
        type: "Development",
        status: "In Progress",
        target: "Phase 2",
        limit: "Phase 3",
        reviewer: "Ian Carter"
    },
    {
        id: 10,
        header: "Inventory Check",
        type: "Operations",
        status: "Completed",
        target: "100 Units",
        limit: "120 Units",
        reviewer: "Julia Adams"
    }
];

</script>

<template>
    <br>
    <div class="container mx-auto px-5 md:px-0">
        <Tabs default-value="clients">
            <TabsList>
                <TabsTrigger value="clients">
                    Clients List
                </TabsTrigger>
                <TabsTrigger value="workers">
                    Workers List
                </TabsTrigger>

                <TabsTrigger value="jobs">
                    Jobs List
                </TabsTrigger>
            </TabsList>
            <TabsContent value="clients">
                <ClientsList :data="tableData"/>
            </TabsContent>
            <TabsContent value="workers">
                <WorkersList :data="tableData"/>
            </TabsContent>

            <TabsContent value="jobs">
                <JobsList :data="tableData"/>
            </TabsContent>
        </Tabs>
    </div>
</template>
